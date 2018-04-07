const express = require('express');
const Router = express.Router;
const router = Router();
const authentication = require('../middleware/authentication');
const Photo = require('../models/photo');

router.get('/photos', authentication, (req, res) => {
  console.log('getphotoe');
  Photo
    .find({})
    .then(docs => {
      res.status(200).json({
        message: 'success get all photos',
        payload: docs
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

router.get('/photos/:id', authentication, (req, res) => {
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

//POST FILE
router.post('/photos', authentication, (req, res) => {
  console.log(req.body);
  let { name, date, description, url, file } = req.body;
  const photo = new Photo({
    name,
    date,
    description,
    url,
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

router.put('/photos/:id', authentication, (req, res) => {
  const id = req.params.id;
  const { name, date, description, url } = req.body;
  
  Photo
    .findByIdAndUpdate(id, {
      name,
      date,
      description,
      url
    })
    .then(doc => {
      res.status(200).json({
        message: 'success update photo by id',
        payload: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    });
});

router.delete('/photos/:id', authentication, (req, res) => {
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

module.exports = router;