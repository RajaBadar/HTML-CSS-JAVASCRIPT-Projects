//get dom elements

const  main = document.getElementById('main');
const toggleBtn = document.getElementById('toggle');
const voiceSelect = document.getElementById('voices');
const closeBtn = document.getElementById('close');
const customText = document.getElementById('text');
const readBtn = document.getElementById('read');
const customTextDiv = document.getElementById('custom-text');

//array for holding all images and text to be read
const data = [
    {
        image:'./img/angry.jpg',
        text:"I'm angry"
    },
    {
        image:'./img/drink.jpg',
        text:"I'm thirsty"
    }, 
    {
        image:'./img/food.jpg',
        text:"I'm hungry"
    },
    {
        image:'./img/grandma.jpg',
        text:"I am going to my gradma house"
    },
    {
        image:'./img/happy.jpg',
        text:"I'm Happy"
    },
    {
        image:'./img/home.jpg',
        text:"I'm Home"
    },
    {
        image: './img/hurt.jpg',
        text:"I'm hurt"
    },
    {
        image:'./img/outside.jpg',
        
        text:"I want to go outside"
    },
    {
        image:'./img/sad.jpg',
        text:"I'm sad"
    },
    {
        image:'./img/scared.jpg',
        text:"I'm scared"
    },
    {
        image:'./img/school.jpg',
        text:"I want to go to school"
    },
    {
        image:'./img/tired.jpg',
        text:"I'm tired"
    }
   
];
let voicesBackup = [];


//create a box for each object in the data array
data.forEach(createBOX);

//FUNCTIONs 
//1. function to create speech boxes
function createBOX(imageObj){
    
   //create empty div for image to be added to the main grid later
   const box = document.createElement('div');
   //get the image url and text from the  data array
   const {image,text } =imageObj;
   //APPly a css class to the new div
   box.classList.add('box');
   //add the image inside the box
   box.innerHTML  = `
        <img src="${image}" alt="${text}" />
        <p class="imageInfo">${text}</p>
   `;
   //add event for speaking text
    box.addEventListener('click',() =>{
    setMessage(text);
    speakText();
    })
   //add the new box to DOM
   main.appendChild(box);

};
//initialise speech synthesis
const message = new SpeechSynthesisUtterance();
//2.function to get voices from web speech api and put into select
function populateVoiceList(){
    if(typeof speechSynthesis ==="undefined"){
        return;
    }
    let voices = speechSynthesis.getVoices();
    voicesBackup = voices;
    for(var i=0 ;i < voices.length; i++){
        var option = document.createElement('option');
        option.textContent = voices[i].name + '('+ voices[i].lang + ')';

        if(voices[i].default){
            option.textContent += ' (DEFAULT VOICE)';
        }
        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name',voices[i].name);
        voiceSelect.appendChild(option);

    }
};
//call the function 

populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
};

//3.function to set the text for speech synthesis
function setMessage(text){
    message.text = text;
};

//4.function to speak the text
function speakText(){
    speechSynthesis.speak(message);
};
//5. function to set the new voice
function setVoice(e){
    message.voice = voicesBackup.find(voice => voice.name === e.target.value);
};
//funtion to set text for speech
function setText(text){
    message.text= text;
};

//function to make the read the text
function speakText(){
    speechSynthesis.speak(message);
};


//Event listener
//1.Toggle button
toggleBtn.addEventListener('click',() =>{
    customTextDiv.classList.toggle('show');
});

//2.close button in custom text div
closeBtn.addEventListener('click',() =>{
    customTextDiv.classList.remove('show');
});
//3.listen for voice change
speechSynthesis.addEventListener('voiceschanged',populateVoiceList);
voiceSelect.addEventListener('change',setVoice);
//4. listen for  read text
readBtn.addEventListener('click', () =>{
    setText(customText.value);
    speakText();
});


