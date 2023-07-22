// Reference
const containerEle = document.querySelector(".container");
const playMusicBtn = document.querySelector("#play-btn");
const pauseMusicBtn = document.querySelector("#pause-btn");
const nextMusicBtn = document.getElementById("next-btn");
const prevMusicBtn = document.getElementById("prev-btn");
const audioEle = document.querySelector("#audio");
const musicImgEle = document.querySelector(".music-img");
const titleEle = document.querySelector("#title");
const progressContainerEle = document.querySelector(".progress-container");
const progressEle = document.getElementById("progress");
const musicList = ['hey','summer','ukulele'];
let songIndex = 2;


const loadSong = function (songIndex) {
    titleEle.textContent = musicList[songIndex]
    audioEle.src = `music/${musicList[songIndex]}.mp3`;
    musicImgEle.src = `images/${musicList[songIndex]}.jpg`
}
loadSong(songIndex)

// play song 
const playMusic = function() {
    containerEle.classList.add("play")
    playMusicBtn.classList.add("hide")
    pauseMusicBtn.classList.remove("hide")
    audioEle.play()
}
playMusic()

// pause song
const pauseMusic = function() {
    containerEle.classList.remove("play")
    pauseMusicBtn.classList.add("hide")
    playMusicBtn.classList.remove("hide")
    audioEle.pause()
}
pauseMusic()

// next song
const getNextSong = function() {
    songIndex++;
    if (songIndex > musicList.length - 1)
        songIndex = 0;

    loadSong(songIndex)
    playMusic()
}

// prev song
const getPrevSong = function() {
    songIndex--;
    if (songIndex < 0) 
        songIndex = musicList.length - 1;
    

    loadSong(songIndex)
    playMusic()
}

// update progress 
const updateProgressBar = function(e) {
    const {duration , currentTime} = e.srcElement;
    const  progresPercent =( currentTime / duration ) * 100;
    progressEle.style.width = `${progresPercent}px`
}

// set progress
const setProgress = function (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioEle.duration;
    audioEle.currentTime = (clickX / width) * duration
}

// Events handlers
playMusicBtn.addEventListener("click",playMusic)
pauseMusicBtn.addEventListener("click",pauseMusic)
audioEle.addEventListener('timeupdate',updateProgressBar)
prevMusicBtn.addEventListener('click', getPrevSong)
nextMusicBtn.addEventListener('click',getNextSong)
progressContainerEle.addEventListener('click',setProgress)
audioEle.addEventListener('ended',getNextSong)