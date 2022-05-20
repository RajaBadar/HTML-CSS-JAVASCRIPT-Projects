//get dom element
const wordElement =  document.getElementById('word');
const incorrectLettersElement = document.getElementById('incorrect-letters');
const notificationElement = document.getElementById('notification-container');
const gameoverElement = document.getElementById('gameover-container');
const gameoverMessage = document.getElementById('gameover-message');
const playBtn = document.getElementById('play-btn');
 
//get dom elements for hangman parts
const hangmanParts = document.querySelectorAll('.hangman-part');
 
//list of 1000 words]
const words = ["scientist","song","built","word","spell","value","support","heavy","men","dead","bad","here","street","dream","eventually","original","broad","floating","daily","tool","swimming","mostly","escape","fourth","within","government","somewhere","means","fight","section","longer","clear","creature","situation","who","were","turn","table","sure","sugar","sister","wool"];
// const words = ["bad","no"];
