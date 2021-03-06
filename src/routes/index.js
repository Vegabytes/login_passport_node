const express = require('express');
const router = express.Router();
const passport = require('passport');
router.get('/', (req, res, next) => {
    res.render('index');
});

//register
router.get('/signup', (req, res, next) => {
    res.render('signup.ejs');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

//login
router.get('/signin', (req, res, next) => {
    res.render('signin.ejs');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');

});


// router.use((req, res, next) => {
//     isAuthenticate(req, res, next);
//     next();
// });

router.get('/profile', isAuthenticated, (req, res, next) => {
    res.render('profile.ejs');
});

// router.get('/dashboard', (req, res, next) => {
//     res.send('dashboard');
// })

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

module.exports = router;