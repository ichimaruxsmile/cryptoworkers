// Unified JSON response helpers for CryptoScope API Gateway.

/**
 * Return a success JSON response.
 * Shape: { code, data, ts }
 */
export function success(data, status = 200) {
  return new Response(
    JSON.stringify({
      code: status,
      data,
      ts: Date.now(),
    }),
    {
      status,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

/**
 * Return an error JSON response.
 * Shape: { code, error, ts }
 */
export function error(message, status = 400) {
  return new Response(
    JSON.stringify({
      code: status,
      error: message,
      ts: Date.now(),
    }),
    {
      status,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
