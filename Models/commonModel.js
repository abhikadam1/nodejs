const { type } = require("express/lib/response");
const { default: mongoose } = require("mongoose");

const urlShortnerModel = new mongoose.Schema(
  {
    urlName: { type: String, required: false },
    shortUrlId: { type: String, required: true, unique: true },
    creadtedAt123: {
      type: Date,
      default: Date.now(),
    },
    totalVisit: {
      type: Number,
      default: 0,
    },
    visitHistory: [{ timestamps: { type: Number } }],
  },
  { timestamps: true }
);

const urlSchema = mongoose.model("urlShortnerSchema", urlShortnerModel);

module.exports = urlSchema;

// exports.urlShortnerModel101 = mongoose.model(
//   "urlShortnerSchema",
//   urlShortnerModel
// );
