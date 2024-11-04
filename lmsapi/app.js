const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/db');
const cors = require("cors");
const bookRoutes = require('./routes/books');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/books',bookRoutes);
sequelize.sync().then(() => {
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  }).catch((error) => console.log('Error syncing database:', error));
