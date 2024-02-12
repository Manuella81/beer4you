module.exports = (_db)=>{
    db = _db
    return BeerModel
}

class BeerModel {
    
    //récupération des bières
    static getAllBeers(){
        let sql = 'SELECT * FROM `beers`'
        return db.query(sql)
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }
    
    //récupération d'une seule bière
    static getOneBeers(id){
        let sql = 'SELECT * FROM `beers` WHERE id=?'
        return db.query(sql, [id])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }
    
    //sauvegarde d'une bière
    static saveOneBeer(req){
        let sql = "INSERT INTO `beers`(`name`, `description`, `price`, `photo`, `quantity`, `creationTimestamp`) VALUES (?,?,?,?,?,NOW())"
        return db.query(sql, [req.body.name, req.body.description, req.body.price, req.body.photo, req.body.quantity])
            .then((res)=>{
                return res
            })
            .catch((err)=>{
                return err
            })
    }
    
    //modification d'une bière
    static updateOneBeers(req, id){
        let sql = "UPDATE `beers` SET `name`=?,`description`=?,`price`=?,`photo`=?,`quantity`=? WHERE id=?"
        return db.query(sql, [req.body.name, req.body.description, req.body.price, req.body.photo, req.body.quantity, id])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }
    
    //suppression d'une bière
    static deleteOneBeers(id){
        let sql = "DELETE FROM `beers` WHERE id=?";
        return db.query(sql, [id])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }
}