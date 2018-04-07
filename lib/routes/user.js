const express = require('express');
const Router = express.Router;
const router = Router();
const authentication = require('../middleware/authentication');
const User = require('../models/user');

router.get('/current', authentication, (req, res) => {
  const { id } = req.token.user; 
  console.log('3. req.token... ');
  console.log(req.token);

  User
    .findById(id)
    .then(doc => {
      if (doc) {
        res.status(200).json({
          messsge: 'success - found authorized used?',
          payload: doc
        });
      } else {
        res.status(401).json({
          message: 'forbidden - authorized user not found?'
        });
      }
    });
});

module.exports = router;