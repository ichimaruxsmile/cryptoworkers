// Market route handlers — coins list, coin detail, K-line data

import { coins } from '../mock/data.js';
import { success, error } from '../middleware/response.js';

// ─── GET /api/market/coins ───────────────────────────────
export function handleCoins(url) {
  const params = url.searchParams;
  const sort = params.get('sort') || 'market_cap';
  const order = params.get('order') || 'desc';
  const limit = Math.min(parseInt(params.get('limit') || '100', 10), 100);
  const query = (params.get('q') || '').toLowerCase();

  // Validate sort field
  const validSorts = ['market_cap', 'price', 'change_24h', 'volume_24h'];
  if (!validSorts.includes(sort)) {
    return error(`Invalid sort field. Allowed: ${validSorts.join(', ')}`, 400);
  }

  // Clone & apply ±0.1% price jitter to simulate real-time data
  let result = coins.map((c) => {
    const jitter = 1 + (Math.random() - 0.5) * 0.002; // ±0.1%
    return { ...c, price: +(c.price * jitter).toFixed(c.price < 1 ? 6 : 2) };
  });

  // Search filter
  if (query) {
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.symbol.toLowerCase().includes(query)
    );
  }

  // Sort
  result.sort((a, b) => {
    const diff = a[sort] - b[sort];
    return order === 'asc' ? diff : -diff;
  });

  // Limit
  const total = result.length;
  result = result.slice(0, limit);

  // Strip heavy fields from list response
  const lite = result.map(({ description, links, ...rest }) => rest);

  return success({ coins: lite, total });
}

// ─── GET /api/market/coins/:id ───────────────────────────
export function handleCoinDetail(id) {
  const coin = coins.find((c) => c.id === id);
  if (!coin) {
    return error(`Coin '${id}' not found`, 404);
  }

  // Apply jitter to the single coin as well
  const jitter = 1 + (Math.random() - 0.5) * 0.002;
  const live = { ...coin, price: +(coin.price * jitter).toFixed(coin.price < 1 ? 6 : 2) };

  return success(live);
}

// ─── GET /api/market/kline/:id ───────────────────────────
export function handleKline(id, url) {
  const coin = coins.find((c) => c.id === id);
  if (!coin) {
    return error(`Coin '${id}' not found`, 404);
  }

  const params = url.searchParams;
  const interval = params.get('interval') || '1d';
  const limit = Math.min(parseInt(params.get('limit') || '30', 10), 365);

  const validIntervals = ['1m', '5m', '15m', '1h', '4h', '1d', '1w'];
  if (!validIntervals.includes(interval)) {
    return error(`Invalid interval. Allowed: ${validIntervals.join(', ')}`, 400);
  }

  // Map interval string → milliseconds
  const intervalMs = {
    '1m': 60_000,
    '5m': 300_000,
    '15m': 900_000,
    '1h': 3_600_000,
    '4h': 14_400_000,
    '1d': 86_400_000,
    '1w': 604_800_000,
  }[interval];

  const klines = generateKline(coin.price, limit, intervalMs);

  return success({ coin_id: coin.id, interval, klines });
}

// ─── K-line generator ────────────────────────────────────
// Walks backward from "now", producing OHLCV candles.
// Volatility ≈ 3 % per candle to keep charts looking realistic.
function generateKline(basePrice, count, intervalMs) {
  const VOLATILITY = 0.03;
  const now = Date.now();
  const klines = [];

  // Start from the oldest candle and walk forward so each candle's open = prev close
  let close = basePrice * (1 + (Math.random() - 0.5) * VOLATILITY * count * 0.02);

  for (let i = count - 1; i >= 0; i--) {
    const time = now - i * intervalMs;
    const open = close;

    // Random walk for close
    const change = open * VOLATILITY * (Math.random() - 0.5);
    close = +(open + change).toFixed(open < 1 ? 6 : 2);

    // High / Low derived from open & close with a little extra wick
    const wickUp = Math.abs(change) * (0.5 + Math.random());
    const wickDown = Math.abs(change) * (0.5 + Math.random());
    const high = +(Math.max(open, close) + wickUp).toFixed(open < 1 ? 6 : 2);
    const low = +(Math.min(open, close) - wickDown).toFixed(open < 1 ? 6 : 2);

    // Volume: proportional to base price × random factor
    const volume = +(basePrice * (800 + Math.random() * 1200)).toFixed(2);

    klines.push({
      time,
      open: +open.toFixed(open < 1 ? 6 : 2),
      high,
      low,
      close,
      volume,
    });
  }

  return klines;
}
