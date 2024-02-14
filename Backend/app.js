const express = require('express');
const app = express();
const sequelize = require('./config/db.config');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const excelRoutes = require('./routes/excelRoutes');

const PORT = process.env.PORT || 3000; // Default port is 3000, but can be overridden with environment variable

app.use(express.json());

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
