// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')

// all your routes here

router.get('/celebrities', (req, res) => {
  console.log('celebrities route')

  Celebrity.find().then((data) => {

    res.render('celebrities/celebrities', {data});

  })
})



router.get('/celebrities/create', (req, res) => {
  // form
  console.log('create route')
  res.render('celebrities/new-celebrity.hbs')
})

router.post('/celebrities/create', (req, res) => {
  const { name, catchphrase, occupation } = req.body

  const newCelebrity = {
    name,
    catchphrase,
    occupation,
  }

  Celebrity.findOne({ name })
    .then((celebrityFromDB) => {
      if (!celebrityFromDB) {
        // prettier-ignore
        console.log(newCelebrity)
        Celebrity.create(newCelebrity).then(() =>
          res.redirect('/celebrities')
        )
      } else {
        // The user already exists ...
        res.render('celebrities/create', {
          message: 'It seems this celebrity is already added.',
        })
        return
      }
    })
    .catch((err) => console.log(`Error while creating a new celebrity: ${err}`))
})

module.exports = router
