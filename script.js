console.log('Welcome to Spotify')
// Initialise the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Starboy", filepath: "songs/1.mp3", coverPath: "covers/Starboy.png"},
    {songName: "Popular", filepath: "songs/2.mp3", coverPath: "covers/Popular.jpg"},
    {songName: "Heartless", filepath: "songs/3.mp3", coverPath: "covers/Heartless.png"},
    {songName: "Blinding Lights", filepath: "songs/4.mp3", coverPath: "covers/Blinding Lights.png"},
    {songName: "Call Out My Name", filepath: "songs/5.mp3", coverPath: "covers/Call Out My Name.jpg"},
    {songName: "Save Your Tears", filepath: "songs/6.mp3", coverPath: "covers/Save Yours Tears.jpeg"},
]

songItems.forEach((element, i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//audioElement.play();
//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    //update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress)
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
       makeAllPlays();
       songIndex = parseInt(e.target.id);
       e.target.classList.remove('fa-play');
       e.target.classList.add('fa-pause');
       audioElement.src = `songs/${songIndex+1}.mp3`
       masterSongName.innerText = songs[songIndex].songName;
       audioElement.currentTime = 0;
       audioElement.play();
       gif.style.opacity = 1;
       masterPlay.classList.remove('fa-play');
       masterPlay.classList.add('fa-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=5){
        songIndex = 0
    }else{
        songIndex+=1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 5
    }else{
        songIndex-=1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})