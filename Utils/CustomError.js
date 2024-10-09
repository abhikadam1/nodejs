const { status } = require("express/lib/response");

class CustomError extends Error  {
    constructor(meg, statusCode = 404){   
        super(meg);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : error ;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);    
    }
}

module.exports = CustomError;