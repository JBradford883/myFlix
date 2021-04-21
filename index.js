  morgan = require('morgan');
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

//Error-handling middleware
app.use(morgan('common'));

//Logs errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


//Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
