console.log("Welcome to Spotify Lite");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio("1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let previousButton = document.getElementById("previous");
let nextButton = document.getElementById("next");
let volumeControl = document.getElementById("volumeBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let coverImage = document.getElementById("coverImage");

function updateSongInfo() {
  if (masterSongName && songs[songIndex]) {
    masterSongName.innerText = songs[songIndex].songName;
  }
  if (coverImage) {
    coverImage.src = `album${songIndex + 1}.jpeg`;
  }
}
const songs = [
  {
    songName: "BEANIE - Lauren Nicole, Groovy Chick",
    filePath: "frontend/1.mp3",
    coverPath: "cover/album1.jpeg",
  },
  {
    songName: "AASHIQUI 2 - Arijit Singh",
    filePath: "frontend/2.mp3",
    coverPath: "cover/album2.jpeg",
  },
  {
    songName: "ISHQE DI LAT - Ankit Tiwari & Tulsi Kumar",
    filePath: "frontend/3.mp3",
    coverPath: "cover/album3.jpeg",
  },
  {
    songName: "LOVE STORY - Taylor Swift",
    filePath: "frontend/4.mp3",
    coverPath: "cover/album4.jpeg",
  },
  {
    songName: "Krishna Theme - Paras Nath",
    filePath: "frontend/5.mp3",
    coverPath: "cover/album5.jpeg",
  },
  {
    songName: "Piya Ghar Aavenge - Kailash Kher",
    filePath: "frontend/6.mp3",
    coverPath: "cover/album6.jpeg",
  },
  {
    songName: "BEANIE - Track 7",
    filePath: "frontend/7.mp3",
    coverPath: "cover/album7.jpeg",
  },
];

// Master Play / Pause Control
function clickMasterPlay() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement
      .play()
      .then(() => {
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
      })
      .catch((error) => console.error("Playback failed:", error));
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    gif.style.opacity = 0;
  }
}

masterPlay.addEventListener("click", clickMasterPlay);

function updateSeekbar() {
  if (audioElement.duration) {
    let progress = parseInt(
      (audioElement.currentTime / audioElement.duration) * 100,
    );
    myProgressBar.value = progress;
  }
}

audioElement.addEventListener("timeupdate", updateSeekbar);
audioElement.addEventListener("ended", () => {
  masterPlay.classList.remove("fa-pause");
  masterPlay.classList.add("fa-play");
  gif.style.opacity = 0;
});

// Seek Track via Progress Bar
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// Reset all individual song play buttons
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle", "fa-pause");
      element.classList.add("fa-play-circle", "fa-play");
    },
  );
};

// Add listeners to individual song items
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play", "fa-play-circle");
      e.target.classList.add("fa-pause", "fa-pause-circle");

      audioElement.src = `${songIndex + 1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();

      masterPlay.classList.remove("fa-play");
      masterPlay.classList.add("fa-pause");
      gif.style.opacity = 1;
      updateSongInfo();
    });
  },
);

// Previous Track Control
if (previousButton) {
  previousButton.addEventListener("click", () => {
    if (songIndex <= 0) {
      songIndex = songs.length - 1;
    } else {
      songIndex -= 1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
    updateSongInfo();
  });
}

// Next Track Control
nextButton.addEventListener("click", () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();

  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
  gif.style.opacity = 1;
  updateSongInfo();
});
volumeControl.addEventListener("input", () => {
  audioElement.volume = volumeControl.value / 100;
});
