document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    const postContainer = document.getElementById('postContainer');
    const bulkAddBtn = document.getElementById('bulkAddBtn');
    const downloadExcelBtn = document.getElementById('downloadExcelBtn');

    // Fetch posts for the specific userId
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(posts => {
            if (posts.length > 0) {
                // Display posts
                posts.forEach(post => {
                    const postDiv = document.createElement('div');
                    postDiv.classList.add('post');
                    postDiv.innerHTML = `
                        <h3>Title: ${post.title}</h3>
                        <p>${post.body}</p>
                        <p><strong>User ID:</strong> ${post.userId}</p>
                        <p><strong>Company:</strong> ${post.company}</p>
                    `;
                    postContainer.appendChild(postDiv);
                });

                // Show Download in Excel button
                downloadExcelBtn.style.display = 'block';
            } else {
                // No posts found
                const noPostsMsg = document.createElement('p');
                noPostsMsg.textContent = 'No posts found for this user.';
                postContainer.appendChild(noPostsMsg);
            }
        })
        .catch(error => console.error('Error fetching posts:', error));

        bulkAddBtn.addEventListener('click', () => {
            // Implement bulk add functionality here
            fetch(`http://localhost:3000/posts/bulkAddPosts/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ /* add any required data here */ })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to bulk add posts');
                }
                // Update UI after successfully adding posts
                bulkAddBtn.style.display = 'none';
                // Show Download in Excel button
                downloadExcelBtn.style.display = 'block';
            })
            .catch(error => {
                console.error('Error bulk adding posts:', error);
                // Handle error scenario here (e.g., display error message to user)
            });
        });
    
        // Event listener for Download in Excel button
        downloadExcelBtn.addEventListener('click', () => {
            // Implement download in Excel functionality here
            window.location.href = `http://localhost:3000/posts/downloadPostsInExcel/${userId}`;
        });
});
