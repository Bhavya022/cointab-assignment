# cointab-assignment
Cointab SE Assignment
Overview
Cointab SE Assignment is a web application designed to demonstrate fetching user data from an external API, displaying it on the home page, and providing functionalities to interact with the data.

The application consists of two main pages:

Home Page: Displays essential user information fetched from an external API. Allows users to add users to the database and navigate to a post page.
Post Page: Displays posts associated with a specific user fetched from an external API. Provides functionalities to add posts to the database in bulk and download posts in Excel format.
Features
Fetches user data from an external API and displays it on the home page.
Allows users to add users to the database from the home page.
Fetches and displays posts associated with a specific user on the post page.
Provides the ability to add posts to the database in bulk from the post page.
Allows users to download posts in Excel format from the post page.
Technologies Used
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js, Sequelize (ORM)
Database: MySQL
External API: JSONPlaceholder (for user and post data)
Installation
Clone the repository:
bash
Copy code
git clone <repository_url>
Navigate to the project directory:
bash
Copy code
cd cointab-se-assignment
Install dependencies:
Copy code
npm install
Start the backend server:
sql
Copy code
npm start
Open the frontend:
Open index.html for the home page.
Open post.html for the post page.
Usage
Home Page:

Click on the "All Users" button to fetch user data from the external API.
Click on the "Add" button to add a user to the database.
Click on the "Open" button to navigate to the post page for a specific user.
Post Page:

View posts associated with the selected user.
Click on the "Bulk Add" button to add posts to the database in bulk.
Click on the "Download in Excel" button to download posts in Excel format.
Credits
This project utilizes the JSONPlaceholder API for fetching user and post data.
Deployed Link
https://helpful-marigold-059125.netlify.app/