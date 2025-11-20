const apiKey = "9433b9f2a8077343edb60cc12b908e52";
const username = "BundleAxis";

async function loadCurrentSong() {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

  const response = await fetch(url);
  const data = await response.json();

  const track = data.recenttracks.track[0];
  const musicBox = document.querySelector(".music-box");

  if (track["@attr"] && track["@attr"].nowplaying === "true") {
    musicBox.innerHTML = `
      <p>🎵 Now playing: <strong>${track.name}</strong> by <strong>${track.artist["#text"]}</strong></p>
    `;
  } else {
    musicBox.innerHTML = `<p>🎵 Nothing playing right now ;3</p>`;
  }
}

loadCurrentSong();
setInterval(loadCurrentSong, 15_000); // alle 15 Sekunden aktualisieren