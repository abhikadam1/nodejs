const express = require("express");
const router = express.Router();
const HomeController = require('./../Controller/HomeController');

router.route('/ejs/url').post(HomeController.urlShortner);
router.route('/analytics/:shortid').get(HomeController.analyticsData);
router.route('/urlShortner').get(HomeController.homeView);
router.route('/:shortid').get(HomeController.urlVisit);

module.exports = router;