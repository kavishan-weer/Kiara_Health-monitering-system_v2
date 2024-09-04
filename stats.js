const firebaseConfig = {
    apiKey: "AIzaSyDgX4gm8d1fJ_YeLDNGgMpA7at2YoLr-i8",
    authDomain: "kiara-a8a3f.firebaseapp.com",
    databaseURL: "https://kiara-a8a3f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kiara-a8a3f",
    storageBucket: "kiara-a8a3f.appspot.com",
    messagingSenderId: "179860561475",
    appId: "1:179860561475:web:b3d46333894bc7b0e0fef6"
  };

  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the database service
  const database = firebase.database();
// Initialize Chart.js for Sensor 1
var ctx1 = document.getElementById('realTimeChart1').getContext('2d');
var chart1 = new Chart(ctx1, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Heart Rate(bpm)',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          onRefresh: function(chart) {
            // No need to update x-axis labels here
          },
          delay: 1000,
          refresh: 1000,
          duration: 180000,
          ttl: 180000,
          pause: false,
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    }
  }
});

// Function to add data to Sensor 1 chart
function addData1(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  const maxDataPoints = 180;
  if (chart.data.labels.length > maxDataPoints) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });
  }
  chart.update();
}

// Function to fetch and display sensor 1 readings
function displaySensor1Readings() {
  const sensor1Ref = database.ref('numbers/number1');
  sensor1Ref.on('value', (snapshot) => {
    const value = snapshot.val();
    const currentTime = new Date().toLocaleTimeString();
    document.getElementById('sensor1Value').innerText = value;
    addData1(chart1, currentTime, value);
  });
}
displaySensor1Readings();

// Initialize Chart.js for Sensor 2
var ctx2 = document.getElementById('realTimeChart2').getContext('2d');
var chart2 = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'SPO2(%)',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          onRefresh: function(chart) {
            // No need to update x-axis labels here
          },
          delay: 1000,
          refresh: 1000,
          duration: 180000,
          ttl: 180000,
          pause: false,
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    }
  }
});

// Function to add data to Sensor 2 chart
function addData2(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  const maxDataPoints = 180;
  if (chart.data.labels.length > maxDataPoints) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });
  }
  chart.update();
}

// Function to fetch and display sensor 2 readings
function displaySensor2Readings() {
  const sensor2Ref = database.ref('numbers/number2');
  sensor2Ref.on('value', (snapshot) => {
    const value = snapshot.val();
    const currentTime = new Date().toLocaleTimeString();
    document.getElementById('sensor2Value').innerText = value;
    addData2(chart2, currentTime, value);
  });
}
displaySensor2Readings();


// Initialize Chart.js for Sensor 3
var ctx3 = document.getElementById('realTimeChart3').getContext('2d');
var chart3 = new Chart(ctx3, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Temperature(°C)',
      data: [],
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          onRefresh: function(chart) {
            // No need to update x-axis labels here
          },
          delay: 1000,
          refresh: 1000,
          duration: 180000,
          ttl: 180000,
          pause: false,
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    }
  }
});

// Function to add data to Sensor 3 chart
function addData3(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  const maxDataPoints = 180;
  if (chart.data.labels.length > maxDataPoints) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });
  }
  chart.update();
}

// Function to fetch and display sensor 3 readings
function displaySensor3Readings() {
  const sensor3Ref = database.ref('numbers/number3');
  sensor3Ref.on('value', (snapshot) => {
    const value = snapshot.val();
    const currentTime = new Date().toLocaleTimeString();
    document.getElementById('sensor3Value').innerText = value;
    addData3(chart3, currentTime, value);
  });
}
displaySensor3Readings();

