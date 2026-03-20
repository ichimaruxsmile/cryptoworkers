// Alert route handlers — list, create, delete

import { alerts, coins, addAlert, removeAlert } from '../mock/data.js';
import { success, error } from '../middleware/response.js';

const VALID_TYPES = ['price_above', 'price_below', 'change_above', 'change_below'];

// ─── GET /api/alerts ─────────────────────────────────────
export function handleGetAlerts() {
  // Enrich each alert with coin metadata
  const enriched = alerts.map((alert) => {
    const coin = coins.find((c) => c.id === alert.coin_id);
    return {
      ...alert,
      coin_name: coin?.name ?? 'Unknown',
      coin_symbol: coin?.symbol ?? '???',
      current_price: coin?.price ?? 0,
    };
  });

  return success(enriched);
}

// ─── POST /api/alerts ────────────────────────────────────
export async function handleCreateAlert(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return error('Invalid JSON body', 400);
  }

  const { coin_id, type, value } = body;

  // Validation
  if (!coin_id || !type || value === undefined || value === null) {
    return error('Missing required fields: coin_id, type, value', 400);
  }

  if (!VALID_TYPES.includes(type)) {
    return error(`Invalid type. Allowed: ${VALID_TYPES.join(', ')}`, 400);
  }

  const coin = coins.find((c) => c.id === coin_id);
  if (!coin) {
    return error(`Coin '${coin_id}' not found`, 404);
  }

  const newAlert = addAlert({ coin_id, type, value });

  return success(newAlert, 201);
}

// ─── DELETE /api/alerts/:id ──────────────────────────────
export function handleDeleteAlert(id) {
  const removed = removeAlert(id);
  if (!removed) {
    return error(`Alert '${id}' not found`, 404);
  }
  return success({ id, deleted: true });
}
