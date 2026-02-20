const button = document.getElementById("alertButton");
const status = document.getElementById("status");
const nameInput = document.getElementById("nameInput");

let holdTimer;

button.addEventListener("mousedown", function() {
  status.textContent = "Hold for 3 seconds...";
  
  holdTimer = setTimeout(function() {
    sendAlert();
  }, 3000);
});

button.addEventListener("mouseup", function() {
  clearTimeout(holdTimer);
  status.textContent = "Ready";
});

function sendAlert() {
  const name = nameInput.value || "Unknown";
  status.textContent = "Getting your location...";

  navigator.geolocation.getCurrentPosition(function(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = "Sending alert...";

    fetch("http://localhost:3000/alert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        latitude: latitude,
        longitude: longitude
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      status.textContent = "Alert sent successfully!";
    })
    .catch(function(error) {
      status.textContent = "Error sending alert.";
    });
  });
}