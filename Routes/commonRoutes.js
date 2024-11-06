const express = require("express");
const router = express.Router();
const HomeController = require('./../Controller/HomeController');

router.route('/ejs/url').post(HomeController.urlShortner);
router.route('/analytics/:shortid').get(HomeController.analyticsData);
router.route('/urlShortner').get(HomeController.homeView);
router.route('/:shortid').get(HomeController.urlVisit);
// const users = [
//     { id: 1, name: 'John' },
//     { id: 2, name: 'Jane' },
//   ];
  
//   // Routes
//   app.get('/ejs', (req, res) => {
//     res.render('home', { users });
//   });
module.exports = router;