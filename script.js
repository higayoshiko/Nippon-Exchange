// Today's buy rates
const usdBuy = 106.25;
const eurBuy = 124.44;
const gbpBuy = 138.28;
const cnyBuy = 15.52;
const phpBuy = 1.973;
const thbBuy = 3.18;
const cadBuy = 79.74;
const sgdBuy = 74.63;

/*********************************/

const dropdown = document.querySelector(".converter-dropdown");
const amount = document.querySelector(".converter-input");
const convertButton = document.querySelector(".convert-btn");
const resultText = document.querySelector(".result-num");
const burger = document.querySelector(".nav-burger");
const hiddenNav = document.querySelector(".hidden-nav");
const hiddenIcon = document.querySelector(".hidden-nav-item");

hiddenIcon.addEventListener("click", function() {
 hiddenNav.style.display = "none";
});

burger.addEventListener("click", function() {
  hiddenNav.style.display = "block";
});


// store variables
let acronym = "";
let result = [];
let value = [];

//select dropdown menu and apply eventListener
dropdown.addEventListener("click", function() {

  //select dropdown-list of the clicked element
  const list = this.querySelector(".dropdown-list");

  //select default-ctn of the clicked element
  let currentCurrency = this.querySelector(".default-ctn");
  //pass it to changeCurrency to change the text
  changeCurrency(list, currentCurrency);

  //if it contains the class of "hidden" remove it otherwise add it
  if (list.classList.contains("hidden")) {
    list.classList.remove("hidden");
  } else {
    list.classList.add("hidden");
  }
});


//function to change text inside the default option box
function changeCurrency(list, currentCurrency) {
  //select all the links of the selected dropdown-list
  const links = list.querySelectorAll(".dropdown-link");
  //select default-currency class of the selected dropdown-list
  let span = currentCurrency.querySelector(".default-currency");

  //select the link and change the current/default currency
  links.forEach(item => {
    item.addEventListener("click", function() {
      //get acronym and store it
      acronym = this.querySelector("span").innerHTML;

      //get currency
      let newCurrency = this.innerHTML;

      //change currency inside dropdown
      span.innerHTML = newCurrency;
    });
  });
};

//when convert button is clicked, variables value and acronym will be passed to getAmount()
convertButton.addEventListener("click", function() {
  //get amount/value and convert it to a number
  value = Number(amount.value);

  getAmount(value, acronym);

});

//calculate the converted amount from Japanese to the selected currency
//round it off and store the result
function getAmount(value, acronym) {

  switch (acronym) {
    case 'USD':
      result = (value / usdBuy).toFixed(2);
      showResult();
      break;

    case 'EUR':
      result = (value / eurBuy).toFixed(2);
        showResult();
      break;

    case 'GBP':
      result = (value / gbpBuy).toFixed(2);
        showResult();
      break;

    case 'CNY':
      result = (value / cnyBuy).toFixed(2);
        showResult();
      break;

    case 'PHP':
      result = (value / phpBuy).toFixed(2);
      showResult();
      break;

    case 'THB':
      result = (value / thbBuy).toFixed(2);
        showResult();
      break;

    case 'CAD':
      result = (value / cadBuy).toFixed(2);
        showResult();
      break;

    case 'SGD':
      result = (value / sgdBuy).toFixed(2);
        showResult();
      break;

    default:
      console.log("No currency")
  }
}

//show conversion result
function showResult() {
  resultText.innerHTML = value + "JPY = " + result + acronym;
}
