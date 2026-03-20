// ─────────────────────────────────────────────────────────
// CryptoScope Mock Data
// All mock data consumed by the route handlers lives here.
// ─────────────────────────────────────────────────────────

export const coins = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 87420.55,
    change_24h: 2.34,
    change_7d: 5.12,
    market_cap: 1720000000000,
    volume_24h: 28500000000,
    circulating_supply: 19600000,
    high_24h: 88100.00,
    low_24h: 85300.00,
    ath: 109114.88,
    logo: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    description: 'Bitcoin is the first decentralized cryptocurrency. Nodes in the peer-to-peer bitcoin network verify transactions through cryptography and record them in a distributed ledger called a blockchain.',
    links: {
      website: 'https://bitcoin.org',
      whitepaper: 'https://bitcoin.org/bitcoin.pdf',
      github: 'https://github.com/bitcoin/bitcoin',
    },
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2035.18,
    change_24h: -1.25,
    change_7d: 3.78,
    market_cap: 245000000000,
    volume_24h: 12800000000,
    circulating_supply: 120500000,
    high_24h: 2080.00,
    low_24h: 1995.00,
    ath: 4891.70,
    logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    description: 'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform.',
    links: {
      website: 'https://ethereum.org',
      whitepaper: 'https://ethereum.org/en/whitepaper/',
      github: 'https://github.com/ethereum/go-ethereum',
    },
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    price: 135.42,
    change_24h: 4.56,
    change_7d: 8.23,
    market_cap: 65000000000,
    volume_24h: 3200000000,
    circulating_supply: 440000000,
    high_24h: 138.00,
    low_24h: 129.00,
    ath: 294.33,
    logo: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    description: 'Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale.',
    links: {
      website: 'https://solana.com',
      whitepaper: 'https://solana.com/solana-whitepaper.pdf',
      github: 'https://github.com/solana-labs/solana',
    },
  },
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'BNB',
    price: 608.35,
    change_24h: 0.89,
    change_7d: -1.45,
    market_cap: 90000000000,
    volume_24h: 1800000000,
    circulating_supply: 145900000,
    high_24h: 615.00,
    low_24h: 600.00,
    ath: 793.35,
    logo: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    description: 'BNB is the native cryptocurrency of the BNB Chain ecosystem, used for transaction fees, staking, and governance.',
    links: {
      website: 'https://www.bnbchain.org',
      whitepaper: 'https://github.com/bnb-chain/whitepaper',
      github: 'https://github.com/bnb-chain',
    },
  },
  {
    id: 'ripple',
    symbol: 'XRP',
    name: 'XRP',
    price: 2.38,
    change_24h: -0.67,
    change_7d: 2.11,
    market_cap: 137000000000,
    volume_24h: 4500000000,
    circulating_supply: 57400000000,
    high_24h: 2.45,
    low_24h: 2.30,
    ath: 3.84,
    logo: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    description: 'XRP is the native digital asset on the XRP Ledger, an open-source, permissionless and decentralized blockchain technology.',
    links: {
      website: 'https://xrpl.org',
      whitepaper: 'https://ripple.com/files/ripple_consensus_whitepaper.pdf',
      github: 'https://github.com/ripple',
    },
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.742,
    change_24h: 1.23,
    change_7d: -0.89,
    market_cap: 26500000000,
    volume_24h: 620000000,
    circulating_supply: 35700000000,
    high_24h: 0.755,
    low_24h: 0.728,
    ath: 3.10,
    logo: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    description: 'Cardano is a proof-of-stake blockchain platform that says its goal is to allow changemakers, innovators, and visionaries to bring about positive global change.',
    links: {
      website: 'https://cardano.org',
      whitepaper: 'https://docs.cardano.org/introduction',
      github: 'https://github.com/cardano-foundation',
    },
  },
  {
    id: 'dogecoin',
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.1724,
    change_24h: 3.45,
    change_7d: 6.78,
    market_cap: 25200000000,
    volume_24h: 1900000000,
    circulating_supply: 146200000000,
    high_24h: 0.1780,
    low_24h: 0.1650,
    ath: 0.7376,
    logo: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    description: 'Dogecoin is a cryptocurrency created by software engineers Billy Markus and Jackson Palmer as a lighthearted alternative to traditional cryptocurrencies.',
    links: {
      website: 'https://dogecoin.com',
      whitepaper: 'https://github.com/dogecoin/dogecoin/blob/master/README.md',
      github: 'https://github.com/dogecoin/dogecoin',
    },
  },
  {
    id: 'avalanche',
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 22.85,
    change_24h: -2.10,
    change_7d: 1.34,
    market_cap: 9300000000,
    volume_24h: 420000000,
    circulating_supply: 407000000,
    high_24h: 23.60,
    low_24h: 22.10,
    ath: 146.22,
    logo: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
    description: 'Avalanche is an open-source platform for launching decentralized applications and enterprise blockchain deployments in one interoperable, highly scalable ecosystem.',
    links: {
      website: 'https://www.avax.network',
      whitepaper: 'https://www.avalabs.org/whitepapers',
      github: 'https://github.com/ava-labs',
    },
  },
];

// ─── Alerts (mutable at runtime within a single Worker invocation) ───
let alertIdCounter = 4;

export let alerts = [
  {
    id: 'alert_1',
    coin_id: 'bitcoin',
    type: 'price_above',
    value: 90000,
    active: true,
    created_at: '2025-03-15T08:30:00Z',
  },
  {
    id: 'alert_2',
    coin_id: 'ethereum',
    type: 'change_below',
    value: -5,
    active: true,
    created_at: '2025-03-16T14:20:00Z',
  },
  {
    id: 'alert_3',
    coin_id: 'solana',
    type: 'price_below',
    value: 120,
    active: false,
    created_at: '2025-03-17T09:00:00Z',
  },
];

export function addAlert(alert) {
  const id = `alert_${alertIdCounter++}`;
  const newAlert = { id, ...alert, active: true, created_at: new Date().toISOString() };
  alerts.push(newAlert);
  return newAlert;
}

export function removeAlert(id) {
  const idx = alerts.findIndex((a) => a.id === id);
  if (idx === -1) return false;
  alerts.splice(idx, 1);
  return true;
}

// ─── Portfolio Holdings ──────────────────────────────────
export const holdings = [
  { coin_id: 'bitcoin', amount: 0.5, avg_cost: 62500 },
  { coin_id: 'ethereum', amount: 5, avg_cost: 1850 },
  { coin_id: 'solana', amount: 100, avg_cost: 98 },
  { coin_id: 'dogecoin', amount: 50000, avg_cost: 0.12 },
];

export function addHolding({ coin_id, amount, avg_cost }) {
  const existing = holdings.find((h) => h.coin_id === coin_id);
  if (existing) {
    // Merge: weighted average cost
    const totalAmount = existing.amount + amount;
    existing.avg_cost = +((existing.avg_cost * existing.amount + avg_cost * amount) / totalAmount).toFixed(6);
    existing.amount = totalAmount;
    return existing;
  }
  const entry = { coin_id, amount, avg_cost };
  holdings.push(entry);
  return entry;
}
