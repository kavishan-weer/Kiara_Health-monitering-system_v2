// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDgX4gm8d1fJ_YeLDNGgMpA7at2YoLr-i8",
    authDomain: "kiara-a8a3f.firebaseapp.com",
    databaseURL: "https://kiara-a8a3f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kiara-a8a3f",
    storageBucket: "kiara-a8a3f.appspot.com",
    messagingSenderId: "179860561475",
    appId: "1:179860561475:web:b3d46333894bc7b0e0fef6"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference the Firebase Realtime Database
const database = firebase.database();

// Request permission to send browser notifications
const requestNotificationPermission = () => {
    if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
            } else if (permission === "denied") {
                console.log("Notification permission denied.");
            }
        }).catch((error) => {
            console.error("Error requesting notification permission:", error);
        });
    }
};

// Call this function when the page loads
requestNotificationPermission();

// Function to send a browser notification
const sendNotification = (title, message) => {
    if (Notification.permission === "granted") {
        new Notification(title, {
            body: message,
            icon: './Assets/alert.png', // Use your custom icon
        });
    }
};

const updateSensorStatus = (sensorId, sensorName, binaryValue) => {
    const sensorElement = document.getElementById(sensorId).querySelector('.sensor-status');
    const emergencyBox = document.getElementById('emergency-box');
    const timestamp = new Date().toLocaleString(); // Get the current timestamp

    if (sensorElement) {
        let statusText;
        let statusClass;
        let emergencyStatus = 'No Emergency Detected';
        let emergencyClass = 'normal';

        // Set the sensor status based on binary value
        if (sensorName === 'SPO2 Level' && binaryValue === 1) {
            statusText = 'Low';
            statusClass = 'sensor-status low';
            emergencyStatus = 'Emergency Detected!';
            emergencyClass = 'emergency';
            sendNotification(`Alert: ${sensorName} is Low`, `SPO2 has dropped to a low level.`);
            // Update the last high timestamp for SPO2
            document.getElementById('last-spo2-high').textContent = `SPO2 Level: ${timestamp}`;
        } else if (binaryValue === 1) {
            statusText = 'High';
            statusClass = 'sensor-status high';
            emergencyStatus = 'Emergency Detected!';
            emergencyClass = 'emergency';
            sendNotification(`Alert: ${sensorName} is High`, `${sensorName} has detected high levels.`);
            
            if (sensorName === 'Heart Rate') {
                document.getElementById('last-heart-rate-high').textContent = `Heart Rate: ${timestamp}`;
            } else if (sensorName === 'Body Temp') {
                document.getElementById('last-body-temp-high').textContent = `Body Temp: ${timestamp}`;
            }
        } else if (binaryValue === 0) {
            statusText = 'Normal';
            statusClass = 'sensor-status normal';
            emergencyStatus = 'No Emergency Detected';
            emergencyClass = 'normal';
        } else {
            statusText = 'Unknown';
            statusClass = 'sensor-status unknown';
            emergencyStatus = 'No Emergency Detected';
            emergencyClass = 'normal';
        }

        sensorElement.textContent = statusText;
        sensorElement.className = statusClass;

        emergencyBox.textContent = emergencyStatus;
        emergencyBox.className = emergencyClass;
    } else {
        console.error("Sensor element not found:", sensorId);
    }
};

// Set up listeners for each sensor's status
database.ref('sensors/sensor1').on('value', (snapshot) => {
    const binaryValue = snapshot.val();
    updateSensorStatus('sensor-1', 'Heart Rate', binaryValue);
});

database.ref('sensors/sensor2').on('value', (snapshot) => {
    const binaryValue = snapshot.val();
    updateSensorStatus('sensor-2', 'SPO2 Level', binaryValue);
});

database.ref('sensors/sensor3').on('value', (snapshot) => {
    const binaryValue = snapshot.val();
    updateSensorStatus('sensor-3', 'Body Temp', binaryValue);
});
