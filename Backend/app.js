const express = require('express');
const cors = require('cors'); // Import the cors module
const app = express();
const sequelize = require('./config/db.config');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const excelRoutes = require('./routes/excelRoutes');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/excel', excelRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

module.exports = app;
