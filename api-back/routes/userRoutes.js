const bcrypt = require('bcrypt')
const saltRounds = 10
//librairie qui va générer un token de connexion
const jwt = require('jsonwebtoken')
const secret = 'pitichat'
const withAuth = require('../withAuth')

module.exports = (app, db)=>{
    const userModel = require('../models/UserModel')(db)
    
    //route d'enregistrement d'un utilisateur
    app.post('/api/v1/user/save', async (req, res, next)=>{
        //en premier, vérifier si le mail existe déjà dans la bdd sinon on le refoule
        let check = await userModel.getUserByEmail(req.body.email)
        
        if(check.code){
            res.json({status: 500, msg: "Erreur vérification email.", err: check})
        }
        
        if(check.length > 0){
            if(check[0].email === req.body.email){
                res.json({status: 401, msg: "Email déjà utilisé"})
            }
        }
        
        //ensuite on enregistre le nouvel utilisateur
        let user = await userModel.saveOneUser(req)
        
        if(user.code){
            res.json({status: 500, msg: "Il y'a eu un problème !", err: user})
        }
        res.json({status:200, msg: "L'utilisateur a bien été enregistré !"})
    })
    
    
    //route de connexion d'un utilisateur (c'est ici qu'on va créer le token et l'envoyer vers le front)
    app.post('/api/v1/user/login', async (req, res, next)=>{
        if(req.body.email === ""){
            res.json({status: 401, msg: "Entrez un email..."})
        }
        //on check si il existe un utilisateur dans la bdd avec un mail correspondant
        let user = await userModel.getUserByEmail(req.body.email)
        
        if(user.code){
            res.json({status: 500, msg: "Erreur vérification email.", err: user})
        }
        //si il n'existe pas
        if(user.length === 0){
            //on retourne un message d'erreur
            res.json({status: 404, msg: "Pas d'utilisateur correspondant à ce mail."})
        }
            
        //on compare les password avec bcrypt
        bcrypt.compare(req.body.password, user[0].password)
        .then((same)=>{
            //si c'est true
            if(same){
                //dans payload on stock les valeurs qu'on va glisser dans le token (attention jamais d'infos craignos!)
                const payload = {email: req.body.email,id: user[0].id}
                //on crée notre token avec sa signature (secret)
                const token = jwt.sign(payload, secret)
                console.log("token", token)
                
                res.json({status: 200, token: token, user_id: user[0].id})
                
            //sinon
            }else{
                //on retourne un json d'erreur
                res.json({status: 401, error: "Votre mot de passe est incorrect !"})
            }
        })
        .catch(err=>console.log(err)) 
                
    })
    
    
    //route de modification des utilisateurs
    app.put('/api/v1/user/update/:id', withAuth, async (req, res, next)=>{
        let userId = req.params.id
        
        let user = await userModel.updateUser(req, userId)
        
        if(user.code){
            res.json({status: 500, msg: "gros pb!", err: user})
        }
        
        //mon profil est modifié je renvoi les infos de profil mis à jour vers le front
        let newUser = await userModel.getOneUser(userId)
        
        if(newUser.code){
            res.json({status: 500, msg: "gros pb!", err: newUser})
        }
        
        res.json({status: 200, result: user, newUser: newUser[0]})
    })
    

}