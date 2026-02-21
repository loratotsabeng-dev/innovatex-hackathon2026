// Get elements
const button = document.getElementById("alertButton");
const statusText = document.getElementById("status");
const nameInput = document.getElementById("nameInput");

let holdTimer;
let countdownInterval;
let countdown = 3; // 3-second hold

// Add pulsing animation when idle
button.classList.add("pulse");

// Start hold events
button.addEventListener("mousedown", startHold);
button.addEventListener("touchstart", startHold);

// Cancel hold events
button.addEventListener("mouseup", cancelHold);
button.addEventListener("mouseleave", cancelHold);
button.addEventListener("touchend", cancelHold);

/**
 * Function to start hold countdown
 */
function startHold() {
    // Remove pulse animation while holding
    button.classList.remove("pulse");

    countdown = 3; // reset countdown
    statusText.textContent = `Hold for ${countdown} seconds...`;

    // Countdown display inside button
    button.textContent = countdown;

    // Interval to update button text every second
    countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            button.textContent = countdown;
            statusText.textContent = `Hold for ${countdown} seconds...`;
        }
    }, 1000);

    // Trigger sendAlert after 3 seconds
    holdTimer = setTimeout(() => {
        clearInterval(countdownInterval);
        sendAlert();
    }, 3000);
}

/**
 * Function to cancel hold
 */
function cancelHold() {
    clearTimeout(holdTimer);
    clearInterval(countdownInterval);
    button.textContent = "HOLD FOR HELP";
    statusText.textContent = "Ready";

    // Add pulsing animation back
    button.classList.add("pulse");
}

/**
 * Function to send the alert
 */
function sendAlert() {
    const name = nameInput.value || "Unknown";

    statusText.textContent = "Getting your location...";

    if (!navigator.geolocation) {
        statusText.textContent = "Geolocation not supported.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            statusText.textContent = "Sending alert...";

            // Send alert to backend
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
            .then((response) => response.json())
            .then((data) => {
                statusText.textContent = "Alert sent successfully!";
                button.textContent = "HOLD FOR HELP";
                button.classList.add("pulse"); // re-enable pulse
            })
            .catch((error) => {
                statusText.textContent = "Error sending alert.";
                button.textContent = "HOLD FOR HELP";
                button.classList.add("pulse");
            });
        },
        () => {
            statusText.textContent = "Unable to retrieve location.";
            button.textContent = "HOLD FOR HELP";
            button.classList.add("pulse");
        }
    );
}
