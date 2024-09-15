
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// Additional JavaScript for your health monitoring system can go here


// Initialize Firebase
const firebaseConfig = {
    //Firebase credentials
  };

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

// Function to fetch and display sensor readings
function displaySensorReadings() {
    const sensor1Ref = database.ref('numbers/number1');
    sensor1Ref.on('value', (snapshot) => {
        document.getElementById('sensor1Value').innerText = snapshot.val() + ' bpm';
    });

    const sensor2Ref = database.ref('numbers/number2');
    sensor2Ref.on('value', (snapshot) => {
        document.getElementById('sensor2Value').innerText = snapshot.val() + '%';
    });

    const sensor3Ref = database.ref('numbers/number3');
    sensor3Ref.on('value', (snapshot) => {
        document.getElementById('sensor3Value').innerText = snapshot.val() + '°C';
    });
}

// Call the function to initially display sensor readings
displaySensorReadings();


// script.js
document.addEventListener("DOMContentLoaded", function () {
    // Create the first gauge
    var gauge1 = new JustGage({
      id: "gauge-container1", // Element ID where the gauge will be rendered
      value: 0, // Initial value
      min: 0, // Minimum value
      max: 100, // Maximum value
      title: "SENSOR 1", // Title of the gauge
      label: "Body Temp(°C)", // Label for the gauge
      gaugeWidthScale: 0.8, // Width of the gauge
      counter: true, // Show the current value
      formatNumber: true, // Format the number
      labelFontSize: 20, // Font size of the label
      labelFontColor: "#333", // Text color of the label
    });
  
    // Function to update gauge1 with a new value
    function updateGauge1(newValue) {
      gauge1.refresh(newValue); // Refresh the gauge with the new value
    }
  
    // Firebase reference to the sensor value (adjust to your Firebase database path)
    const sensor1Ref = firebase.database().ref("numbers/number3");
  
    // Listen for changes to the sensor value and update the gauge
    sensor1Ref.on("value", (snapshot) => {
      const newValue = snapshot.val(); // Get the value from Firebase
  
      // Convert the string value to a number
      const numericValue = parseFloat(newValue);
  
      if (!isNaN(numericValue)) { // Make sure the value is valid
        updateGauge1(numericValue); // Update the gauge with the new value
      } else {
        console.warn("Received invalid sensor value:", newValue); // Log if there's an error
      }
    });
  });
  

// Request permission to send browser notifications
function requestNotificationPermission() {
    if ("Notification" in window) {
        if (Notification.permission === "granted") {
            // Permission has already been granted
            return;
        }

        if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    console.log("Notification permission granted.");
                } else {
                    console.log("Notification permission denied.");
                }
            });
        }
    }
}

function requestNotificationPermission() {
    if ("Notification" in window) {
        if (Notification.permission === "granted") {
            // Permission has already been granted
            return;
        }

        if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    console.log("Notification permission granted.");
                } else {
                    console.log("Notification permission denied.");
                }
            });
        }
    }
}

// Function to send a notification and flash the text if there's an emergency
function sendEmergencyNotification() {
    if (Notification.permission === "granted") {
        const notification = new Notification("Emergency Alert!", {
            body: "An emergency status has been detected.",
            icon: "./Assets/kiara-favicon-color.png", // Adjust this path for your local icon
        });

        notification.onclick = () => {
            // Optional: action when notification is clicked
            window.focus();
        };
    }

    // Add the flashing class to the status message
    const statusMessage = document.getElementById("status-message");
    statusMessage.classList.add("flashing");
}

const db = firebase.database();
const statusRef = db.ref('status/value'); // Firebase reference to your status data

statusRef.on("value", (snapshot) => {
    const statusMessage = document.getElementById("status-message");
    const value = snapshot.val();

    if (value === 0) {
        statusMessage.textContent = "Normal";
        statusMessage.className = "normal";  // Reset the class
    } else if (value === 1) {
        statusMessage.textContent = "Emergency";
        statusMessage.className = "emergency";  // Add the emergency class
        sendEmergencyNotification();  // Send a browser notification and flash text
    } else {
        statusMessage.textContent = "Unknown Status";
        statusMessage.className = "";  // Clear the class if unknown
    }
});

// Request permission to send notifications on page load
requestNotificationPermission();


