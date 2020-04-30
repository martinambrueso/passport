const passport = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const express = require('express');
const app = express();

passport.use('google', new OAuth2Strategy({
    authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenURL: 'https://www.googleapis.com/oauth2/v4/token',
    clientID: '454145119165-3ahd6u9avvvijbic0q8o0idi98ejl4dr.apps.googleusercontent.com',
    clientSecret: 'pny8xeieBgBTrtnqdkMdAKd4',
    callbackURL: 'https://localhost:3000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {

  }
));


// Redirect the user to the OAuth 2.0 provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
app.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

// The OAuth 2.0 provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));

app.get('/', function (req, res) {
    res.send({message: 'raiz'})
})
 
app.get('/login', function (req, res) {
  res.send({message: 'login'})
})
 
app.listen(3000, ()=> {
    console.log('Server listen to 3000')
})