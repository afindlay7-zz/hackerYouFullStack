const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const fs = require('fs');
// const multer = require('multer');
// var upload = multer({ dest: 'uploads/' });

const Photo = require('./models/photo');
const User = require('./models/user');
const tokenService = require('./tokenService');
const authentication = require('./middleware/authentication');

const app = express();
app.use(bodyParser.json());
// app.use(multer({ dest: './uploads/',
//   rename: function (fieldname, filename) {
//     return filename;
//   },
//  }).single('photo'));
const PORT = 8080;

const uri = 'mongodb://localhost:27017/photoApp';
mongoose.connect(uri);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});



app.get('/photos', authentication, (req, res) => {
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


app.get('/photos/:id', authentication, (req, res) => {
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


app.get('/user/current', authentication, (req, res) => {
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
    })

})

//POST FILE
app.post('/photos', authentication, (req, res) => {
  console.log(req.body);
  let { name, date, description, url, file } = req.body;
  const photo = new Photo({
    name,
    date,
    description,
    url,
  });
  // photo.img.data = fs.readFileSync(file);
  // photo.img.contentType = 'image/png';

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


app.post('/signup', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = new User({
    firstName,
    lastName,
    email,
    password
  });

  user
    .save()
    .then(doc => {
      res.status(200).json({
        message: 'success create user',
        payload: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});


app.post('/login', (req, res) => {
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
                message: 'success match passwords',
                payload: token
              });
            } else {
              res.status(401).json({
                message: 'unauthorized - passwords dont match'
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
          message: 'unauthorized - account doesnt exist'
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


app.put('/photos/:id', authentication, (req, res) => {
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


app.delete('/photos/:id', authentication, (req, res) => {
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

