const router = require('express').Router();



//Get request for random question
const randomQ = {

    fetch('https://the-trivia-api.com/api/questions?limit=20&categories=science,history', {
  headers: {
    // An API key is not required for this endpoint,
    // but can be used to bypass the rate limit or request
    // more questions.
    'x-api-key': <LinkPI_KEY>,
    'Content-Type': 'application/json'
  },
})
};

module.exports = router;