const params = new URLSearchParams(window.location.search);
const client = params.get("client");

if (!client) {
  document.body.innerHTML = "Client not specified";
  throw new Error("Client missing");
}

const script = document.createElement("script");
script.src = `clients/${client}/client.js`;

script.onload = () => {
  const events = Object.entries(INVITE_DATA.events)
    .filter(([_, e]) => e.enabled);

  // Single event → direct open
  if (events.length === 1) {
    window.location.href = `invite.html?client=${client}&event=${events[0][0]}`;
    return;
  }

  // Multiple events → show selector
  const grid = document.getElementById("eventGrid");

  events.forEach(([key, event]) => {
    const card = document.createElement("div");
    card.style.margin = "20px";
    card.style.cursor = "pointer";

    card.innerHTML = `
      <img src="${event.path}preview.jpg" style="width:280px; border-radius:18px;">
      <div style="text-align:center; margin-top:10px; font-size:18px;">
        ${event.label}
      </div>
    `;

    card.onclick = () => {
      window.location.href = `invite.html?client=${client}&event=${key}`;
    };

    grid.appendChild(card);
  });
};

document.head.appendChild(script);
