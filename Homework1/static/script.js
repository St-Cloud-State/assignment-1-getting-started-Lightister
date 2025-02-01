// Array to store applicant and status data
const Apps = [];
var appnum = 0;

// Function to add a App to the list and send it to the server
function addApp() {
    const AppTitle = document.getElementById('App_name_zip').value;
    appnum = appnum +1;
    // Create a JSON object with App data
    const AppData = {
        title: AppTitle,
        stat: 'Recieved',
        app: appnum
    };

    // Send the App data to the server via POST request
    fetch('/api/add_Apps', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(AppData)
    })
        .then(response => response.json())
        .then(data => {
            // Display a success message or handle errors if needed
            console.log(data.message);

            // Add the new Apps data to the Apps array
            Apps.push(AppData);
            console.log(Apps)

            // Refresh the Apps list
            displayApps();
        })
        .catch(error => {
            console.error('Error adding Apps:', error);
        });
}

function check_stat() {
    const application_num = parseInt(document.getElementById('application_num').value, 10);
    const statusDiv = document.getElementById("applicationsStatus");

    statusDiv.innerHTML = "";
    
    for (let i = 0; i < Apps.length; i++) {
        if (application_num === Apps[i].app){ 
        stat_temp = Apps[i].stat;
        document.getElementById("applicationsStatus").innerHTML = `Status: ${stat_temp}`;
        return;
    }

   
    }
    document.getElementById("applicationsStatus").innerHTML = "Application not found";
}

function change(){
const application_num = parseInt(document.getElementById('Change_num').value, 10);
    
    for (let i = 0; i < Apps.length; i++) {
        if (application_num === Apps[i].app){ 
        Apps[i].stat = document.getElementById('selection').value;
        return;
    }

    }
}


// Function to display Apps in the list
function displayApps() {
    const AppList = document.getElementById('AppList');
    AppList.innerHTML = ''; // Clear existing App list

    Apps.forEach(Apps => { 
        const AppsElement = document.createElement('div');
        AppsElement.innerHTML = `
            <h2>Added Successfully the number is :${Apps.app}</h2>

        `;
        AppList.appendChild(AppsElement);
    });
}

// Function to fetch and display all Apps from the server
function showAllApps() {
    fetch('/api/Apps')
        .then(response => response.json())
        .then(data => {
            const AppList = document.getElementById('allApps');
            AppList.innerHTML = ''; // Clear existing App list
            console.log(data);
            AppList.textContent = JSON.stringify(data); // Display the list as a string
        })
        .catch(error => {
            console.error('Error fetching all Apps:', error);
        });
}