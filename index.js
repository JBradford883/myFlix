const express = require('express');
  morgan = require('morgan');

const app = express();

//List of Top 10 Movies
let topTenMovies = [
  {
    title: 'The Shawshank Redemption',
    director:'Frank Darabont'
  },
  {
    title: 'The Godfather',
    director: 'Francis Ford Coppola'
  },
  {
    title: 'The Godfather Part:II',
    director: 'Francis Ford Coppola'
  },
  {
    title: 'The Dark Knight',
    director: 'Christopher Nolan'
  },
  {
    title: '12 Angry Men',
    director: 'Sidney Lumet'
  },
  {
    title: 'Schindler\'s List',
    director: 'Steven Spielberg'
  },
  {
    title: 'The Lord of the Rings: The Return of the King',
    director: 'Peter Jackson'
  },
  {
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino'
  },
  {
    title: 'The Good, the Bad and the Ugly',
    director: 'Sergio Leono'
  },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    director: 'Peter Jackson'
  },
];

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
app.post('/users', (req, res) => {
  res.send('Returns a POST request showing that the user has registered')
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

//Logs to terminal
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
