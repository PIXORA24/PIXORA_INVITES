const params = new URLSearchParams(window.location.search);
const eventKey = params.get("event");

const event = INVITE_DATA.events[eventKey];
if (!event) {
  document.body.innerHTML = "Invalid event";
  throw new Error("Invalid event");
}

const video = document.getElementById("inviteVideo");
const music = document.getElementById("inviteMusic");
const overlay = document.getElementById("tapOverlay");
const countdownEl = document.getElementById("countdown");
const mapLink = document.getElementById("mapLink");
const calendarLink = document.getElementById("calendarLink");

// media
video.src = event.path + "video.mp4";
video.poster = event.path + "bg.jpg";
music.src = event.path + "music.mp3";
mapLink.href = event.mapLink;

// autoplay handling
async function start() {
  try {
    await video.play();
    await music.play();
    overlay.remove();
    document.documentElement.classList.add("ui-visible");
  } catch {
    overlay.style.display = "flex";
  }
}

overlay.addEventListener("click", start);
start();

// countdown
const target = new Date(event.dateTimeISO).getTime();
setInterval(() => {
  const diff = target - Date.now();
  if (diff <= 0) {
    countdownEl.textContent = "The celebration has begun ✨";
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  countdownEl.textContent = `${d}d ${h}h ${m}m`;
}, 1000);

// calendar
const startISO = event.dateTimeISO.replace(/[-:]/g, "").split(".")[0];
calendarLink.href =
  `https://www.google.com/calendar/render?action=TEMPLATE` +
  `&text=${encodeURIComponent(event.label)}` +
  `&dates=${startISO}/${startISO}` +
  `&location=${encodeURIComponent(event.venue)}`;
