const watchlist = [
 "arbitrum",
 "chainlink",
 "optimism",
 "avalanche"
];

// sua carteira (valores em dólares)
const wallet = {
 bitcoin: 29,
 ethereum: 13,
 solana: 4
};

const btc = document.getElementById("btc");
const eth = document.getElementById("eth");
const sol = document.getElementById("sol");

function addAlert(msg) {
 alerts.innerHTML += `<div class="alert">${msg}</div>`;
}

async function loadPrices() {
 
 alerts.innerHTML = ""; // limpa alerts antigos

const url =
"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true";

const res = await fetch(url);
const data = await res.json();

 //cards
 
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
 addAlert("⚠️ SOL caiu forte");

if (data.ethereum.usd_24h_change < -6)
 addalert("⚠️ ETH queda relevante");

if (data.bitcoin.usd_24h_change < -5)
 addalert("⚠️ BTC fraco");
}

// carteira total

let total =
 wallet.bitcoin +
 wallet.ethereum +
 wallet.solana;

addAlert(`💰 Carteira: $${total.toFixed(2)}`);
}

////oportunidades

async function scanOpportunities() {

const url =
`https://api.coingecko.com/api/v3/simple/price?ids=${watchlist.join(",")}&vs_currencies=usd&include_24hr_change=true`;

const res = await fetch(url);
const coins = await res.json();

for (let coin in coins) {
 if (coins[coin].usd_24h_change > 10) {
  addAlert(`🚀 ${coin.toUpperCase()} rompendo forte`);
 }
}
}

loadPrices();
scanOpportunities();

setInterval(() => {
 loadPrices();
 scanOpportunities();
}, 30000);


