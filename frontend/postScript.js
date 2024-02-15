document.addEventListener('DOMContentLoaded', () => {
    const BulkAdd = document.getElementById("BulkAdd");
    const Download = document.getElementById("Download");
    const tbody = document.getElementById("tbody");
    const userName = document.getElementById("name");
    const company = document.getElementById("company");

    let data = [];
    let userId; // Declare userId variable

    // Call fetchData function to fetch data as soon as the DOM is loaded
    fetchData();

    async function fetchData() {
        try {
            // Fetch user and post data
            let response = await fetch('http://localhost:3000/userData');
            let jsonData = await response.json();

            // Extract userId from jsonData or assign it if already defined
            userId = jsonData.userId || userId;

            // Update user information
            userName.innerText = jsonData.user.name;
            company.innerText = jsonData.user.company.name;

            // Show/hide buttons based on post data presence
            if (jsonData.posts.length > 0) {
                Download.style.display = "block";
                BulkAdd.style.display = "none";
            } else {
                BulkAdd.style.display = "block";
            }

            // Display post data
            displayData(jsonData.posts);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    function displayData(posts) {
        tbody.innerHTML = "";

        posts.forEach(post => {
            let tr = document.createElement("tr");
            let title = document.createElement("td");
            let body = document.createElement("td");

            title.innerText = post.title;
            body.innerText = post.body;

            tr.append(title, body);
            tbody.append(tr);
        });
    }

    BulkAdd.addEventListener("click", async () => {
        try {
            // Attempt to add posts in bulk
            let response = await fetch("http://localhost:3000/posts/addBulk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                let responseData = await response.json();
                console.log(responseData.message);
                alert(responseData.message);
                fetchData(); // Re-fetch data after successful addition
            } else {
                console.error('Failed to add posts:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding posts:', error);
        }
    });

    Download.addEventListener("click", function () {
        // Initiate download of Excel file
        window.location.href = `http://localhost:3000/posts/downloadExcel/${userId}`;
    });
});
