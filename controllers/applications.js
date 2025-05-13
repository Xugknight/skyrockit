const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Middleware used to protect routes that need a logged in user
const ensureLoggedIn = require('../middleware/ensure-logged-in');

// This is how we can more easily protect ALL routes for this router
router.use(ensureLoggedIn);

// ALL paths start with '/applications'

// index action
// GET /applications
router.get('/', async (req, res) => {
  res.render('applications/index.ejs');
});

// new route/action
// GET /applications/new
router.get('/new', (req, res) => {
  res.render('applications/new.ejs');
});

// create route/action
// POST /applications
router.post('/', async (req, res) => {
  // req.user is the logged in user's document
  req.user.applications.push(req.body);
  await req.user.save();
  res.redirect('/applications');
});

// show route/action
// GET /applications/:id
router.get('/:id', (req, res) => {
  const app = req.user.applications.id(req.params.id);
  res.render('applications/show.ejs', { app });
});

// delete route/action
// DELETE /applications/:id
router.delete('/:id', async (req, res) => {
  req.user.applications.remove(req.params.id);
  await req.user.save();
  res.redirect('/applications');
});

// edit route/action
// GET /applications/:id/edit
router.get('/:id/edit', (req, res) => {
  const app = req.user.applications.id(req.params.id);
  const statuses = User.schema.path('applications').schema.path('status').enumValues;
  res.render('applications/edit.ejs', { app, statuses });
});

// update route/action
// PUT /applications/:id
router.put('/:id', async (req, res) => {
  const app = req.user.applications.id(req.params.id);
  Object.assign(app, req.body);
  await req.user.save();
  res.redirect(`/applications/${app._id}`);
});

module.exports = router;

// Example of a non-protected route
// router.get('/', (req, res) => {
//   res.send('List of all applications - not protected');
// });

// GET /applications/new
// Example of a protected route
// router.get('/new', ensureLoggedIn, (req, res) => {
//   res.send('Create a unicorn!');
// });