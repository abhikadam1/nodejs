const express = require("express");
const router = express.Router();
const HomeController = require('./../Controller/HomeController');

router.route('/ejs/url').post(HomeController.urlShortner);
router.route('/:shortid').get(HomeController.urlVisit);
router.route('/analytics/:shortid').get(HomeController.analyticsData);
module.exports = router;