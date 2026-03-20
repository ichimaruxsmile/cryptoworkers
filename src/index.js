// ─────────────────────────────────────────────────────────
// CryptoScope API Gateway — Cloudflare Worker Entry Point
// ─────────────────────────────────────────────────────────

import { handleOptions, addCorsHeaders } from './middleware/cors.js';
import { success, error } from './middleware/response.js';
import { handleCoins, handleCoinDetail, handleKline } from './routes/market.js';
import { handleGetAlerts, handleCreateAlert, handleDeleteAlert } from './routes/alerts.js';
import { handlePortfolio } from './routes/portfolio.js';

const VERSION = '1.0.0';
const PHASE = 1;

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const { pathname } = url;
      const method = request.method;

      // ── OPTIONS preflight ──────────────────────────────
      if (method === 'OPTIONS') {
        return handleOptions(request);
      }

      // ── Route dispatch ─────────────────────────────────
      let response;

      // Health check
      if ((pathname === '/' || pathname === '/api/health') && method === 'GET') {
        response = success({
          service: 'CryptoScope API Gateway',
          version: VERSION,
          phase: PHASE,
          status: 'healthy',
          endpoints: [
            'GET  /',
            'GET  /api/health',
            'GET  /api/market/coins',
            'GET  /api/market/coins/:id',
            'GET  /api/market/kline/:id',
            'GET  /api/alerts',
            'POST /api/alerts',
            'DELETE /api/alerts/:id',
            'GET  /api/portfolio',
          ],
        });
      }

      // Market — coin list
      else if (pathname === '/api/market/coins' && method === 'GET') {
        response = handleCoins(url);
      }

      // Market — kline (must be matched before coin detail to avoid
      // "kline" being treated as a coin id)
      else if (pathname.startsWith('/api/market/kline/') && method === 'GET') {
        const id = pathname.split('/api/market/kline/')[1];
        response = handleKline(id, url);
      }

      // Market — single coin detail
      else if (pathname.startsWith('/api/market/coins/') && method === 'GET') {
        const id = pathname.split('/api/market/coins/')[1];
        response = handleCoinDetail(id);
      }

      // Alerts — list
      else if (pathname === '/api/alerts' && method === 'GET') {
        response = handleGetAlerts();
      }

      // Alerts — create
      else if (pathname === '/api/alerts' && method === 'POST') {
        response = await handleCreateAlert(request);
      }

      // Alerts — delete
      else if (pathname.startsWith('/api/alerts/') && method === 'DELETE') {
        const id = pathname.split('/api/alerts/')[1];
        response = handleDeleteAlert(id);
      }

      // Portfolio
      else if (pathname === '/api/portfolio' && method === 'GET') {
        response = handlePortfolio();
      }

      // ── 404 fallback ───────────────────────────────────
      else {
        response = error('Not Found', 404);
      }

      // Inject CORS headers on every response
      return addCorsHeaders(response, request);
    } catch (err) {
      // Global error handler
      const fallback = error('Internal Server Error', 500);
      return addCorsHeaders(fallback, request);
    }
  },
};
