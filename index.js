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

//GET requests
app.get('/', (req, res) => {
  res.send('Welcome to myFlix App');
});
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
