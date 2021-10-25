// Today's buy rates
let usdBuy = 106.25;
let eurBuy = 124.44;
let gbpBuy = 138.28;
let cnyBuy = 15.52;
let phpBuy = 1.973;
let thbBuy = 3.18;
let cadBuy = 79.74;
let sgdBuy = 74.63;

/*********************************/

var dropdown = document.querySelector(".converter-dropdown");
var amount = document.querySelector(".converter-input");
var convertButton = document.querySelector(".convert-btn");
var resultText = document.querySelector(".result-num");

// store variables
var acronym = "";
var result = [];
var value = [];

//select dropdown menu and apply eventListener
dropdown.addEventListener("click", function() {

  //select dropdown-list of the clicked element
  var list = this.querySelector(".dropdown-list");

  //select default-ctn of the clicked element
  var currentCurrency = this.querySelector(".default-ctn");
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
  var links = list.querySelectorAll(".dropdown-link");
  //select default-currency class of the selected dropdown-list
  var span = currentCurrency.querySelector(".default-currency");

  //select the link and change the current/default currency
  links.forEach(item => {
    item.addEventListener("click", function() {
      //get acronym and store it
      acronym = this.querySelector("span").innerHTML;

      //get currency
      var newCurrency = this.innerHTML;

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
