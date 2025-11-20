const lines = [
  "> booting profile...",
  "> loading modules...",
  "> loading UI...",
  "> initializing BundleAxis...",
  "> system ready...",
  "> connecting to the wired",
  "> ...",
  "",
];

let text = "";
let idx = 0;
let char = 0;

function typer() {
  if (idx < lines.length) {
    if (char < lines[idx].length) {
      text += lines[idx][char];
      char++;
      document.getElementById("terminal-text").textContent = text;
      setTimeout(typer, 30);
    } else {
      text += "\n";
      char = 0;
      idx++;
      setTimeout(typer, 200);
    }
  } else {
    setTimeout(() => {
      const intro = document.getElementById("terminal-intro");
      intro.style.opacity = "0";        // fade-out
      setTimeout(() => intro.remove(), 500);
    }, 800);
  }
}

typer();