const jwt = require('jsonwebtoken')
const secret = 'pitichat'

const withAuth = (req, res, next)=>{
    //on récupère notre token daans le header de la requète HTTP
    const token = req.headers['x-access-token']
    //si il ne le trouve pas
    if(token === undefined){
        res.json({status: 404, msg: "error, token not found."})
    }else{
        //sinon il a trouvé un token, utilisation de la fonction de vérification de jsonwebtoken
        jwt.verify(token, secret, (err, decoded)=>{
            if(err){
                res.json({status: 401, msg: "error: your token is invalid"})
            }else{
                //on rajoute une propriété id dans req, qui récupère l'id décodé du token (nous servira pour la route d'authentification)
                req.id = decoded.id
                //on sort de la fonction, on autorise l'accés à la callback de la route
                next()
            }
        })
    }
    
}

module.exports = withAuth