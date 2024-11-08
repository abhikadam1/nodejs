const CustomError = require("./../Utils/CustomError");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const urlSchema = require("../Models/commonModel");
const commonModel = require("../Models/commonModel");
// const customAlphabet = require("nanoid");
const shortid = require("shortid");
const { trim } = require("validator");
const { v4: uuidv4 } = require('uuid');
const { setId, getUser } = require('../Utils/AuthService')


// Define a custom alphabet and length
// const alphabet = "1234567890abcdef";
// const nanoid = customAlphabet(alphabet, 10);

exports.urlShortner = asyncErrorHandler(async (req, res, next) => {
  let { url } = req.body;
  if (!url) {
    return res.redirect('/ejs/urlShortner',
      // {
      //   message: "Please enter a valid URL",
      // }
    );
  }
  url = trim(url);

  const entry = await urlSchema.findOneAndUpdate(
    { urlName: url },
    {
      $push: {
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    },
    { new: true }
  );
  const allUrls = await urlSchema.find({});
  if (entry !== null) {
    return res.redirect('/ejs/urlShortner');
    return res.render('home', { allUrls });
    return res.json({ id: entry.shortUrlId });
  }
  //   const shortUrl = nanoid();
  const shortUrl = shortid.generate();

  await urlSchema.create({
    urlName: url,
    shortUrlId: shortUrl,
    visitHistory: [],
  });

  // return res.render('home', {allUrls});
  return res.redirect('/ejs/urlShortner');
  return res.json({ id: shortUrl });
});

exports.urlVisit = asyncErrorHandler(async (req, res, next) => {
  const shortid = req.params.shortid;
  console.log(shortid, " shortid ");

  const entry = await urlSchema.findOneAndUpdate(
    { shortUrlId: shortid },
    {
      $push: {
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.urlName);
});

exports.analyticsData = asyncErrorHandler(async (req, res, next) => {
  const shortid = req.params.shortid;
  console.log(shortid, " shortid ");

  const entry = await urlSchema.findOne({ shortUrlId: shortid });
  console.log(entry, " entry1");

  res.json({
    totalClicks: entry.visitHistory.length,
    data: entry.visitHistory,
  });
});

exports.homeView = asyncErrorHandler(async (req, res, next) => {
  const allUrls = await urlSchema.find({});
  //  console.log(allUrls, " allUrls ");

  res.render('home', { allUrls });
});

exports.signup = asyncErrorHandler(async (req, res, next) => {
  const sessionId = uuidv4();
  setId(sessionId, 'user1');
  res.cookie('uid', sessionId);

  res.render('signup');
});
exports.signupUser = asyncErrorHandler(async (req, res, next) => {
  console.log('signup route');

  res.render('signup');
});
