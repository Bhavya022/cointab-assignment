document.addEventListener('DOMContentLoaded', () => {
    const allUsersBtn = document.getElementById('allUsersBtn');
    const usersList = document.getElementById('usersList');

    // Function to handle adding user to database
    const addUserToDatabase = (user) => {
        const userData = {
            name: user.querySelector('.name').textContent,
            email: user.querySelector('.email').textContent,
            phone: user.querySelector('.phone').textContent,
            website: user.querySelector('.website').textContent,
            city: user.querySelector('.city').textContent,
            company: user.querySelector('.company').textContent
        };

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
            // Display "Open" button and hide "Add" button
            const addButton = user.querySelector('.addBtn');
            const openButton = user.querySelector('.openBtn');
            addButton.style.display = 'none';
            openButton.style.display = 'inline-block';
            console.log('User added:', data); 

            // Check if the user is already present in the database
            fetch(`http://localhost:3000/users?email=${userData.email}`)
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
                        addButton.style.display = 'none';
                        openButton.style.display = 'inline-block';
                    }
                })
                .catch(error => console.error('Error checking user existence:', error));
            
            openButton.addEventListener('click', () => {
                window.location.href = `http://localhost:3000/posts/${data.id}`;
            });
        })
        .catch(error => console.error('Error adding user:', error));
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
