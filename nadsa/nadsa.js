const watchlist = [
 "arbitrum",
 "chainlink",
 "optimism",
 "avalanche"
];

const btc = document.getElementById("btc");
const eth = document.getElementById("eth");
const sol = document.getElementById("sol");

async function loadPrices() {

const url =
"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true";

const res = await fetch(url);
const data = await res.json();

btc.innerHTML = `
<h3>Bitcoin</h3>
$${data.bitcoin.usd}
<br>24h: ${data.bitcoin.usd_24h_change.toFixed(2)}%
`;

eth.innerHTML = `
<h3>Ethereum</h3>
$${data.ethereum.usd}
<br>24h: ${data.ethereum.usd_24h_change.toFixed(2)}%
`;

sol.innerHTML = `
<h3>Solana</h3>
$${data.solana.usd}
<br>24h: ${data.solana.usd_24h_change.toFixed(2)}%
`;

// ALERTAS DE RISCO

if (data.solana.usd_24h_change < -8)
 alert("⚠️ SOL caiu forte");

if (data.ethereum.usd_24h_change < -6)
 alert("⚠️ ETH queda relevante");

if (data.bitcoin.usd_24h_change < -5)
 alert("⚠️ BTC fraco");
}

async function scanOpportunities() {

const url =
`https://api.coingecko.com/api/v3/simple/price?ids=${watchlist.join(",")}&vs_currencies=usd&include_24hr_change=true`;

const res = await fetch(url);
const coins = await res.json();

for (let coin in coins) {
 if (coins[coin].usd_24h_change > 10) {
  alert(`🚀 ${coin.toUpperCase()} oportunidade`);
 }
}
}

loadPrices();
scanOpportunities();

setInterval(() => {
 loadPrices();
 scanOpportunities();
}, 30000);

