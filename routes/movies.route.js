// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router()
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

// all your routes here
router.get('/movies', (req, res) => {
  Movie.find().then((data) => {
    res.render('movies/movies', { data })
  })
})

router.get('/movies/create', (req, res) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render('movies/new-movie.hbs', { allCelebrities })
    })
    .catch((err) => console.log(`Error while creating a new celebrity: ${err}`))
})

router.post('/movies/create', (req, res) => {
  const { title, genre, plot, cast } = req.body
  const newMovie = { title, genre, plot, cast }
  Movie.findOne({ title })
    .then((movieFromDB) => {
      if (!movieFromDB) {
        // prettier-ignore
        Movie.create(newMovie).then(() => res.redirect('/movies'))
      } else {
        // The user already exists ...
        res.render('movies/create', {
          message: 'It seems this movie is already added.',
        })
        return
      }
    })
    .catch((err) => console.log(`Error while creating a new movie: ${err}`))
})

router.post('/movies/:id/delete', (req, res) => {
  const { id } = req.params
  Movie.findByIdAndRemove(id)
    .then((removedMovie) => {
      res.redirect('/movies')
    })
    .catch((err) => console.log(`Error while deleting a movie: ${err}`))
})

router.post('/movies/:idMovie/edit', (req, res) => {
  const { title, genre, plot, cast } = req.body
  const { idMovie } = req.params

  const data = { title, genre, plot, cast }
  Movie.findByIdAndUpdate(idMovie, data)
    .then(() => {
      res.redirect(`/movies/${idMovie}`)
    })
    .catch((err) => console.log(`Error while deleting a movie: ${err}`))
})

router.get('/movies/:idMovie/edit', (req, res) => {
  const { idMovie } = req.params
  let data = {
    movieData: {},
    castData: [],
  }
  Movie.findById(idMovie).then((dataMovie) => {
    console.log(dataMovie)
    dataMovie.cast.forEach((idActor) => {
      Celebrity.findById(idActor).then((foundActor) => {
        data.castData.push(foundActor)
      })
      data.movieData = dataMovie
    })
    res.render('movies/edit-movie', data)
  })
})

router.get('/movies/:idMovie', (req, res) => {
  const { idMovie } = req.params
  let data = {
    movieData: {},
    castData: [],
  }
  Movie.findById(idMovie).then((dataMovie) => {
    dataMovie.cast.forEach((idActor) => {
      Celebrity.findById(idActor).then((foundActor) => {
        data.castData.push(foundActor)
      })
      data.movieData = dataMovie
    })
    res.render('movies/movie-details', data)
  })
})

module.exports = router
