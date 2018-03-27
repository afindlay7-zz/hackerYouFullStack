const express = require('express');
const mongoose = require('mongoose');

const Photo = require('./models/photo');

const app = express();
const PORT = 8080;

const uri = 'mongodb://localhost:27017/photoApp';
mongoose.connect(uri);



app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

app.get('/photos', (req, res) => {
  Photo
    .find({})
    .then(doc => {
      res.status(200).json({
        message: 'success',
        payload: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });

});

app.post('/photos/:name', (req, res) => {
  const photo = new Photo({
    name: req.params.photo
  });

  photo
    .save()
    .then(doc => {
      res.status(200).json({
        message: 'success',
        payload: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });

});

