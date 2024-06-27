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
let playingSong = 0;

const playlist = document.querySelector("#playlist");
const songTitle = document.querySelector("#song-title");
const songArtist = document.querySelector("#song-artists");
const artistBanner = document.querySelector("#artist-banner");
const playCurrent = document.querySelector("#playCurrent");

function displaySongs() {
  const songElements = musicDets
    .map(
      (song, index) => `
    <div class="song flex justify-between items-center border rounded-lg px-3 py-2 hover:bg-zinc-700">
      <div>
        <i data-ind=${index} id="playlist-icon" class="ri-play-fill pr-2 cursor-pointer"></i>
        <h3 id="playlist-title" class="inline text-sm">${song.title}</h3>
      </div>
      <i class="ri-more-fill"></i>
    </div>`
    )
    .join("");

  playlist.innerHTML = songElements;
  document.querySelector(
    "#total-songs"
  ).innerHTML = `${musicDets.length} Songs`;
  updateSongDetails();
}

function updateSongDetails() {
  songTitle.innerHTML = musicDets[playingSong].title;
  songArtist.innerHTML = musicDets[playingSong].artist;
  artistBanner.src = musicDets[playingSong].banner;
}

function resetPlayIcons() {
  document
    .querySelectorAll("#playlist .ri-play-fill,#playlist .ri-pause-fill")
    .forEach((icon) => {
      icon.classList.remove("ri-pause-fill");
      icon.classList.add("ri-play-fill");
    });
}

function currentPlaylistSongIcon() {
  return document.querySelector(`body [data-ind="${playingSong}"]`);
}

function handlePlayPauseIcons(target, isPlaying) {
  target.classList.toggle("ri-play-fill", !isPlaying);
  target.classList.toggle("ri-pause-fill", isPlaying);
  playCurrent.classList.toggle("ri-play-fill", !isPlaying);
  playCurrent.classList.toggle("ri-pause-fill", isPlaying);
}

function playSongs() {
  playlist.addEventListener("click", (event) => {
    const target = event.target;
    if (
      target.classList.contains("ri-play-fill") ||
      target.classList.contains("ri-pause-fill")
    ) {
      resetPlayIcons();
      const isPlaying = target.classList.contains("ri-play-fill");
      playingSong = +target.dataset.ind;
      audio.src = musicDets[playingSong].location;
      isPlaying ? audio.play() : audio.pause();
      handlePlayPauseIcons(target, isPlaying);
      updateSongDetails();
    }
  });
}

function playCurrentSong() {
  playCurrent.addEventListener("click", (event) => {
    const isPlaying = playCurrent.classList.contains("ri-play-fill");
    audio.src = musicDets[playingSong].location;
    isPlaying ? audio.play() : audio.pause();
    handlePlayPauseIcons(currentPlaylistSongIcon(), isPlaying);
    updateSongDetails();
  });
}

function nextSong() {
  audio.addEventListener("ended", forwardCBF);
  document.querySelector("#forward").addEventListener("click", forwardCBF);
}

function forwardCBF() {
  playingSong = (playingSong + 1) % musicDets.length;
  audio.src = musicDets[playingSong].location;
  audio.play();
  updateSongDetails();
  resetPlayIcons();
  handlePlayPauseIcons(currentPlaylistSongIcon(), true);
}

function previousSong() {
  document.querySelector("#backward").addEventListener("click", () => {
    playingSong = (playingSong - 1 + musicDets.length) % musicDets.length;
    audio.src = musicDets[playingSong].location;
    audio.play();
    updateSongDetails();
    resetPlayIcons();
    handlePlayPauseIcons(currentPlaylistSongIcon(), true);
  });
}

function songSeekBar() {
  const seekBar = document.querySelector("#seekBar");
  audio.addEventListener(
    "loadedmetadata",
    () => (seekBar.max = audio.duration)
  );
  audio.addEventListener(
    "timeupdate",
    () => (seekBar.value = audio.currentTime)
  );
  seekBar.addEventListener("input", () => (audio.currentTime = seekBar.value));
}

function updateLeftoverTime() {
  audio.addEventListener("timeupdate", () => {
    const leftoverTime = audio.duration - audio.currentTime;
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
  audio.volume = volumeBar.value / 100;

  volumeIcon.addEventListener("click", () =>
    volumeBar.classList.toggle("hidden")
  );
  volumeBar.addEventListener("click", (event) => event.stopPropagation());
  volumeBar.addEventListener(
    "change",
    () => (audio.volume = volumeBar.value / 100)
  );
}

function shuffleSongs() {
  const shuffleIcon = document.querySelector(".ri-shuffle-fill");
  shuffleIcon.addEventListener("click", () => {
    shuffleIcon.classList.toggle("text-red-600");
    if (shuffleIcon.classList.contains("text-red-600")) {
      forwardCBF = () => {
        playingSong = Math.floor(Math.random() * musicDets.length);
        audio.src = musicDets[playingSong].location;
        audio.play();
        updateSongDetails();
        resetPlayIcons();
        handlePlayPauseIcons(currentPlaylistSongIcon(), true);
      };
    } else {
      forwardCBF = forwardDefaultCBF;
    }
  });
}

function songSpeedControl() {
  const speedIcon = document.querySelector(".ri-speed-up-fill");
  const speedIndicator = document.querySelector("#speed-indicator");
  const speeds = [1, 1.25, 1.5, 2];
  let currentSpeedIndex = 0;

  speedIcon.addEventListener("click", () => {
    currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
    audio.playbackRate = speeds[currentSpeedIndex];
    speedIndicator.textContent =
      currentSpeedIndex === 0 ? "" : `${speeds[currentSpeedIndex]}x`;
  });
}

displaySongs();
playSongs();
playCurrentSong();
nextSong();
previousSong();
songSeekBar();
updateLeftoverTime();
controlVolume();
shuffleSongs();
songSpeedControl();
