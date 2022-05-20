//get dom elements
const baseCurrency = document.getElementById('base-currency');
const targetCurrency = document.getElementById('target-currency');
const baseAmount = document.getElementById('base-amount');
const targetAmount = document.getElementById('target-amount');
const exchangeRate = document.getElementById('xrate');
const flipBtn = document.getElementById('flip');
 
// function to fetch exchange rates from api
function calculate(){

    //get the currency codes for base and target currencies\
    const baseCode = baseCurrency.value;
    const targetCode = targetCurrency.value;
    console.log(baseCode,targetCode);
    //execute fetch api
    fetch(`https://v6.exchangerate-api.com/v6/8636d208a2f5814bf6c54269/latest/${baseCode}`)
        .then( res => res.json() )
        .then( data => {
            //get the xchange rates for base currency to target currency
            rate = data.conversion_rates[targetCode];
            //update  dom with xchange rate
            exchangeRate.innerHTML = `1 ${baseCode} = ${rate} ${targetCode}`;
            // calculate amount of target curruency based on exchange rate
            targetAmount.value =( baseAmount.value * rate).toFixed(2) ;
        }) 
    


};
  
// event listners
//1. lisetn for change to base currency
baseCurrency.addEventListener('change',calculate);
//2.listen for input in base amount
baseAmount.addEventListener('input',calculate);
//3. listen for change to target amount
targetCurrency.addEventListener('change',calculate);
//4. listen for input in target amount
targetAmount.addEventListener('input',calculate);
//5. listen for click on flip
flipBtn.addEventListener('click',() => {
    //save the value of base currency in a temp
    const tempCurrency = baseCurrency.value;
    //reassign base currency using target currency
    baseCurrency.value = targetCurrency.value;
    //reassign target currency using original base currency
    targetCurrency.value = tempCurrency;
    //recalculate exchange rate and update dom 
    calculate();
})
// initial calculation
calculate();