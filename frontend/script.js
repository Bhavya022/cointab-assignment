document.addEventListener('DOMContentLoaded', () => {
  const allUsersBtn = document.getElementById('allUsersBtn');
  const usersList = document.getElementById('userContainer');

  // Function to handle adding user to database
  const addUserToDatabase = (user) => {  
    if (!user.id) {
      console.error('User ID not found in the user object');
      return;
  }

  const id = user.id; 
      const name = user.querySelector('.name').textContent.split(': ')[1];
      const email = user.querySelector('.email').textContent.split(': ')[1];
      const phone = user.querySelector('.phone').textContent.split(': ')[1];
      const website = user.querySelector('.website').textContent.split(': ')[1];
      const city = user.querySelector('.city').textContent.split(': ')[1];
      const company = user.querySelector('.company').textContent.split(': ')[1];

      const userData = { 
        id,
          name,
          email,
          phone,
          website,
          city,
          company
      };

      console.log(userData);

      // Check if the user already exists in the database
      fetch(`http://localhost:3000/users/email?email=${email}`)
          .then(response => {
              if (response.ok) {
                  return response.json();
              } else {
                  throw new Error('Failed to check user existence');
              }
          })
          .then(existingUserData => {
              if (existingUserData.length > 0) {
                  // User is already present, change "Add" to "Open"
                  const addButton = user.querySelector('.addBtn');
                  const openButton = user.querySelector('.openBtn');
                  addButton.style.display = 'none';
                  openButton.style.display = 'inline-block';
              } else {
                  // User does not exist, add user to the database
                  fetch('http://localhost:3000/users', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(userData)
                  })
                  .then(response => { 
                      if (response.ok) {
                          return response.json();
                      } else {
                          throw new Error('Failed to add user');
                      }
                  })
                  .then(data => { 
                      console.log('User added:', data); 

                      // Display "Open" button and hide "Add" button
                      const addButton = user.querySelector('.addBtn');
                      const openButton = user.querySelector('.openBtn');
                      addButton.style.display = 'none';
                      openButton.style.display = 'inline-block';

                      openButton.addEventListener('click', () => { 
                        console.log(data.id)
                          window.location.href = `http://localhost:3000/posts/${data.id}`;
                      });
                  })
                  .catch(error => console.error('Error adding user:', error));
              }
          })
          .catch(error => console.error('Error checking user existence:', error));
  };

  allUsersBtn.addEventListener('click', () => {
      fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(data => {
              usersList.innerHTML = '';
              data.forEach(user => {
                  const userDiv = document.createElement('div');
                  userDiv.classList.add('user');
                  userDiv.innerHTML = `
                  <p class="id"><strong>Id:</strong>${user.id}</p>
                      <p class="name"><strong>Name:</strong> ${user.name}</p>
                      <p class="email"><strong>Email:</strong> ${user.email}</p>
                      <p class="phone"><strong>Phone:</strong> ${user.phone}</p>
                      <p class="website"><strong>Website:</strong> ${user.website}</p>
                      <p class="city"><strong>City:</strong> ${user.address.city}</p>
                      <p class="company"><strong>Company:</strong> ${user.company.name}</p>
                      <div class="user-buttons">
                          <button class="addBtn">Add</button>
                          <button class="openBtn" style="display: none;">Open</button>
                      </div>
                  `;
                  // Add event listener to the "Add" button
                  const addButton = userDiv.querySelector('.addBtn');
                  addButton.addEventListener('click', () => addUserToDatabase(userDiv));
                  usersList.appendChild(userDiv);
              });
          })
          .catch(error => console.error('Error fetching users:', error));
  });
});
