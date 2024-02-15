# cointab-assignment
Cointab SE-ASSIGNMENT
Overview
This project is a simple 2-page website developed using Node.js and a SQL database.

Features
Page 1: Home Page
Upon opening the website, users are greeted with a prominent heading stating "Cointab SE-ASSIGNMENT."
Users can click the "All Users" button to fetch data from the specified API (https://jsonplaceholder.typicode.com/users).
Essential user information, including name, email, phone, website, city, and company, is displayed.
Alongside the displayed user information, two buttons are provided: "Open" and "Add".
Clicking the "Add" button stores user information in the database. If the database already contains the user's entry, the "Open" button is shown instead.
Clicking the "Open" button opens a new Post page.
Page 2: Post Page
Data from the API (https://jsonplaceholder.typicode.com/posts?userId=${userId}) is fetched for the specific userId stored in the database.
Essential user information, including name, title, body, and company, is displayed.
Two buttons are provided at the top of the page: "Bulk Add" and "Download In Excel." Initially, only the "Bulk Add" button is visible.
Clicking the "Bulk Add" button stores all the posts present on that page into the database. If the database contains post entries for the specific userId, the "Bulk Add" button is hidden, and the "Download in Excel" button is shown.
Clicking the "Download in Excel" button initiates the download process.
Technologies Used
Sequelize
Node.js
SQL
HTML
CSS
JavaScript
Usage
Clone the repository.
Install dependencies using npm install.
Start the server using npm start.
Navigate to http://localhost:3000 in your web browser.
