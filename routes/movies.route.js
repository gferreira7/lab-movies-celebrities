// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

// all your routes here
router.get('/movies', (req, res) => {
    console.log('movies route')

    Movie.find().then((data) => {

        res.render('movies/movies', { data });

    })
})

router.get('/movies/create', (req, res) => {
    console.log('create route')


    Celebrity.find()
    .then((allCelebrities) => {
        res.render('movies/new-movie.hbs' ,{allCelebrities})
    })
    .catch((err) => console.log(`Error while creating a new celebrity: ${err}`))


    
})

router.get('/movies/:idMovie', (req, res) => {
    const { idMovie} = req.params;
let data = {
    movieData:{},
    castData:[]
}
    Movie.findById(idMovie).then((dataMovie) => {
        console.log(dataMovie.cast);
        console.log(dataMovie)
        dataMovie.cast.forEach((idActor) => {
            
            Celebrity.findById(idActor).then((foundActor) => {
                console.log(foundActor)
                data.castData.push(foundActor); 
            })
            data.movieData = dataMovie;
            res.render('movies/movie-details', {data});
        })
        
    })
})


router.post('/movies/create', (req, res) => {
    const { title, genre, plot, cast ,} = req.body
    const newMovie = { title, genre, plot, cast }
    console.log(newMovie);
    Movie.findOne({ title })
        .then((movieFromDB) => {
            if (!movieFromDB) {
                // prettier-ignore
                console.log(newMovie)
                Movie.create(newMovie).then(() =>
                    res.redirect('/movies')
                )
            } else {
                // The user already exists ...
                res.render('movies/create', {
                    message: 'It seems this celebrity is already added.',
                })
                return
            }
        })
        .catch((err) => console.log(`Error while creating a new celebrity: ${err}`))
})





module.exports = router;