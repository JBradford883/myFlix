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
  Movies.find().then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Returns data about a single movie by title
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title }).then((movie) => {
    res.status(201).json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Returns data about a genre (description) by name/title (e.g., "Thriller")
app.get('/movies/genre/:Name', (req, res) => {
  Movies.findOne({'Genre.Name': req.params.Name}).then((movie) => {
    res.status(201).json(movie.Genre);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//Returns data about a director (bio, birth year, death year) by name
app.get('/movies/director/:Name', (req, res) => {
  Movies.findOne({'Director.Name': req.params.Name}).then((movie) => {
    res.status(201).json(movie.Director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

// Allows new users to register
/* JSON expected in this format
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
        return res.status(400).send(req.body.Username + ' already exists');
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

// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
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
