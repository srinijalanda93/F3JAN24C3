/**
 * step1:fetch the data using await async
 * step2:in step1 it return the promise using .then() get the data ,console it
 * step3:render it on
 */
async function fetchCoins() {
  //'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
  const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
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

  const backBtn=document.querySelector('.headpart>button');
  addEventListener.backBtn(()=>{
    renderTable(data) 
  })
  //Table Ui
  function renderTable(data) {
    const tablebody = document.querySelector("#coinTable >tbody");
    console.log("the table object is : ",tablebody);
    console.log("the table object is : ",tablebody.childElementCount );
    if(tablebody.childElementCount===0){
        //mean no tag inside the tablebody
    data.forEach((coin) => {
        const row = `<tr>
            <td><img src="${coin.image}" alt="${coin.name} logo" width="32" /></td>
            <td>${coin.id}</td>
            <td>${coin.name}</td>
            <td>${coin.symbol}</td>
            <td>${coin.current_price.toFixed(2)}</td>
            <td>${coin.total_volume.toLocaleString()}</td>
        </tr>`;
        tablebody.innerHTML += row;
    });
    }else{
        tablebody.innerHTML="" //clear the previous tag inside the tbody
        data.forEach((coin) => {
            const row = `<tr>
                <td><img src="${coin.image}" alt="${coin.name} logo" width="32" /></td>
                <td>${coin.id}</td>
                <td>${coin.name}</td>
                <td>${coin.symbol}</td>
                <td>${coin.current_price.toFixed(2)}</td>
                <td>${coin.total_volume.toLocaleString()}</td>
            </tr>`;
            tablebody.innerHTML += row;
        });
    }
}



function searchCoins() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.toLowerCase();
  fetchCoins()
    .then((data) => {
      const matchedCoin = data.find(coin => coin.name.toLowerCase() === searchTerm);
    
      // If a matching coin is found, update the table with only that coin
      if (matchedCoin) {
          renderTable([matchedCoin]);
      } else {
          console.log("No matching coin found");
          // Handle the case where no matching coin is found (e.g., show an error message)
      }
    }).catch((error) => console.error("Error:", error));
}



let isMarketCapAscending = false;
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
      console.log("the sorted data",sortedData)
      renderTable(sortedData);
      isMarketCapAscending = !isMarketCapAscending; //making it as false
    })
    .catch((error) => console.error('Error:', error));
}


let isPercentageChangeAscending = false;
function toggleSortPercentageChange() {
  fetchCoins()
    .then((data) => {
      const sortedData = data.sort((a, b) => {
        if (isPercentageChangeAscending) {
          return b.market_cap_change_percentage_24h- a.market_cap_change_percentage_24h;
        } else {
          return a.market_cap_change_percentage_24h- b.market_cap_change_percentage_24h;
        }
      });
      renderTable(sortedData);
      isPercentageChangeAscending = !isPercentageChangeAscending; //to make it false
    })
    .catch((error) => console.error('Error:', error));
}
