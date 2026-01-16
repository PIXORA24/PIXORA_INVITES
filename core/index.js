const events = INVITE_DATA.events;

// enabled events
const enabled = Object.entries(events).filter(
  ([_, e]) => e.enabled
);

// only one event → go directly
if (enabled.length === 1) {
  const [key] = enabled[0];
  window.location.href = `invite.html?event=${key}`;
}

// multiple events → show selector
const grid = document.getElementById("eventGrid");

enabled.forEach(([key, event]) => {
  const card = document.createElement("div");
  card.className = "event-card";

  card.innerHTML = `
    <img src="${event.path}preview.jpg">
  `;

  card.onclick = () => {
    window.location.href = `invite.html?event=${key}`;
  };

  grid.appendChild(card);
});
