//get dom elements
const container = document.getElementById('container');
const prevBtn = document.getElementById('previous');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const trackTitle = document.getElementById('song-title');
const albumArt = document.getElementById('album-art');

//Available tracks
const tracks = ['Hope', 'Experience'];

//create a index to track  which track is currently playing
let trackIndex = 1;
// function to initialise app with default track
function loadTrack(track){
    //update track title using track name
    trackTitle.innerText =track;
    //update audio element with new source
    audio.src = `music/${track}.mp3`;
    //update album art
    albumArt.src = `images/${track}.jpg`
};
//function to play the selected Track
function playTrack(){
    //add play class to the container
    container.classList.add('play');
    //replace with the pause icon
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    //begin play the song in audio element
    audio.play();
};
//pauese the playing track
function pauseTrack(){
    //add play class to the container
    container.classList.remove('play');
    //replace with the pause icon
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();

};

//function for the previous Track
function prevTrack(){
   //decrement 1 from the track index
    trackIndex--;

     // if  track index value 0 is less than 0 go to last track
    if(trackIndex < 0 ){
        trackIndex = tracks.length - 1
    }
    //load the new track in audio player
    loadTrack(tracks[trackIndex]);
    //play the track
    playTrack();
};


//function for the previous Track
function nextTrack(){
    trackIndex++;
    // if  track index value 0 is less than 0 go to last track
    if(trackIndex > tracks.length - 1){
        trackIndex = 0
    }
    //load the new track in audio player
    loadTrack(tracks[trackIndex]);
    //play the track
    playTrack();

};
//function to update the progress bar
function updateProgressBar(e){
    //get the duration and current time of audio
    const { duration , currentTime } = e.srcElement;
    const progress = currentTime/duration *100;
    progressBar.style.width = `${progress}%`;
    

};

//function update the progressbar
function updateProgress(e){
    const width = this.clientWidth;
    const progressX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = progressX/width *duration;
};


//Event listener
//1.listen for click on play button
playBtn.addEventListener('click',() =>{
    //check if track already playing
    const isTrackPlaying = container.classList.contains('play');
   //
    if(isTrackPlaying){
        //if track is playing pause the track  
        pauseTrack();    
         
    }else{
       // if the track is not playing play the track
       playTrack(); 
    }
    

});

//2.listen on click on previos btn
prevBtn.addEventListener('click',prevTrack);
//3.listen on click on next btn
nextBtn.addEventListener('click',nextTrack);
//4.listen for time update on audio element
audio.addEventListener('timeupdate', updateProgressBar);
//5.lissten for the click on progress bar
progressContainer.addEventListener('click',updateProgress);

//6.listen for end of track
audio.addEventListener('ended' ,nextTrack);

//call the load track
loadTrack(tracks[trackIndex]);