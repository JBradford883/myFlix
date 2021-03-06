const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  morgan = require('morgan');

const app = express();

/**
 * define allowedOrigins to be allowed by CORS
 */
const cors = require('cors');
let allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:1234',
  'https://myflix-app-react.netlify.app',
  'http://localhost:4200',
  'https://jbradford883.github.io'
];

/**
 * CORS handling
 */
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

const { check, validationResult } = require('express-validator');

// Integrated Mongoose with REST API
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

// Allows developers to view on local host
require('dotenv').config();

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use(bodyParser.json());

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

/**
 * Returns Documentation.html about API Endpoints
 */
app.use(express.static('public'));

/**
 * Get all movies
 * @method GET
 * @param {string} endpoint
 * @returns {object} contains all movies and movie data
 * @requires authenticate JWT
 */
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find().then((movies) => {
    res.status(201).json(movies);
  })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * Returns data about a single movie by title.
 * Protected route.
 * Expects :Title to be passed in the URL path.
 * @method GET
 * @param {string} (title) endpoint
 * @returns {object} data about a single movie
 * @requires authenticate JWT
 */
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title }).then((movie) => {
    res.status(201).json(movie);
  })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * Returns data about a genre (description) by name/title (e.g., "Thriller").
 * Protected route.
 * Expects :Name to be passed in the URL path.
 * @method GET
 * @param {string} (name) endpoint
 * @returns {object} data about the genre
 * @requires authenticate JWT
 */
app.get('/movies/genre/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.Name }).then((movie) => {
    res.status(201).json(movie.Genre);
  })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * Returns data about a director (bio, birth year, death year) by name.
 * Protected route.
 * Expects :Name to be passed in the URL path.
 * @method GET
 * @param {string} (name) endpoint
 * @returns {object} data about the director
 * @requires authenticate JWT
 */
app.get('/movies/director/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name }).then((movie) => {
    res.status(201).json(movie.Director);
  })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err)
    });
});

/**
 * Allows new users to register.
 * JSON expected in this format:
 * {
 *  ID: Integer,
 *  Username: String,
 *  Password: String,
 *  Email: String,
 *  Birthday: Date
 * }
 * Checks to make sure Username is added, correct character length, and that it does not contain alphanumeric characters.
 * Checks to make sure a password is added.
 * Checks to make sure the email entered is valid.
 * @method POST
 * @param {object} object containing the users profile details
 * @returns {object} json-object added user
 * @requires properties username, password, email
 * @requires auth no authentication - public
 */
app.post('/users',
  [
    check('Username', 'Username is required').not().isEmpty(),
    check('Username', 'Username must be at least 6 characters').isLength({ min: 6 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) => { res.status(201).json(user) })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

/**
 * Get a user by username
 * Protected route
 * Expects :Username to be passed in the URL path.
 * @method GET
 * @param {string} (Username) endpoint
 * @returns {object} containing the user
 * @requires authenticate JWT
 */
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * Allows new users to register.
 * JSON expected in this format:
 * {
 *  ID: Integer,
 *  Username: String,
 *  Password: String,
 *  Email: String,
 *  Birthday: Date
 * }
 * Checks to make sure Username is added, correct character length, and that it does not contain alphanumeric characters.
 * Checks to make sure a password is added.
 * Checks to make sure the email entered is valid.
 * @method PUT
 * @param {object} object containing the users profile details
 * @returns {object} json-object added user
 * @requires properties username, password, email
 * @requires authenticate JWT
 */
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  // check validation object for errors
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  };

  // Hash the submitted password
  let hashedPassword = Users.hashPassword(req.body.Password);
  let updateObject = {}
  if (req.body.Username) {
    updateObject.Username = req.body.Username
  }
  if (req.body.Password) {
    updateObject.Password = req.body.Password
  }
  if (req.body.Email) {
    updateObject.Email = req.body.Email
  }
  if (req.body.Birthday) {
    updateObject.Birthday = req.body.Birthday
  }

  Users.findOneAndUpdate({ Username: req.params.Username }, { $set: updateObject },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

/**
 * Allows users to add a movie to their list of favorites/.
 * Protected route.
 * Expects :Username and :MovieID to be passed in the URL path.
 * @method POST
 * @param {string} (Username, movieID) endpoint
 * @returns {statusMessage} success/error
 * @requires authenticate JWT
 */
app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

/**
 * Allows users to remove a movie to their list of favorites/.
 * Protected route.
 * Expects :Username and :MovieID to be passed in the URL path.
 * @method DELETE
 * @param {string} (Username, movieID) endpoint
 * @returns {statusMessage} success/error
 * @requires authenticate JWT
 */
app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $pull: { FavoriteMovies: req.params.MovieID }
  },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      };
    });
});

/**
 * Allows existing users to deregister.
 * Protected route.
 * Expects :Username to be passed in the URL path.
 * @method DELETE
 * @param {string} (username) endpoint
 * @returns {statusMessage} success/error
 * @requires authenticate JWT
 */
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' account was removed.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to myFlix App');
});

// HTML request
app.use(morgan('common'));

//Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


//Listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});