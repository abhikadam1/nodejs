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
}

function getUser(id) {
    return this.sessionIdToUserMap.get(id);
}

module.exports = {
    setId,
    getUser
}