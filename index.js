require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

mongoose
  .connect(process.env.MONGO_CONN_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((result) => {
    console.log(`Mongoose connected on port ${PORT}`);
  })
  .catch((err) => {
    console.log('Connection error');
  });
mongoose.set('useFindAndModify', false);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRoutes = require('./api/apiRoutes');

app.use('/', apiRoutes);

const rootBuild = path.join(__dirname, 'client', 'build');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(rootBuild));

  app.get('*', (req, res) => {
    res.sendFile(path.join(rootBuild, 'index.html'));
  });
}

app.listen(process.env.PORT || PORT, console.log(`Back end online on port ${PORT}`));
