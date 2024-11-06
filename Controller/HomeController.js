const CustomError = require("./../Utils/CustomError");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const urlSchema = require("../Models/commonModel");
const commonModel = require("../Models/commonModel");
// const customAlphabet = require("nanoid");
const shortid = require("shortid");

// Define a custom alphabet and length
// const alphabet = "1234567890abcdef";
// const nanoid = customAlphabet(alphabet, 10);

exports.urlShortner = asyncErrorHandler(async (req, res, next) => {
  const { url } = req.body;

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

  if (entry !== null) {
    return res.json({ id: entry.shortUrlId });
  }
  //   const shortUrl = nanoid();
  const shortUrl = shortid.generate();

  await urlSchema.create({
    urlName: url,
    shortUrlId: shortUrl,
    visitHistory: [],
  });

//   return res.redirect(url);
  return res.json({ id: shortUrl });
//   return res.render("home", { shortUrl });
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
