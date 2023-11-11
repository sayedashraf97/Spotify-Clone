// The code starts with a console.log("Welcome to Spotify");.
console.log("Welcome to Spotify");


//  variables are initialized, including songIndex, audioElement, masterPlay, myProgressBar, gif, masterSongName, and songItems.
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// An array songs is defined, containing objects with song information.
let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

// A loop iterates through songItems and sets the image source and text content based on the corresponding data in the songs array.
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// The masterPlay button click event is set up.

masterPlay.addEventListener('click', ()=>{
    // If the audio is paused or at the beginning, it plays the audio, changes the play icon to pause, and shows the GIF.
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    // If the audio is playing, it pauses the audio, changes the icon to play, and hides the GIF.
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// An event listener is added to the audioElement for the 'timeupdate' event.
// It calculates the progress as a percentage and updates the progress bar (myProgressBar).
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

// An event listener is added to myProgressBar for the 'change' event.
// It updates the audio's current time based on the progress bar's value.
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

// Event listeners are added to each play button (songItemPlay).
const makeAllPlays = ()=>{
    // When a play button is clicked, it makes all other play buttons inactive, sets the songIndex, updates the audio source, and plays the selected song.
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{

    element.addEventListener('click', (e)=>{ 
        // Calls a function makeAllPlays(). The function is assumed to make all play icons inactive, but the code for makeAllPlays() is not provided here.
        makeAllPlays();
        // Parses the integer value from the 'id' attribute of the clicked element and assigns it to the variable songIndex.
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        // Sets the audio element's source to the path of the selected song.
        audioElement.src = `songs/${songIndex+1}.mp3`;
        // Sets the inner text of the element with the id 'masterSongName' to the name of the selected song.
        masterSongName.innerText = songs[songIndex].songName;
        // ets the current playback time of the audio element to 0, ensuring the song starts from the beginning.
        audioElement.currentTime = 0;
        // Makes a GIF (assumed to be referenced by the variable gif) visible by setting its opacity to 1.
        audioElement.play();

        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

// Event listener for the 'next' button:
document.getElementById('next').addEventListener('click', ()=>{
    // If songIndex is at the last song, it resets to the first; otherwise, it increments songIndex.
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    // It updates the audio source and plays the new song.
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})
// Event listener for the 'previous' button:

document.getElementById('previous').addEventListener('click', ()=>{
    // If songIndex is at the first song, it stays at the first; otherwise, it decrements songIndex.
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    // It updates the audio source and plays the new song.
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})