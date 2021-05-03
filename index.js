const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  morgan = require('morgan');

const app = express();

app.use(bodyParser.json());

// Return Documentation.html
app.use(express.static('public'));

// Returns a list of all movies to the users
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Returns data about a single movie by title
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
    { return movies.title === req.params.name }));
});

// Returns data about a genre (description) by name/title (e.g., "Thriller")
app.get('/movies/genre/:name', (req, res) => {
  res.send('Returns a GET request about a genre (description) by name/title');
});

//Returns data about a director (bio, birth year, death year) by name
app.get('/movies/director/:name', (req, res) => {
  res.send('Returns a GET request about a director (bio, birth year, death year) by name');
});

// Allows new users to register
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Allows users to update their user info (username)
app.put('/users/:username', (req, res) => {
  res.send('Returns a PUT request showing that the user has been updated')
});

// Allows users to add a movie to their list of favorites (showing only a text that a movie has been added)
app.post('/users/:username/favorites/:movieID', (req, res) => {
  res.send('Returns a POST request showing that the movies has been added to the users favorites')
});

// Allows users to remove a movie from their list of favorites (showing only a text that a movie has been removed)
app.delete('/users/:username/favorites/:movieID', (req, res) => {
  res.send('Returns a DELETE request showing that the movies has been revmoed from the users favorites')
});

// Allow existing users to deregister (showing only a text that a user email has been removed)
app.delete('/users/:username', (req, res) => {
  res.send('Returns a DELETE request showing that the user has been removed')
});

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to myFlix App');
});

// Logs to terminal
app.use(morgan('common'));

//Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


//Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
