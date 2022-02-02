const jwt = require('jsonwebtoken')

const config = require("../config/auth/key")

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log("-------" + JSON.stringify(req.user));
    if(token == null){
        return res.sendStatus(401)
    }
    jwt.verify(token, config.secret, (err, user) => {
        if(err) {
            return res.sendStatus(403)
        }
        req.user = user
    })
    next()
}