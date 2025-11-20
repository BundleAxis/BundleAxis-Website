const apiKey = "9433b9f2a8077343edb60cc12b908e52";
const username = "BundleAxis";

async function loadCurrentSong() {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1&extended=1&format=json`;

  const response = await fetch(url);
  const data = await response.json();

  const track = data.recenttracks.track[0];
  const musicBox = document.querySelector(".music-box");
  const infoText = document.querySelector(".now-playing");
  const cover = document.querySelector(".album-cover");

  if (!track) {
    infoText.textContent = "🎵 Nothing playing!";
    cover.src = "";
    return;
  }

  const trackName = track.name;
  const artist = track.artist.name;
  const albumImg =
    track.image && track.image[2] ? track.image[2]["#text"] : "";

  const isPlaying = track["@attr"]?.nowplaying === "true";

  if (isPlaying) {
    infoText.innerHTML =
      `🎵 Now playing: <strong>${trackName}</strong> by <strong>${artist}</strong>`;
    cover.src = albumImg || "fallback.png";
    musicBox.classList.add("playing");
  } else {
    infoText.textContent = "🎵 Nothing playing right now ;3";
    cover.src = "";
    musicBox.classList.remove("playing");
  }
}

// beim Laden
loadCurrentSong();

// alle 15 Sekunden aktualisieren
setInterval(loadCurrentSong, 15000);