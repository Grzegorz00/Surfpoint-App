export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
}

export function isAuthenticated() {
    const user = getCurrentUser()
    if(user){
        return true
    }
    return false
}

export function isAdmin() {
    const user = getCurrentUser()
    if(user.userId === 1){
        return true
    }
    return false
}

export function isUser(userId) {
    const user = getCurrentUser()
    if(user.userId === userId){
        return true
    }
    return false
}