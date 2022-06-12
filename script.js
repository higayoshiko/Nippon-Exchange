
(function() {
  const dropdown = document.querySelector(".converter-dropdown");
  const amount = document.querySelector(".converter-input");
  const convertButton = document.querySelector(".convert-btn");
  // const resultText = document.querySelector(".result-num");
  const burger = document.querySelector(".nav-burger");
  const hiddenNav = document.querySelector(".hidden-nav");
  const hiddenIcon = document.querySelector(".hidden-nav-item");
  const copyrightYear = document.querySelector(".copyrightYear");
  const rateUpdateDateAndTime = document.querySelector(".heading-sub-ss span");
  const currentRateInCoverter = document.querySelector(".result-rate");
  const resultValue = document.querySelector(".result-val");
  const resultAcronym = document.querySelector(".result-acronym");


  let acronym = "";

  copyrightYear.innerHTML = new Date().getFullYear();

  let rateList = {};

  function storeJsonAsObjects(buyJson, sellJson) {

      if(!rateList[buyJson["base_code"]] && !rateList[sellJson["target_code"]]){
        rateList[buyJson["base_code"]] = {
          "BUY": buyJson["conversion_rate"],
          "SELL": sellJson["conversion_rate"]
        }
    }
  };

  const tableCurrencies = document.querySelectorAll(".currencies span");

  tableCurrencies.forEach(async function(currency) {

    const apiKeys = "";
    let currencyNames = currency.innerHTML.toUpperCase();
    let selectSellCell = currency.parentNode.nextElementSibling;
    let selectBuyCell = selectSellCell.nextElementSibling;

    try {
      let [buyFetch, sellFetch] = await Promise.all([
        //buy rates
        fetch(`https://v6.exchangerate-api.com/v6/${apiKeys}/pair/${currencyNames}/JPY`),
        //sell rates
        fetch(`https://v6.exchangerate-api.com/v6/${apiKeys}/pair/JPY/${currencyNames}`)
      ]);

      (async function convertToJson() {
        let buyJson = await buyFetch.json();
        let sellJson = await sellFetch.json();
        storeJsonAsObjects(buyJson, sellJson);

        if(currencyNames === buyJson["base_code"] && currencyNames === sellJson["target_code"]){
          selectSellCell.innerHTML = sellJson["conversion_rate"];
          selectBuyCell.innerHTML = buyJson["conversion_rate"];
        }

        rateUpdateDateAndTime.innerHTML = buyJson["time_last_update_utc"];

      })();
    } catch (err) {
      console.log(err)
    }
  });

  //show conversion result
  function showResult(value, result) {
    // resultText.innerHTML = `${value} JPY = ${result} ${acronym}`;
    resultValue.innerHTML = value;
    currentRateInCoverter.innerHTML = result;
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
        currentRateInCoverter.innerHTML = rateList[acronym].BUY;
        resultValue.innerHTML = "1";
      });
    });
  };

  convertButton.addEventListener("click", function() {
    //get amount/value and convert it to a number
    value = Number(amount.value);
    result = (value / rateList[acronym].BUY).toFixed(2);
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
