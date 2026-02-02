const portfolio = {
 bitcoin: 350,
 ethereum: 250,
 solana: 200
};

if (data.solana.usd_24h_change > 10) {
 alert("SOL subiu mais de 10%");

}

// ALERTAS DE RISCO

if (data.solana.usd_24h_change < -8) {
  alert("⚠️ SOL caiu mais de 8% hoje");
}

if (data.ethereum.usd_24h_change < -6) {
  alert("⚠️ ETH queda forte detectada");
}

if (data.bitcoin.usd_24h_change < -5) {
  alert("⚠️ BTC em movimento negativo");
}

const watchlist = [
 "arbitrum",
 "chainlink",
 "optimism",
 "avalanche"
];

async function scanOpportunities() {

const url =
`https://api.coingecko.com/api/v3/simple/price?ids=${watchlist.join(",")}&vs_currencies=usd&include_24hr_change=true`;

const res = await fetch(url);
const coins = await res.json();

for (let coin in coins) {

  if (coins[coin].usd_24h_change > 10) {
    alert(`🚀 ${coin.toUpperCase()} subiu mais de 10% hoje`);
  }

}

}

scanOpportunities();
