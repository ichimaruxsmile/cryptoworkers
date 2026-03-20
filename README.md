# CryptoScope API Gateway

> **Cloudflare Worker** serving as the edge API gateway for the CryptoScope cryptocurrency dashboard.

## Architecture Position

```
┌─────────────────────┐      ┌──────────────────────┐      ┌─────────────────┐
│   React Frontend    │ ───▶ │  CF Worker API GW    │ ───▶ │  AWS Backend    │
│  (Cloudflare Pages) │      │  ★ YOU ARE HERE ★    │      │  (Phase 2)      │
└─────────────────────┘      └──────────────────────┘      └─────────────────┘
```

- **Phase 1 (current):** All endpoints return **mock data** — no external dependencies.
- **Phase 2 (planned):** Swap mock handlers for `fetch()` calls forwarding to the AWS backend.

## Phase 1 Completion

| Feature | Status |
|---|---|
| Health check | ✅ |
| Market — coin list (sort / filter / jitter) | ✅ |
| Market — coin detail | ✅ |
| Market — K-line (OHLCV generation) | ✅ |
| Alerts — CRUD | ✅ |
| Portfolio — holdings + summary | ✅ |
| CORS middleware | ✅ |
| Unified JSON response format | ✅ |

## API Documentation

All successful responses follow this shape:

```json
{ "code": 200, "data": { ... }, "ts": 1711234567890 }
```

Error responses:

```json
{ "code": 400, "error": "Error description", "ts": 1711234567890 }
```

---

### Health Check

| Method | Path |
|---|---|
| GET | `/` |
| GET | `/api/health` |

Returns service name, version, phase, status, and available endpoints.

---

### Market

#### GET `/api/market/coins`

| Param | Type | Default | Description |
|---|---|---|---|
| `sort` | string | `market_cap` | Sort field: `market_cap`, `price`, `change_24h`, `volume_24h` |
| `order` | string | `desc` | Sort order: `desc` / `asc` |
| `limit` | number | `100` | Max results (capped at 100) |
| `q` | string | — | Search by name or symbol (case-insensitive) |

```bash
curl "http://localhost:8787/api/market/coins?sort=price&order=desc&limit=5"
```

#### GET `/api/market/coins/:id`

```bash
curl http://localhost:8787/api/market/coins/bitcoin
```

Returns full coin info including `description` and `links`. Returns 404 if not found.

#### GET `/api/market/kline/:id`

| Param | Type | Default | Description |
|---|---|---|---|
| `interval` | string | `1d` | Candle interval: `1m`, `5m`, `15m`, `1h`, `4h`, `1d`, `1w` |
| `limit` | number | `30` | Number of candles (max 365) |

```bash
curl "http://localhost:8787/api/market/kline/bitcoin?interval=1h&limit=24"
```

---

### Alerts

#### GET `/api/alerts`

Returns all alerts enriched with `coin_name`, `coin_symbol`, `current_price`.

#### POST `/api/alerts`

```bash
curl -X POST http://localhost:8787/api/alerts \
  -H "Content-Type: application/json" \
  -d '{"coin_id":"bitcoin","type":"price_above","value":100000}'
```

| Field | Required | Description |
|---|---|---|
| `coin_id` | Yes | Coin identifier |
| `type` | Yes | `price_above` / `price_below` / `change_above` / `change_below` |
| `value` | Yes | Threshold value |

#### DELETE `/api/alerts/:id`

```bash
curl -X DELETE http://localhost:8787/api/alerts/alert_1
```

---

### Portfolio

#### GET `/api/portfolio`

Returns `holdings` array (with current price, value, PnL) and `summary` (total value, cost, PnL, PnL %).

```bash
curl http://localhost:8787/api/portfolio
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (default http://localhost:8787)
npm run dev
```

## Deployment

```bash
# Deploy to default environment
npm run deploy

# Deploy to production
npm run deploy:prod
```

## Project Structure

```
cryptoscope-worker/
├── wrangler.toml              # Worker configuration
├── package.json
├── README.md
└── src/
    ├── index.js               # Entry point — route dispatch + CORS
    ├── middleware/
    │   ├── cors.js            # CORS origin whitelist & header injection
    │   └── response.js        # Unified JSON response helpers
    ├── mock/
    │   └── data.js            # All mock data (coins, alerts, holdings)
    └── routes/
        ├── market.js          # /api/market/* handlers
        ├── alerts.js          # /api/alerts handlers
        └── portfolio.js       # /api/portfolio handler
```

## Phase 2 Roadmap

In Phase 2, the mock handlers will be replaced with `fetch()` calls forwarding requests to the AWS backend:

1. Add `AWS_API_BASE` binding in `wrangler.toml`
2. Replace each mock handler with a proxy that forwards to the AWS endpoint
3. Add request signing / API key injection via Worker environment variables
4. Add response caching with Cache API for high-frequency endpoints
5. Add rate limiting and request validation at the edge
