const params = new URLSearchParams(window.location.search);
const client = params.get("client");
const eventKey = params.get("event");

if (!client || !eventKey) {
  document.body.innerHTML = "Invalid invite";
  throw new Error("Invalid params");
}

const script = document.createElement("script");
script.src = `clients/${client}/client.js`;

script.onload = () => {
  const event = INVITE_DATA.events[eventKey];

  const video = document.getElementById("inviteVideo");
  const music = document.getElementById("inviteMusic");
  const mapLink = document.getElementById("mapLink");
  const countdown = document.getElementById("countdown");

  video.src = event.path + "video.mp4";
  music.src = event.path + "music.mp3";
  mapLink.href = event.mapLink;

  const eventTime = new Date(event.dateTimeISO).getTime();

  setInterval(() => {
    const diff = eventTime - Date.now();
    if (diff <= 0) {
      countdown.textContent = "The celebration has begun ✨";
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    countdown.textContent = `${d} days • ${h} hrs • ${m} mins`;
  }, 1000);
};

document.head.appendChild(script);
