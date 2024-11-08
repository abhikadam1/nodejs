const {getUser} = require('../Utils/AuthService')
module.exports = (req, res, next) => {
    const sessionId = req.cookies('uid');
    if (!sessionId) res.redirect('/ejs/signup');
    const user = getUser(sessionId);
    if(!user) res.redirect('/signup');

    res.user = user;
    next();

    // res.redirect('/ejs/urlShortner');
}