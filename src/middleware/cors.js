// CORS middleware for CryptoScope API Gateway
// Handles preflight (OPTIONS) and injects CORS headers on all responses.

const ALLOWED_ORIGINS = [
  'https://fe-template.ichimaruxsmile.workers.dev',
  'http://localhost:5173',
  'http://localhost:3000',
];

const CORS_HEADERS = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Request-Id',
  'Access-Control-Max-Age': '86400',
};

/**
 * Check whether the given origin is allowed.
 * Matches exact origins in the whitelist or any *.pages.dev domain.
 */
export function getAllowedOrigin(origin) {
  if (!origin) return null;
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  if (/\.pages\.dev$/.test(origin)) return origin;
  return null;
}

/**
 * Handle CORS preflight (OPTIONS) requests.
 * Returns 204 with the full set of CORS headers.
 */
export function handleOptions(request) {
  const origin = request.headers.get('Origin');
  const allowed = getAllowedOrigin(origin);

  if (allowed) {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': allowed,
        ...CORS_HEADERS,
      },
    });
  }

  // Origin not allowed — still respond 204 but without CORS headers
  return new Response(null, { status: 204 });
}

/**
 * Clone a Response and append CORS headers based on the request origin.
 */
export function addCorsHeaders(response, request) {
  const origin = request.headers.get('Origin');
  const allowed = getAllowedOrigin(origin);

  const headers = new Headers(response.headers);

  if (allowed) {
    headers.set('Access-Control-Allow-Origin', allowed);
    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      headers.set(key, value);
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
