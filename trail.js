// let data=[ 
//     {id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400', current_price: 61885},
    
//     {id: 'ethereum', symbol: 'eth', name: 'Ethereum', image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628', current_price: 3414.09},
 
//     {id: 'tether', symbol: 'usdt', name: 'Tether', image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661', current_price: 1,},
   
//     {id: 'binancecoin', symbol: 'bnb', name: 'BNB', image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970', current_price: 410.93,},
  
//     {id: 'solana', symbol: 'sol', name: 'Solana', image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756', current_price: 129.21,},
  
//     {id: 'ripple', symbol: 'xrp', name: 'XRP', image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442', current_price: 0.628884,},
   
//     {id: 'staked-ether', symbol: 'steth', name: 'Lido Staked Ether', image: 'https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206', current_price: 3409.23,},

//     {id: 'usd-coin', symbol: 'usdc', name: 'USDC', image: 'https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694', current_price: 0.998891,},
  
//     {id: 'cardano', symbol: 'ada', name: 'Cardano', image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090', current_price: 0.728108,},
  
//     {id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1696501409', current_price: 0.138536,}
 
//     ]

async function fetchCoins() {
    //'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
    const data = await response.json();
    return data; //return Promise
  }

function searchCoins() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase();
fetchCoins().then((data) =>{
    const filteredData = data.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm));
    // renderTable(filteredData);
    console.log("the searched data is:",filteredData);
}).catch((error) => console.error("Error:", error));    
}  

