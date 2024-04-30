const musicDets = [
  {
    title: "Ugly",
    artist: "timmies",
    location: "./audio/timmies - ugly (ft. nineteen95).opus",
    banner: "https://i.ytimg.com/vi/8ucqL3LeUos/maxresdefault.jpg",
  },
  {
    title: "Skyfall",
    artist: "Adele",
    location: "./audio/Adele_-_Skyfall__Official_Lyric_Video_(256k).mp3",
    banner: "https://upload.wikimedia.org/wikipedia/en/4/45/Skyfall_cover.png",
  },
  {
    title: "Snowman",
    artist: "Sia",
    location: "./audio/Sia - Snowman [Official Video].opus",
    banner:
      "https://cf.ltkcdn.net/www/images/std/352292-800x533-snowman-1445277044.jpg",
  },
  {
    title: "Lean Wit Me",
    artist: "xxxtantacion",
    location: "./audio/Juice WRLD -  Lean Wit Me (Official Music Video).opus",
    banner:
      "https://upload.wikimedia.org/wikipedia/en/1/12/Juice_WRLD_-_Lean_Wit_Me.webp",
  },
  {
    title: "Jocelyn",
    artist: "xxxtantacion",
    location: "./audio/XXXTENTACION - Jocelyn Flores (Audio).opus",
    banner:
      "https://qph.cf2.quoracdn.net/main-qimg-434c8f5af884ba4c72f182b63408b534-lq",
  },
  {
    title: "Mockingbird",
    artist: "Eminem",
    location: "./audio/Eminem - Mockingbird [Official Music Video].opus",
    banner: "https://i1.sndcdn.com/artworks-opw4v812XppH-0-t500x500.jpg",
  },
  {
    title: "Trapped In My Mind",
    artist: "Adam Oh",
    location:
      "./audio/Adam Oh - Trapped In My Mind (Lyrics ⧸ Lyric Video).opus",
    banner: "https://i.ytimg.com/vi/I-l_fSV2PtQ/maxresdefault.jpg",
  },
  {
    title: "Living Life In The Night",
    artist: "Cheriimoya",
    location:
      "./audio/Living Life In The Night - Cheriimoya (Lyrics) ft. Sierra Kidd.opus",
    banner: "https://i.scdn.co/image/ab67616d0000b273197e8611178672a1e4e0b076",
  },
  {
    title: "Everybody Dies In The Nightmare",
    artist: "xxxtantacion",
    location:
      "./audio/XXXTENTACION - Everybody Dies In Their Nightmares (Audio).opus",
    banner:
      "https://i1.sndcdn.com/artworks-78O5TG6Rq35slpU1-znxGwQ-t500x500.jpg",
  },
  {
    title: "La Casa de Papel",
    artist: "UK",
    location:
      "./audio/La Casa de Papel ｜ My Life Is Going On - - Cecilia Krull (Vídeo Oficial).opus",
    banner:
      "https://miro.medium.com/v2/resize:fit:825/1*2CMKE33zsBfCC34IRUfiog.jpeg",
  },
];
const audio = new Audio();
// const favSongsDets = []
var playingSong = 0;
const playlist = document.querySelector("#playlist");
const songTitle = document.querySelector("#song-title");
const songArtist = document.querySelector("#song-artists");
const artistBanner = document.querySelector("#artist-banner");
const playCurrent = document.querySelector("#playCurrent");

// core functions
function displaySongs() {
  var clutter = "";
  musicDets.forEach(function (song, index) {
    clutter += `<div class="song flex justify-between items-center border rounded-lg px-3 py-2 hover:bg-zinc-700">
              <div>
                <i data-ind=${index} id="playlist-icon" class="ri-play-fill pr-2 cursor-pointer"></i>
                <h3 id="playlist-title" class="inline text-sm">${song.title}</h3>
              </div>
              <i class="ri-more-fill"></i>
            </div>`;
    if (index == 0) {
      updateTitle();
      updateArtist();
      updateArtistBanner();
    } else if (index == musicDets.length - 1) {
      document.querySelector("#total-songs").innerHTML = index + 1 + " Songs";
    }
  });
  playlist.innerHTML = clutter;
}

function playSongs() {
  playlist.addEventListener("click", function (dets) {
    if (dets.target.classList.contains("ri-play-fill")) {
      resetPlayIcons();
      playingSong = dets.target.dataset.ind;
      audio.src = musicDets[playingSong].location;
      audio.play();
      dets.target.classList.remove("ri-play-fill");
      dets.target.classList.add("ri-pause-fill");
      playCurrent.classList.remove("ri-play-fill");
      playCurrent.classList.add("ri-pause-fill");
      updateTitle();
      updateArtist();
      updateArtistBanner();
    } else if (dets.target.classList.contains("ri-pause-fill")) {
      audio.pause();
      dets.target.classList.remove("ri-pause-fill");
      dets.target.classList.add("ri-play-fill");
      playCurrent.classList.remove("ri-pause-fill");
      playCurrent.classList.add("ri-play-fill");
    }
  });
}

function playCurrentSong() {
  playCurrent.addEventListener("click", function (dets) {
    if (dets.target.classList.contains("ri-play-fill")) {
      audio.src = musicDets[playingSong].location;
      audio.play();
      dets.target.classList.remove("ri-play-fill");
      dets.target.classList.add("ri-pause-fill");
      currentPlaylistSongIcon().classList.remove("ri-play-fill");
      currentPlaylistSongIcon().classList.add("ri-pause-fill");
    } else if (dets.target.classList.contains("ri-pause-fill")) {
      audio.pause();
      dets.target.classList.remove("ri-pause-fill");
      dets.target.classList.add("ri-play-fill");
      currentPlaylistSongIcon().classList.remove("ri-pause-fill");
      currentPlaylistSongIcon().classList.add("ri-play-fill");
    }
  });
}

function nextSong() {
  audio.addEventListener("ended", forwardCBF);
  document.querySelector("#forward").addEventListener("click", forwardCBF);
}

function forwardCBF() {
  if (playingSong == musicDets.length - 1) {
    restartPlaylist();
    resetPlayIcons();
    currentPlaylistSongIcon().classList.remove("ri-play-fill");
    currentPlaylistSongIcon().classList.add("ri-pause-fill");
  } else {
    playingSong++;
    audio.src = musicDets[playingSong].location;
    audio.play();
    updateTitle();
    updateArtist();
    updateArtistBanner();
    playCurrent.classList.remove("ri-play-fill");
    playCurrent.classList.add("ri-pause-fill");
    currentPlaylistSongIcon().classList.remove("ri-play-fill");
    currentPlaylistSongIcon().classList.add("ri-pause-fill");

    document
      .querySelector(`body [data-ind="${playingSong - 1}"]`)
      .classList.remove("ri-pause-fill");
    document
      .querySelector(`body [data-ind="${playingSong - 1}"]`)
      .classList.add("ri-play-fill");
  }
}

function previousSong() {
  document.querySelector("#backward").addEventListener("click", function () {
    if (playingSong == 0) {
      revertPlaylist();
      resetPlayIcons();
      currentPlaylistSongIcon().classList.remove("ri-play-fill");
      currentPlaylistSongIcon().classList.add("ri-pause-fill");
    } else {
      playingSong--;
      audio.src = musicDets[playingSong].location;
      audio.play();
      updateTitle();
      updateArtist();
      updateArtistBanner();

      document
        .querySelector(`body [data-ind="${playingSong + 1}"]`)
        .classList.remove("ri-pause-fill");
      document
        .querySelector(`body [data-ind="${playingSong + 1}"]`)
        .classList.add("ri-play-fill");

      currentPlaylistSongIcon().classList.remove("ri-play-fill");
      currentPlaylistSongIcon().classList.add("ri-pause-fill");
    }
  });
}

function songSeekBar() {
  const seekBar = document.querySelector("#seekBar");
  audio.addEventListener("loadedmetadata", () => {
    seekBar.max = audio.duration;
  });

  audio.addEventListener("timeupdate", function () {
    seekBar.value = audio.currentTime;
  });

  seekBar.addEventListener("input", function () {
    audio.currentTime = seekBar.value;
  });
}

function updateLeftoverTime() {
  audio.addEventListener("timeupdate", function () {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const leftoverTime = duration - currentTime;

    const minutes = Math.floor(leftoverTime / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(leftoverTime % 60)
      .toString()
      .padStart(2, "0");

    document.querySelector(
      "#song-duration"
    ).textContent = `${minutes}:${seconds}`;
  });
}

function controlVolume() {
  const volumeBar = document.querySelector("#volumeBar");
  const volumeIcon = document.querySelector(".ri-volume-up-fill");
  volumeIcon.addEventListener("click", function () {
    if (volumeBar.classList.contains("hidden")) {
      volumeBar.classList.remove("hidden");
    } else {
      volumeBar.classList.add("hidden");
    }
  });

  volumeBar.addEventListener("click", function () {
    event.stopPropagation();
  });
  volumeBar.addEventListener("change", function () {
    if (audio) {
      audio.volume = volumeBar.value / 100;
    }
  });
}

// need to work on it
// function addRemoveFav() {
//   const favIcon = document.querySelector("#fav-icon");
//   favIcon.addEventListener("click", function () {
//     if (this.classList.contains("text-red-600")) {
//       this.classList.remove("text-red-600")
//       favSongsDets.pop()
//     }
//     else {
//       this.classList.add("text-red-600");
//       favSongsDets.push(musicDets[playingSong]);
//     }
//   })
// }

function shuffleSongs() {
  const shuffleIcon = document.querySelector(".ri-shuffle-fill");
  shuffleIcon.addEventListener("click", function () {
    if (this.classList.contains("text-red-600")) {
      this.classList.remove("text-red-600");
    } else {
      this.classList.add("text-red-600");
      var ranSongInd = Math.floor(Math.random() * musicDets.length);
      playingSong = ranSongInd;
      playingSong = ranSongInd; // Get a new random song
      audio.src = musicDets[playingSong].location; // Update source
      audio.play(); // Play the new song
      updateTitle();
      updateArtist();
      updateArtistBanner();
      resetPlayIcons();
      currentPlaylistSongIcon().classList.remove("ri-play-fill");
      currentPlaylistSongIcon().classList.add("ri-pause-fill");
      if (playCurrent.classList.contains("ri-play-fill")) {
        playCurrent.classList.remove("ri-play-fill");
        playCurrent.classList.add("ri-pause-fill");
      }
      audio.addEventListener("ended", function () {
        var ranSongInd = Math.floor(Math.random() * musicDets.length);
        playingSong = ranSongInd;
        playingSong = ranSongInd; // Get a new random song
        audio.src = musicDets[playingSong].location; // Update source
        audio.play(); // Play the new song
        updateTitle();
        updateArtist();
        updateArtistBanner();
        resetPlayIcons();
        currentPlaylistSongIcon().classList.remove("ri-play-fill");
        currentPlaylistSongIcon().classList.add("ri-pause-fill");
      })
    }
  });
}

function songSpeedControl() {
  const speedIcon = document.querySelector(".ri-speed-up-fill");
  const speedIndicator = document.querySelector("#speed-indicator");
  var flag = 1
  speedIcon.addEventListener("click", function () {
    if (audio) {
      audio.playbackRate = 1;
      
      if (flag == 1) {
        audio.playbackRate = 1.25;
        this.classList.remove("text-white-600");
        this.classList.add("text-blue-600");
        speedIndicator.innerHTML = "1.25x";
        flag++;
      }
      else if (flag == 2) {
        audio.playbackRate = 1.5;
        this.classList.remove("text-blue-600");
        this.classList.add("text-yellow-600");
        speedIndicator.innerHTML = "1.5x";
        flag++;
      }
      else if (flag == 3) {
        audio.playbackRate = 2;
        this.classList.remove("text-yellow-600");
        this.classList.add("text-red-600");
        speedIndicator.innerHTML = "2x";
        flag++;
      }
      else {
        audio.playbackRate = 1;
        this.classList.remove("text-red-600");
        this.classList.add("text-white-600");
        speedIndicator.innerHTML = "";
        flag = 1;
      }

    }
  })
}

// not supporting on browsers, need to work on it
// function shareSong() {
//   const shareIcon = document.querySelector("#share-icon");
//   const shareMsg = document.querySelector("#share-msg");
//   const sharedURL = musicDets[playingSong].banner
//   shareIcon.addEventListener("click", function () {
//     navigator.clipboard.writeText(sharedURL);
//     shareMsg.classList.remove("-bottom-[400%]");
//     shareMsg.classList.add("bottom-0");
//     setTimeout(() => {
//       shareMsg.classList.remove("bottom-0");
//       shareMsg.classList.add("-bottom-[400%]");
//     }, 5000);
//   })
// }

// function's call
displaySongs();
playSongs();
playCurrentSong();
nextSong();
previousSong();
songSeekBar();
updateLeftoverTime();
controlVolume();
// addRemoveFav();
shuffleSongs();
songSpeedControl()
// shareSong()

// helper functions
function resetPlayIcons() {
  const icons = document.querySelectorAll(
    "#playlist .ri-play-fill,#playlist .ri-pause-fill"
  );

  icons.forEach((icon) => {
    icon.classList.remove("ri-pause-fill");
    icon.classList.add("ri-play-fill");
  });
}

function currentPlaylistSongIcon() {
  return document.querySelector(`body [data-ind="${playingSong}"]`);
}

function updateTitle() {
  return (songTitle.innerHTML = musicDets[playingSong].title);
}

function updateArtist() {
  return (songArtist.innerHTML = musicDets[playingSong].artist);
}

function updateArtistBanner() {
  return (artistBanner.src = musicDets[playingSong].banner);
}

function restartPlaylist() {
  playingSong = 0;
  audio.src = musicDets[playingSong].location;
  audio.play();
  updateTitle();
  updateArtist();
  updateArtistBanner();
}

function revertPlaylist() {
  playingSong = musicDets.length - 1;
  audio.src = musicDets[playingSong].location;
  audio.play();
  updateTitle();
  updateArtist();
  updateArtistBanner();
}
