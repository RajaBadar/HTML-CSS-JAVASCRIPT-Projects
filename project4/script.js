const addUserbtn = document.getElementById('add-user');
const doubleWealthbtn = document.getElementById('double-wealth');
const filterWealthbtn = document.getElementById('filter-wealth');
const sortbtn = document.getElementById('sort-wealth');
const aggregatebtn = document.getElementById('sum-wealth');
const main = document.getElementById('main');

// this is the array  to store user data to display in DOM
let userArray = []; 


// function TO fetch a random user and assign random wealth
async function generateRandomuser() {
// use fetch to random user data from randomuser.me
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    
    //save the user data
    const user = data.results[0]; 
    
    // create new user object with random user name  and wealth info
    const newUser =  {
        name :`${user.name.title} ${user.name.first} ${user.name.last}` ,
        wealth : Math.floor(Math.random() *1000000)

    };

    //add newuser object to user Array
    addUserdata(newUser);
     
};
// fucntion to add new user to user Accuracy
function addUserdata(user){
    //push user object to user accuracey
    userArray.push(user);
    
    //update the dom with new data in userarray
    updateDom();
};
//function to update the dom with new data in userarray 
function updateDom(userData = userArray){
    //wipe any element from main content
    main.innerHTML = '<h2><strong>User</strong> Wealth</h2>'
    // loop over user data array and display user in the dom
    userData.forEach( user => {
        //create a new div element for the user
        const divElement = document.createElement('div');
        //assign class to the new div
        divElement.classList.add('user');
        //add content to the new div element
        divElement.innerHTML = `<strong>${user.name}</strong>$ ${formatWealth(user.wealth)}`;
        // display the new div in dom
        main.appendChild(divElement);
    })
};
//function to double wealth
function doubleWealth(){
     userArray = userArray.map(user =>{
        return {...user, wealth:user.wealth*2}});
    //update the after double the wealth
    updateDom();
}

// function to filter wealth to show millonares
function filterWealth(){
     userArray = userArray.filter(user => user.wealth > 1000000 );
    console.log(userArray);
    updateDom();
}
//function to sort usres
function sortuser(){
    userArray.sort( (a , b) => b.wealth - a.wealth);
    updateDom();
}
function calculateNetWealth(){
    // use reduce method to calculate sum of all wealths
    const netWealth = userArray.reduce( (acc , user) => 
       ( acc += user.wealth ),0
    ); 
  
    //create a new div element 
    const totalWealthDiv = document.createElement('div');
    // create content for total wealth
    totalWealthDiv.innerHTML = `<h3>Net Wealth: <strong> $${formatWealth(netWealth)}</strong></h3>`;
    //apend the new total wealth div into dom
    main.appendChild(totalWealthDiv);
    
    
};
function formatWealth(wealth) {
   return wealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67

}

// eventlistner
//1. listen for click on add user 
addUserbtn.addEventListener('click',generateRandomuser)
//2. listen for click on double wealth
doubleWealthbtn.addEventListener('click', doubleWealth );
//3. listen for click on show millionare
filterWealthbtn.addEventListener('click',filterWealth);
//4. listen for click to sort users
sortbtn.addEventListener('click',sortuser);
//5. listen for click to calculate net worth
aggregatebtn.addEventListener('click', calculateNetWealth);

//generate some users on initial page load
generateRandomuser();
generateRandomuser();
generateRandomuser(); 
