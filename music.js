const apiKey = "9433b9f2a8077343edb60cc12b908e52";
const username = "BundleAxis";

async function loadCurrentSong() {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&limit=1&format=json`;

  const response = await fetch(url);
  const data = await response.json();

  const track = data.recenttracks.track[0];
  const musicBox = document.querySelector(".music-box");
  const infoText = document.querySelector(".now-playing");
  const cover = document.querySelector(".album-cover");

  if (!track) {
    infoText.textContent = "Nothing playing!";
    cover.src = "fallback.png";
    musicBox.classList.remove("playing");
    return;
  }

  const trackName = track.name;
  const artist = track.artist["#text"];
  const albumImg =
    track.image?.[3]?.["#text"] ||
    track.image?.[2]?.["#text"] ||
    "fallback.png";

  const isPlaying = track["@attr"]?.nowplaying === "true";

  // Track-Text setzen
  infoText.innerHTML = isPlaying
    ? `Now playing: <strong>${trackName}</strong> by <strong>${artist}</strong>`
    : `Last played: <strong>${trackName}</strong> by <strong>${artist}</strong>`;

  // Albumcover setzen
  cover.src = albumImg;

  // Klasse für Visual-Effekt
  musicBox.classList.toggle("playing", isPlaying);
}

// Laden und alle 15 Sekunden aktualisieren
loadCurrentSong();
setInterval(loadCurrentSong, 15000);
