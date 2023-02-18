// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')

// all your routes here

router.get('/create', (req, res) => {
    // form
    res.render('new-celebrity')

})


router.post('/create', (req, res) => {
    
    const {name,catchphrase, occupation } = req.body

    const newCelebrity = {name, catchprase, occupation}

    Celebrity.findOne({ newCelebrity.name })
    .then((celebrityFromDB) => {

      if (!celebrityFromDB) {
        // prettier-ignore
        Celebrity.create({newCelebrity})
        .then(() => res.redirect('/celebrities'));
      } else {
        // The user already exists ...
        res.render("celebrities/create", { message: "It seems this celebrity is already added." });
        return;
      }
    })
    .catch((err) => console.log(`Error while creating a new celebrity: ${err}`));



})


module.exports = router
