const JWT = require('jsonwebtoken')


var token ={
    makeJWT : function(username){
        let payload ={
          username:username,
        }
        const token = JWT.sign({
          data: payload
        }, 'SecretKey', { expiresIn: '72h' });
        //console.log(token)
        return token
      },
      verifyJWT: function(token){
        let decodedToken = JWT.verify(token, 'SecretKey');
        //console.log(decodedToken)
        return decodedToken
      }
}


module.exports = token