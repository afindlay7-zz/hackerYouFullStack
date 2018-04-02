const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Photo = require('./models/photo');

const app = express();
app.use(bodyParser.json());
const PORT = 8080;

const uri = 'mongodb://localhost:27017/photoApp';
mongoose.connect(uri);



app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

app.get('/photos', (req, res) => {
  Photo
    .find({})
    .then(docs => {
      res.status(200).json({
        message: 'success get photos',
        payload: docs
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

app.get('/photos/:id', (req, res) => {
  const id = req.params.id;

  Photo 
    .find({ _id: id})
    .then(doc => {
      res.status(200).json({
        message: 'success get photo by id',
        payload: doc
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

app.post('/photos', (req, res) => {
  const { name, date, description, url } = req.body;

  const photo = new Photo({
    name,
    date,
    description,
    url
  });

  photo
    .save()
    .then(doc => {
      res.status(200).json({
        message: 'success post photo',
        payload: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

app.delete('/photos/:id', (req, res) => {
  const id = req.params.id;

  Photo 
    .findByIdAndRemove({ _id: id })
    .then(doc => {
      res.status(202).json({
        message: 'success remove photo by id',
        payload: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

