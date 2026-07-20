// ==============================
// Music Data
// ==============================

const songs = [
{
title: "Believer",
artist: "Imagine Dragons",
src: "songs/song1.mp3",
cover: "images/cover1.jpg"
},
{
title: "Faded",
artist: "Alan Walker",
src: "songs/song2.mp3",
cover: "images/cover2.jpg"
},
{
title: "Perfect",
artist: "Ed Sheeran",
src: "songs/song3.mp3",
cover: "images/cover3.jpg"
}
];

// ==============================
// DOM Elements
// ==============================

const audio=document.getElementById("audio");

const cover=document.getElementById("cover");

const miniCover=document.getElementById("miniCover");

const title=document.getElementById("title");

const artist=document.getElementById("artist");

const miniTitle=document.getElementById("miniTitle");

const miniArtist=document.getElementById("miniArtist");

const playBtn=document.getElementById("play");

const miniPlay=document.getElementById("miniPlay");

const prevBtn=document.getElementById("prev");

const nextBtn=document.getElementById("next");

const progress=document.getElementById("progress");

const currentTime=document.getElementById("currentTime");

const duration=document.getElementById("duration");

const volume=document.getElementById("volume");

const playlist=document.querySelectorAll("#playlist li");

const shuffleBtn=document.getElementById("shuffle");

const repeatBtn=document.getElementById("repeat");

const favoriteBtn=document.getElementById("favorite");

const themeBtn=document.getElementById("theme");

const muteBtn=document.getElementById("mute");

// ==============================
// Variables
// ==============================

let currentSong=0;

let playing=false;

let repeat=false;

let shuffle=false;

let favorite=false;

// ==============================
// Load Song
// ==============================

function loadSong(index){

title.textContent=songs[index].title;

artist.textContent=songs[index].artist;

miniTitle.textContent=songs[index].title;

miniArtist.textContent=songs[index].artist;

cover.src=songs[index].cover;

miniCover.src=songs[index].cover;

audio.src=songs[index].src;

playlist.forEach(song=>song.classList.remove("active"));

playlist[index].classList.add("active");

}

loadSong(currentSong);

// ==============================
// Play Song
// ==============================

function playSong(){

audio.play();

playing=true;

playBtn.innerHTML='<i class="fa-solid fa-pause"></i>';

miniPlay.innerHTML='<i class="fa-solid fa-pause"></i>';

cover.classList.add("rotate");

}

// ==============================
// Pause Song
// ==============================

function pauseSong(){

audio.pause();

playing=false;

playBtn.innerHTML='<i class="fa-solid fa-play"></i>';

miniPlay.innerHTML='<i class="fa-solid fa-play"></i>';

cover.classList.remove("rotate");

}

// ==============================
// Play Button
// ==============================

playBtn.onclick=()=>{

if(playing){

pauseSong();

}
else{

playSong();

}

};

miniPlay.onclick=playBtn.onclick;
// ==============================
// Next Song
// ==============================

function nextSong(){

if(shuffle){

currentSong=Math.floor(Math.random()*songs.length);

}
else{

currentSong++;

if(currentSong>=songs.length){

currentSong=0;

}

}

loadSong(currentSong);

playSong();

}

// ==============================
// Previous Song
// ==============================

function prevSong(){

if(shuffle){

currentSong=Math.floor(Math.random()*songs.length);

}
else{

currentSong--;

if(currentSong<0){

currentSong=songs.length-1;

}

}

loadSong(currentSong);

playSong();

}

nextBtn.onclick=nextSong;

prevBtn.onclick=prevSong;

// ==============================
// Playlist Click
// ==============================

playlist.forEach((item,index)=>{

item.onclick=()=>{

currentSong=index;

loadSong(currentSong);

playSong();

};

});

// ==============================
// Shuffle
// ==============================

shuffleBtn.onclick=()=>{

shuffle=!shuffle;

if(shuffle){

shuffleBtn.style.color="#22c55e";

shuffleBtn.style.transform="scale(1.1)";

}
else{

shuffleBtn.style.color="#ffffff";

shuffleBtn.style.transform="scale(1)";

}

};

// ==============================
// Repeat
// ==============================

repeatBtn.onclick=()=>{

repeat=!repeat;

if(repeat){

repeatBtn.style.color="#22c55e";

repeatBtn.style.transform="scale(1.1)";

}
else{

repeatBtn.style.color="#ffffff";

repeatBtn.style.transform="scale(1)";

}

};

// ==============================
// Auto Next Song
// ==============================

audio.addEventListener("ended",()=>{

if(repeat){

audio.currentTime=0;

playSong();

return;

}

nextSong();

});
// ==============================
// Progress Bar & Duration
// ==============================

audio.addEventListener("loadedmetadata",()=>{

progress.max=Math.floor(audio.duration);

duration.textContent=formatTime(audio.duration);

});

audio.addEventListener("timeupdate",()=>{

progress.value=Math.floor(audio.currentTime);

currentTime.textContent=formatTime(audio.currentTime);

});

// ==============================
// Seek Song
// ==============================

progress.addEventListener("input",()=>{

audio.currentTime=progress.value;

});

// ==============================
// Volume
// ==============================

volume.addEventListener("input",()=>{

audio.volume=volume.value/100;

});

// ==============================
// Mute
// ==============================

let muted=false;

muteBtn.onclick=()=>{

muted=!muted;

audio.muted=muted;

if(muted){

muteBtn.innerHTML='<i class="fa-solid fa-volume-xmark"></i>';

}
else{

muteBtn.innerHTML='<i class="fa-solid fa-volume-high"></i>';

}

};

// ==============================
// Favorite
// ==============================

favoriteBtn.onclick=()=>{

favorite=!favorite;

if(favorite){

favoriteBtn.innerHTML='<i class="fa-solid fa-heart"></i>';

favoriteBtn.style.color="#ef4444";

localStorage.setItem("favorite","true");

}
else{

favoriteBtn.innerHTML='<i class="fa-regular fa-heart"></i>';

favoriteBtn.style.color="#ffffff";

localStorage.setItem("favorite","false");

}

};

// Restore Favorite

if(localStorage.getItem("favorite")==="true"){

favorite=true;

favoriteBtn.innerHTML='<i class="fa-solid fa-heart"></i>';

favoriteBtn.style.color="#ef4444";

}

// ==============================
// Dark Mode
// ==============================

themeBtn.onclick=()=>{

document.body.classList.toggle("dark-mode");

if(document.body.classList.contains("dark-mode")){

themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

localStorage.setItem("theme","dark");

}
else{

themeBtn.innerHTML='<i class="fa-solid fa-moon"></i>';

localStorage.setItem("theme","light");

}

};

// Restore Theme

if(localStorage.getItem("theme")==="dark"){

document.body.classList.add("dark-mode");

themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

}

// ==============================
// Time Formatter
// ==============================

function formatTime(time){

if(isNaN(time)) return "0:00";

let min=Math.floor(time/60);

let sec=Math.floor(time%60);

if(sec<10){

sec="0"+sec;

}

return min+":"+sec;

}
// ==============================
// Keyboard Shortcuts
// ==============================

document.addEventListener("keydown",(e)=>{

if(e.target.tagName==="INPUT") return;

switch(e.key){

case " ":
e.preventDefault();

if(playing){

pauseSong();

}
else{

playSong();

}

break;

case "ArrowRight":

nextSong();

break;

case "ArrowLeft":

prevSong();

break;

case "m":

case "M":

muteBtn.click();

break;

case "d":

case "D":

themeBtn.click();

break;

}

});

// ==============================
// Equalizer Animation
// ==============================

const bars=document.querySelectorAll(".equalizer span");

function startEqualizer(){

bars.forEach(bar=>{

bar.style.animationPlayState="running";

});

}

function stopEqualizer(){

bars.forEach(bar=>{

bar.style.animationPlayState="paused";

});

}

audio.addEventListener("play",startEqualizer);

audio.addEventListener("pause",stopEqualizer);

audio.addEventListener("ended",stopEqualizer);

stopEqualizer();

// ==============================
// Save Last Played Song
// ==============================

window.addEventListener("beforeunload",()=>{

localStorage.setItem("lastSong",currentSong);

});

const savedSong=localStorage.getItem("lastSong");

if(savedSong!==null){

currentSong=parseInt(savedSong);

loadSong(currentSong);

}

// ==============================
// Download Button
// ==============================

const downloadBtn=document.getElementById("download");

downloadBtn.onclick=()=>{

window.open(audio.src,"_blank");

};

// ==============================
// Initial Settings
// ==============================

audio.volume=1;

volume.value=100;

// ==============================
// Console Message
// ==============================

console.log("🎵 Spotify Music Player Loaded Successfully!");

console.log("Made for CodeAlpha Internship 🚀");