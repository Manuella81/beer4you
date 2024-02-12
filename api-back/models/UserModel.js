const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = (_db)=>{
    db=_db
    return UserModel
}

class UserModel {
    //sauvegarde d'un membre
    static saveOneUser(req){
        return bcrypt.hash(req.body.password, saltRounds)
        .then((hash)=>{
            console.log(hash)
            let sql = "INSERT INTO `users`(`firstName`, `lastName`, `email`, `password`, `role`, `address`, `zip`, `city`, `phone`, `creationTimestamp`, `connexionTimestamp`) VALUES (?, ?, ?, ?, 'user', ?, ?, ?, ?, NOW(), NOW()) "
            return db.query(sql, [req.body.firstName, req.body.lastName, req.body.email, hash, req.body.address, req.body.zip, req.body.city, req.body.phone])
            .then((res)=>{
                return res
            })
            .catch((err)=>{
                return err
            })
        })
        .catch((err)=>{
            return err
        })
    }
    
    //récupération d'un utilisateur en fonction de son mail
    static getUserByEmail(email){
        let sql = "SELECT `id`, `firstName`, `lastName`, `email`, `password`, `role`, `address`, `zip`, `city`, `phone`, `creationTimestamp`, `connexionTimestamp` FROM `users` WHERE email=?"
        return db.query(sql, [email])
            .then((res)=>{
                return res
            })
            .catch((err)=>{
                return err
            })
    }
    
    //récupération d'un utilisateur par son id
    static getOneUser(id){
        let sql = "SELECT `id`, `firstName`, `lastName`, `email`, `password`, `role`, `address`, `zip`, `city`, `phone`, `creationTimestamp`, `connexionTimestamp` FROM `users` WHERE id=?"
        return db.query(sql, [id])
            .then((res)=>{
                return res
            })
            .catch((err)=>{
                return err
            })
    }
    
    //modification d'un utilisateur
    static updateUser(req, userId){
        return db.query("UPDATE users SET firstName = ?, lastName = ?, address = ?, zip = ?, city = ?, phone = ? WHERE id = ?", [req.body.firstName, req.body.lastName, req.body.address, req.body.zip, req.body.city, req.body.phone, userId])
            .then((response)=>{
                return response
            })
            .catch((err)=>{
                return err
            })
    }
    
}