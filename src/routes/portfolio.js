// Portfolio route handlers — list holdings with P&L, add holding

import { holdings, coins, addHolding } from '../mock/data.js';
import { success, error } from '../middleware/response.js';

// ─── GET /api/portfolio ──────────────────────────────────
export function handlePortfolio() {
  let totalValue = 0;
  let totalCost = 0;

  const enriched = holdings.map((h) => {
    const coin = coins.find((c) => c.id === h.coin_id);
    const currentPrice = coin?.price ?? 0;
    const value = +(currentPrice * h.amount).toFixed(2);
    const cost = +(h.avg_cost * h.amount).toFixed(2);
    const pnl = +(value - cost).toFixed(2);
    const pnlPct = cost > 0 ? +((pnl / cost) * 100).toFixed(2) : 0;

    totalValue += value;
    totalCost += cost;

    return {
      coin_id: h.coin_id,
      coin_name: coin?.name ?? 'Unknown',
      coin_symbol: coin?.symbol ?? '???',
      amount: h.amount,
      avg_cost: h.avg_cost,
      current_price: currentPrice,
      value,
      cost,
      pnl,
      pnl_pct: pnlPct,
    };
  });

  totalValue = +totalValue.toFixed(2);
  totalCost = +totalCost.toFixed(2);
  const totalPnl = +(totalValue - totalCost).toFixed(2);
  const totalPnlPct = totalCost > 0 ? +((totalPnl / totalCost) * 100).toFixed(2) : 0;

  return success({
    holdings: enriched,
    summary: {
      total_value: totalValue,
      total_cost: totalCost,
      total_pnl: totalPnl,
      total_pnl_pct: totalPnlPct,
    },
  });
}

// ─── POST /api/portfolio ─────────────────────────────────
export async function handleAddHolding(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return error('Invalid JSON body', 400);
  }

  const { coin_id, amount, avg_cost } = body;

  if (!coin_id || !amount || !avg_cost) {
    return error('Missing required fields: coin_id, amount, avg_cost', 400);
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return error('amount must be a positive number', 400);
  }

  if (typeof avg_cost !== 'number' || avg_cost <= 0) {
    return error('avg_cost must be a positive number', 400);
  }

  const coin = coins.find((c) => c.id === coin_id);
  if (!coin) {
    return error(`Coin '${coin_id}' not found`, 404);
  }

  const holding = addHolding({ coin_id, amount, avg_cost });

  return success({
    coin_id: holding.coin_id,
    coin_name: coin.name,
    coin_symbol: coin.symbol,
    amount: holding.amount,
    avg_cost: holding.avg_cost,
  }, 201);
}
