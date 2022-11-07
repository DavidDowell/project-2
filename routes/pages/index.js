const router = require('express').Router();
const { PageController } = require('../../controllers');
const homeRoutes = require('./home-routes');

const isAuthenticated = require('../../middleware/isAuthenticated');

// Static pages
router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));
router.get('/', homeRoutes)

// Pages with data
router.get('/', isAuthenticated, PageController.getDashboard);

module.exports = router;