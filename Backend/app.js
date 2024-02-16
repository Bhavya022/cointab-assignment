const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const sequelize = require('./utils/database');
const cors = require('cors')
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors())
// Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// Database synchronization
sequelize.sync().then(() => {
  console.log('Database synced successfully.');
}).catch(error => {
  console.error('Error syncing database:', error);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
