// Portfolio route handler — holdings with P&L and summary

import { holdings, coins } from '../mock/data.js';
import { success } from '../middleware/response.js';

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
