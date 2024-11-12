const express = require("express");
const router = express.Router();
const HomeController = require('./../Controller/HomeController');
const multer  = require('multer');
const upload = multer({dest : "/uploads"});

router.route('/analytics/:shortid').get(HomeController.analyticsData);
router.route('/urlShortner').get(HomeController.homeView);
router.route('/signup').get(HomeController.signup);
router.route('/signupUser').post(HomeController.signupUser);
router.route('/fileView').get(HomeController.fileView);
router.route('/demoFileUpload').post(upload.single("demofile"), HomeController.demoFileUpload);
router.route('/:shortid').get(HomeController.urlVisit);
router.route('/').post(HomeController.urlShortner);

module.exports = router;