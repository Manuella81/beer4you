module.exports = (_db)=>{
    db = _db
    return OrderModel
}

class OrderModel {
    //validation d'une commande
    static saveOneOrder(user_id, totalAmount){
        //le status sera "not payed" par défault
        return db.query('INSERT INTO orders (user_id, totalAmount, creationTimestamp, status) VALUES (?, ?, NOW(), "not payed")', [user_id, totalAmount])
            .then((response)=>{
                return response
            })
            .catch((err) => {
                return err
            })
    }
    
    //sauvegarde d'un orderDetail 
    static saveOneOrderDetail(order_id, beer){
        //ici beer est un objet représentant un produit, il aura des propriété nécéssaire pour notre requète beer.id et beer.quantityInCart
        let total = parseInt(beer.quantityInCart)*parseFloat(beer.safePrice)
        return db.query('INSERT INTO orderdetails (order_id, beer_id, quantity, total) VALUES (?,?,?,?)', [order_id, beer.id, beer.quantityInCart, total])
            .then((response)=>{
                return response
            })
            .catch((err) => {
                return err
            })
    }
    
    //modification du montant total
    static updateTotalAmount(order_id, totalAmount){
        return db.query('UPDATE orders SET totalAmount = ? WHERE id = ?', [totalAmountorder_id])
            .then((response)=>{
                return response
            })
            .catch((err) => {
                return err
            })
    }
    
    //récupération d'une commande en fonction d'un id
    static getOneOrder(id){
        return db.query('SELECT * FROM orders WHERE id = ?', [id])
            .then((result)=>{
                return result
            })
            .catch((err)=>{
                return err
            })
    }
    
    //modification d'un status de commande
    static updateStatus(orderId, status){
        return db.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId])
            .then((response)=>{
                return response
            })
            .catch((err) => {
                return err
            })
    }
}