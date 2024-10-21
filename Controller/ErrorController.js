module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    const message = error.message || 'Server Error';
    if (process.env.NODE_ENV === 'development') {
        res.status(error.statusCode).json({
            status: error.status,
            message: message,
            // error: error,
            // stackStrace : error.stack
        });
    
    }else if (process.env.NODE_ENV === 'production') {
        res.status(error.statusCode).json({
            status: error.status,
            message: message,
        });
    }
    console.log(" error controller ");
    
    
}