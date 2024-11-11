class AuthService {
    constructor() {
        const sessionIdToUserMap = new Map();
    }
    setId(id, user) {
        this.sessionIdToUserMap.set(id, user);
    }

    #getUser(id) {
        return this.sessionIdToUserMap.get(id);
    }
}

const sessionIdToUserMap = new Map();
function setId(id, user) {
    sessionIdToUserMap.set(id, user);
    console.log(sessionIdToUserMap, "  sessionIdToUserMap ");

}

function getUser(id) {
    console.log(sessionIdToUserMap, "  sessionIdToUserMap ");
    return sessionIdToUserMap.get(id);
}
// setId(1254, 8558);
module.exports = {
    setId,
    getUser
}