const express = require('express');
const Router = express.Router;
const router = Router();
const authentication = require('../middleware/authentication');
const tokenService = require('../tokenService');
const User = require('../models/user');

router.post('/signup', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  User
    .findOne({ email })
    .then(user => {
      if (user){
        res.status(409).json({
          message: 'error - user already exists',
        });
      } else {
        const user = new User({
          firstName,
          lastName,
          email,
          password
        });
        user
          .save()
          .then(user => {
            res.status(200).json({
              message: 'success - create user',
              payload: user
            });
          })
          .catch(err => {
            res.status(500).json({
              message: err.message
            });
          });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    })


});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  User
    .findOne({ email })
    .then(user => {
      if (user){
        user.comparePassword(password)
          .then(match => {
            if (match){
              const token = tokenService.create(user);
              res.status(200).json({
                message: 'success - match passwords',
                payload: token
              });
            } else {
              res.status(401).json({
                message: 'unauthorized - passwords do not match'
              });
            }
          })
          .catch(err => {
            // bcrypt call failed
            res.catch(500).json({
              message: err.message
            });
          });
      } else {
        res.status(401).json({
          message: 'unauthorized - account does not exist'
        });
      }
    })
    .catch(err => {
      // mongo call failed
      res.status(500).json({
        message: err.message
      });
    });
});

module.exports = router;