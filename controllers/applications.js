const express = require('express');
const router = express.Router();

// Middleware used to protect routes that need a logged in user
const ensureLoggedIn = require('../middleware/ensure-logged-in');

// This is how we can more easily protect ALL routes for this router
router.use(ensureLoggedIn);

// ALL paths start with '/applications'

// index action
// GET /applications
router.get('/', async (req, res) => {
  // req.user is the logged in user's document
  res.render('applications/index.ejs');
});




// GET /applications/new
// Example of a protected route
router.get('/new', ensureLoggedIn, (req, res) => {
  res.send('Create a unicorn!');
});

module.exports = router;

// Example of a non-protected route
// router.get('/', (req, res) => {
//   res.send('List of all applications - not protected');
// });