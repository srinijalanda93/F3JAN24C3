/**
 * step1:fetch the data using await async
 * step2:in step1 it return the promise using .then() get the data ,console it
 * step3:render it on
 */
async function fetchCoins() {
  //'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  );
  const data = await response.json();
  return data; //return Promise
}
//using .then()
fetchCoins()
  .then((data) => {
    console.log(data);
    renderTable(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
  let isMarketCapAscending = true;

function toggleSortMarketCap() {
  fetchCoins()
    .then((data) => {
      const sortedData = data.sort((a, b) => {
        if (isMarketCapAscending) {
          return b.market_cap - a.market_cap;
        } else {
          return a.market_cap - b.market_cap;
        }
      });
      renderTable(sortedData);
      isMarketCapAscending = !isMarketCapAscending;
    })
    .catch((error) => console.error('Error:', error));
}



function searchCoins() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.toLowerCase();
  fetchCoins()
    .then((data) => {
      const filteredData = data.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm)
      );
      renderTable(filteredData);
    })
    .catch((error) => console.error("Error:", error));
}

function sortCoins(sortBy) {
  fetchCoins()
    .then((data) => {
      const sortedData = data.sort((a, b) =>
        a[sortBy] > b[sortBy] ? 1 : b[sortBy] > a[sortBy] ? -1 : 0
      );
      renderTable(sortedData);
    })
    .catch((error) => console.error("Error:", error));
}


let isPercentageChangeAscending = true;

function toggleSortPercentageChange() {
  fetchCoins()
    .then((data) => {
      const sortedData = data.sort((a, b) => {
        if (isPercentageChangeAscending) {
          return b.percentage_change_24h - a.percentage_change_24h;
        } else {
          return a.percentage_change_24h - b.percentage_change_24h;
        }
      });
      renderTable(sortedData);
      isPercentageChangeAscending = !isPercentageChangeAscending;
    })
    .catch((error) => console.error('Error:', error));
}
function renderTable(data) {
  const table = document.getElementById("coinTable");
  data.forEach((coin) => {
    const row = `<tr>
      <td><img src="${coin.image}" alt="${coin.name} logo" width="32" /></td>
                    
                    <td>${coin.id}</td>
                    <td>${coin.name}</td>
                    <td>${coin.symbol}</td>
                    <td>${coin.current_price.toFixed(2)}</td>
                    <td>${coin.total_volume.toLocaleString()}</td>
                  </tr>`;
    table.innerHTML += row;
  });
}

