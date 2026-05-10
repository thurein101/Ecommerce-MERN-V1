const JWT = require("jsonwebtoken")

module.exports = function(id) {

    const time = 60*60*24*5 ; 
    return JWT.sign({_id:id} , process.env.JWT_SECRET_KEY, {expiresIn:time})
}