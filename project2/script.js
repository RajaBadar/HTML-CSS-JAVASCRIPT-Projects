//get dom elements
const video = document.getElementById('video')
const play = document.getElementById('play')
const stop = document.getElementById('stop')
const progress = document.getElementById('progress')
const time = document.getElementById('time')

// function to play or pause video
function palypausevideo() {
    if (video.paused) {
        video.play();
    }
    else{
        video.pause();
    }

};

// function to update play or pause icon
function updateicons() {
    if (video.paused) {
            play.innerHTML = '<i class = "fa fa-play fa-2x"></i>'
        }
       
    else{
           play.innerHTML = '<i class = "fa fa-pause fa-2x"></i>'
        }
};

//function to update the video progress
function updateprogress() {
    progress.value = (video.currentTime / video.duration) * 100;
    // use current time to calculate minutes
    let minutes =Math.floor( video.currentTime / 60 )
    // format min to always 2 digits
    if (minutes< 10){
        minutes = '0' + String(minutes);
    }
    // use currebt time to calculat seconds

    let seconds = Math.floor(video.currentTime % 60);
    if ( seconds < 10) {
        seconds = '0' + String(seconds);
    }
    
    
    // update time in UI
    time.innerHTML = `${minutes}:${seconds}`;



    
};

//function to stop video playback
function stopvideo() {
    // reset the video time to zero
    video.currentTime = 0;
    video.pause();

};

// function to update the videos progess based on progress bar change

function updatevideoprogress() {
    video.currentTime = (progress.value * video.duration) / 100 ;


};

// event listeners
// 1. listen for click on video element
video.addEventListener('click', palypausevideo);
// 2. listen for pause event on video element
video.addEventListener('pause', updateicons);
// 3. listen for play event on video element
video.addEventListener('play', updateicons);
// 4. listen for timeupdate event on video element
video.addEventListener('timeupdate', updateprogress);
// 5. listen for click event on play button
play.addEventListener('click', palypausevideo);
// 6. listen for click event on stop button
stop.addEventListener('click', stopvideo);
// 7, listen for change event on progress bar
progress.addEventListener('change', updatevideoprogress);