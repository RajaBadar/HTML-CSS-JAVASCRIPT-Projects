///get DOM elements 
const  addCardBtn = document.getElementById('add-card');
const  clearCardsbtn = document.getElementById('clear-cards');
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev-btn');
const  nextBtn= document.getElementById('next-btn');
const  currentCard= document.getElementById('current-card');
const addCardContainer = document.getElementById('add-card-container');
const  cancelBtn= document.getElementById('cancel-btn');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const addCardSubmitBtn = document.getElementById('add-card-btn');

//index of current card
let currentCardNum = 0;

//Array of card dom elements
const cardElements = [];

//card data
const cardData = getCardsData();

// const cardData = [
//     {
//         question: "What is React?",
//         answer: "React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies."
//     },

//     {
//         question:"What is Express JS?",
//         answer:"Express.js, or simply Express, is a back end web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node js"
//     }
// ];

//function to get cards data in local storage
function setData(cardData){
     localStorage.setItem('cards',JSON.stringyfy(cardData));
     window.location.reload();
};

//function to get cards from local storage
function getCardsData(){
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ?[] : cards;
};

//fucntion to update the current card number
function updateCurrentCardNum(){
    currentCard.innerText = `${currentCardNum + 1} / ${cardElements.length}`; 
};

//function to create all cards
function createCards(){
    cardData.forEach(( cardData , index ) => createCard(cardData , index));
};

//function to create single card
function createCard(cardData, index){
    //create a div dom element
    const card = document.createElement('div');
    //style the div
    card.classList.add('card');
    //make the first card active 
    if (index === 0 ){
        card.classList.add('active')
    }
    //add card contant
    card.innerHTML = `
            <div class="inside-card">
                <div class="card-front">
                    <p>${cardData.question}</p>
                </div>
                <div class="card-back">
                    <p>${cardData.answer}</p>
                </div>
            </div>
    `;
//listen for clcik on the card
card.addEventListener('click',() => card.classList.toggle('show-answer'));
    //add card dom element to the card elements array
    cardElements.push(card);
    //render the card in the UI
    cardsContainer.appendChild(card);
    //display count info for current card
    updateCurrentCardNum();
};

//event listener
//1. listen for click on the prev btn
prevBtn.addEventListener('click', () => {
    //remove active class from current card
    cardElements[currentCardNum].className = 'card';
    //decrement current card num by 1
    currentCardNum--;
    //check if index is less than 0
    if (currentCardNum < 0 ){
        //if yes change index to last card in array
        currentCardNum = cardElements.length-1;
    }
    //make the new card active 
    cardElements[currentCardNum].className = 'card active';
    //display count info for current card
    updateCurrentCardNum();
});

//2. listen for click on the next btn
nextBtn.addEventListener('click', () => {
    //remove active class from current card
    cardElements[currentCardNum].className = 'card';
    //inecrement current card num by 1
    currentCardNum++;
    //check if index is higher than last card
    if (currentCardNum > cardElements.length-1 ){
        //if yes change index to last card in array
        currentCardNum = 0;
    }
    //make the new card active 
    cardElements[currentCardNum].className = 'card active';
    //display count info for current card
    updateCurrentCardNum();
});

//3.LISTEN for the click on the add card botton 
addCardBtn.addEventListener('click', () => addCardContainer.classList.add('active'));

//4.LISTEN for the click on the cancle  botton 
cancelBtn.addEventListener('click', () => addCardContainer.classList.remove('active'));

//5.listen for form sumit
addCardSubmitBtn.addEventListener('click', () =>{
    //get values for q and a
    const question = questionInput.value;
    const answer = answerInput.value;
    //check if valid data in both q and a
    if ( question.trim() && answer.trim()){
        //create a new card object
        const newCard = { question , answer};
        //create a new card using this object
        createCard(newCard);
        //now empty the form fields
        questionInput.value='';
        answerInput.value= '';
        //hide the form
        addCardContainer.classList.remove('active');
        //push newcard obj into the cardsData array
        cardData.push(newCard);
        //updaet local storaeg with new all the cards
        setData(cardData);
    }
});

//6. listen to click on the clearcardsbtn
clearCardsbtn.addEventListener('click', () => {
    //clear data in local storage
    localStorage.clear();
    //clear data in cardContainer
    cardsContainer.innerHTML = '';
    //reload the window
    window.location.reload();
});

//initialise app by creating all apps 
createCards();