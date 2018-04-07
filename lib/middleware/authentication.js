const jwt = require('jsonwebtoken');
const config = require('../config.json');

module.exports = (req, res, next) => {
  console.log('authentication');
  const authHeader = req.get('authorization');

  if(!authHeader){
      res.status(401).json({
          message: 'unauthorized - no authHeader'
      });
  }

  const token = authHeader.split(" ")[1];
  console.log('1. token... ' + token)

  jwt.verify(token, config.secret, (err, decoded) => {
      if (decoded){
          console.log('2. decoded... ');
          console.log(decoded);
          req.token = decoded;
          next();
      } else {
          res.status(401).json({
              message: 'forbidden - token not decoded?'
          });
      }
  });

}