const balance = document.getElementById('balance');
const moneyCredit =  document.getElementById('money-credit');
const moneyDebit = document.getElementById('money-debit');
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');
//temporary array of transactuon to be replace with local storage
const Transactions = [
    { id: 1, reason: 'Salary', amount: +5000},
    { id: 1, reason: 'Breakfast', amount: -20},
    { id: 1, reason: 'Launch', amount: -30},
    { id: 1, reason: 'Dinner', amount: -60},
];

//get transaction data from storage 
let transactions=Transactions

//function to display transaction in dom -- history sec
function displayTransaction(transaction){
    // calculate if transaction is credit or debit\
    const type = transaction.amount > 0 ? '+':'-'
    //create a list item for the transaction
    const transactionLI = document.createElement('li');
    // determine class based on transaction type if positive then credit otherwise debit
    transactionLI.classList.add(transaction.amount > 0 ? 'credit':'debit');
    // assign the inner html for the transaction li
    transactionLI.innerHTML= `
        ${transaction.reason} <span>${transaction.amount}</span> 
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})"><i class="fa fa-trash" aria-hidden="true"></i></button>
    `;
    //add the list item in the dom under the transaction history list
    list.appendChild(transactionLI);
}
//FUNTion to update all balances 
function updateBalance(){
    // create a new array with jsut the amount from the transaction amount 
    const transactionAmounts = transactions.map(transaction => transaction.amount);
    //calculate total balance value 
    const totalBalance = transactionAmounts.reduce((acc, amount) => (acc +=amount),0);
   // calculate total credit balance value
   const creditBalance = transactionAmounts.
                                filter(amount => amount > 0 )
                                .reduce((acc,amount) =>(acc += amount),0);
                                
   
   // calculate total credit balance value                             
   const debitBalance = transactionAmounts.
                                filter(amount => amount < 0 )
                                .reduce((acc,amount) =>(acc += amount),0);
                                                           
//update value of dom
    balance.innerText = `$${totalBalance}`;
    moneyCredit.innerText = `$${creditBalance}`;
    moneyDebit.innerText = `$${debitBalance}`;
};
//function to create a random id
function createID(){
    return Math.floor(Math.random()*10000000000)
}

//function to add a transaction
function addTransaction(e){
    //stop reload
    e.preventDefault();
    //check if form has valid data
    if ( reason.value.trim() ===''|| amount.value.trim() ===''){
        //display error if form is not complete
        alert('Please provide a valid reason and transaction amount.')
    }else{
           //create an object for the transaction containing id , text for the reason and transaction amount
           const transaction = {
               id: createID(),
               reason: reason.value,
               amount: +amount.value
           }
           //push the new transaction into the transactions array
           transactions.push(transaction );
           //display the transaction in dom
           displayTransaction(transaction );
           //update all balance
           updateBalance();
           //clear form fields
           reason.value='';
           amount.value='';
    }


};
//function to delete transaction 
function deleteTransaction(id){
    //filter out the transaction with the provided id
    transactions=transactions.filter(transaction => transaction.id !==id );
    //initialise the app to update the dom
    init();
};

//function to initialise the application 
function init(){
    // clear all transaction history 
    list.innerHTML= '';
    //dispaly all transaction in db in the dom
    transactions.forEach(displayTransaction);

    updateBalance();
};

//event listener
//1.listen for form to add  a transaction
form.addEventListener('submit', addTransaction);

// initialise application
init();