//elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');  
const fullscreen = player.querySelector('.player__fullscreen');  

//functions
function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    //new way to call methods on elements
    video[method]();
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    //element name is equal to the video player property that needs to be updated
    video[this.name] = this.value;
}

function handleProgress(){
    const playbackPercentage = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${playbackPercentage}%`;
}

function handleScrubbing(e) {
    video.currentTime = (e.offsetX/progress.offsetWidth) * video.duration;
}

function handleScreenSizing() {
    console.dir(video);
    console.dir(document);
    // video.he
    player.classList.toggle('fullscreen');
}

//event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('pause', () => toggle.textContent = '►');
video.addEventListener('play', () => toggle.textContent = '❚ ❚');
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
fullscreen.addEventListener('click', handleScreenSizing);

let mouseDown = false;
progress.addEventListener('click', handleScrubbing);
progress.addEventListener('mousemove', (e) => mouseDown && handleScrubbing(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

