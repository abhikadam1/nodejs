const {getUser} = require('../Utils/AuthService')
module.exports = (req, res, next) => {
    // console.log(req);
    
    const sessionId = req.cookies?.uid;
    console.log(sessionId);
    // return
    if (!sessionId) return res.redirect('/ejs/signup');
    const user = getUser(sessionId);
    console.log(user, ' user ');
    
    if(!user) return res.redirect('/ejs/signup');

    res.user = user;
    next();

    // res.redirect('/ejs/urlShortner');
}