(function() {
  const dropdown = document.querySelector(".converter-dropdown");
  const convertButton = document.querySelector(".convert-btn");
  const burger = document.querySelector(".nav-burger");
  const hiddenNav = document.querySelector(".hidden-nav");
  const hiddenIcon = document.querySelector(".hidden-nav-item");
  const copyrightYear = document.querySelector(".copyrightYear");
  const resultValue = document.querySelector(".results-val");
  const resultAcronym = document.querySelector(".results-acronym--1");
  const resultAcronymTwo = document.querySelector(".results-acronym--sub");
  const currentRateInCoverter = document.querySelector(".results-rate");
  const tableCurrencies = document.querySelectorAll(".currencies span");
  const rateUpdateDateAndTime = document.querySelector(".heading-sub-ss span");
  let rateList = {};
  let acronym = "";

  copyrightYear.innerHTML = new Date().getFullYear();

  tableCurrencies.forEach(function(currency) {

    let currencyNames = currency.innerHTML.toUpperCase();
    let selectBuyCell = currency.parentNode.nextElementSibling;
    let buyJson;

    try {
      //JPY base currency to other currencies
        fetch(`https://open.er-api.com/v6/latest/JPY`)
        .then(async response => {
          buyJson = await response.json();
        })
        .then(() => {
          rateUpdateDateAndTime.innerHTML = buyJson["time_last_update_utc"];
          selectBuyCell.innerHTML = buyJson.rates[currencyNames];
          // storeJsonAsObjects(buyJson.rates);
        })
        .then(() => {
          rateList[currencyNames] = buyJson.rates[currencyNames];
        });
    } catch (err) {
      console.log(err)
    }
  });

  //show conversion result
  function showResult(value, result) {
    // resultText.innerHTML = `${value} JPY = ${result} ${acronym}`;
    const resultAmount = document.querySelector(".results-amount");
    resultValue.innerHTML = result;
    resultAmount.innerHTML = value;
    resultAcronym.innerHTML = acronym;
  }

  //function to change text inside the default option box
  function changeCurrency(list, currentCurrency) {
    const links = list.querySelectorAll(".dropdown-link");
    let span = currentCurrency.querySelector(".default-currency");

    links.forEach(item => {
      item.addEventListener("click", function() {
        acronym = this.querySelector("span").innerHTML;
        let newCurrency = this.innerHTML;
        span.innerHTML = newCurrency;
        currentRateInCoverter.innerHTML = rateList[acronym];
        resultAcronymTwo.innerHTML = acronym;
      });
    });
  };

  convertButton.addEventListener("click", function() {
    const amount = document.querySelector(".converter-input");
    //get amount/value and convert it to a number
    value = Number(amount.value);
    result = (value / rateList[acronym]).toFixed(2);
    showResult(value, result);
  });

  //select dropdown menu and apply eventListener
  dropdown.addEventListener("click", function() {
    const list = this.querySelector(".dropdown-list");
    let currentCurrency = this.querySelector(".default-ctn");

    changeCurrency(list, currentCurrency);

    if (list.classList.contains("hidden")) {
      list.classList.remove("hidden");
    } else {
      list.classList.add("hidden");
    }
  });

  hiddenIcon.addEventListener("click", function() {
    hiddenNav.style.display = "none";
  });

  burger.addEventListener("click", function() {
    hiddenNav.style.display = "block";
  });
})();
