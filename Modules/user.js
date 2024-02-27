const events = require('events');
module.exports = class User extends events.EventEmitter{
    constructor(){
        super();
    }
}