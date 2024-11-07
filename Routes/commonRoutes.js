const express = require("express");
const router = express.Router();
const HomeController = require('./../Controller/HomeController');

router.route('/analytics/:shortid').get(HomeController.analyticsData);
router.route('/urlShortner').get(HomeController.homeView);
router.route('/:shortid').get(HomeController.urlVisit);
router.route('/').post(HomeController.urlShortner);

module.exports = router;