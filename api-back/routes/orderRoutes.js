const stripe = require('stripe')('YOUR SK_TEST')
const withAuth = require('../withAuth')

module.exports = (app, db) => {
    const orderModel = require('../models/OrderModel')(db)
    const beerModel = require('../models/BeerModel')(db)
    
    //route de sauvegarde d'une commande
    app.post('/api/v1/order/save', withAuth, async (req, res, next)=>{
        let totalAmount = 0;
        //enregistrement de l'order (fonction)
        let orderInfos = await orderModel.saveOneOrder(req.body.user_id, totalAmount)
        //on récup dans l'objet de réponse l'insertId (l'id qu'il vient d'insérer dans le bdd)
        let id = orderInfos.insertId
        //on boucle sur le panier passé dans req.body.basket (pour enregistrer le detail de chaque produit)
        req.body.basket.map(async (b, index)=>{
            //on récup les infos d'une bière par son id (on stock dans une variable beer)
            let beer = await beerModel.getOneBeers(b.id)
            //on ajoute une propriété safePrice à l'objet du tour de boucle en lui affectant le prix de beer en chiffre à virgule
            b.safePrice = parseFloat(beer[0].price)
            //on appel la fonction pour sauvegarder un détail de cette commande en envoyant l'id de la commande et le produit du tour de boucle
            let detail = await orderModel.saveOneOrderDetail(id, b)
            //on additionne au totalAmount la quantité du produit demandé multiplié par le safePrice
            totalAmount += parseInt(b.quantityInCart) * parseFloat(b.safePrice)
            //on met à jour le montant total de la commmande (fonction)
            let update = await orderModel.updateTotalAmount(id, totalAmount)
        })
        res.json({status: 200, orderId: id})
        
    })
    
    //route de gestion du paiement (va analyser le bon fonctionnement du paiement)
    app.post('/api/v1/order/payment', withAuth, async (req, res, next)=>{
        let order = await orderModel.getOneOrder(req.body.orderId)
        //on lance un suivis du paiement
        const paymentIntent = await stripe.paymentIntents.create({
            amount: order[0].totalAmount*100, //il est en cents donc on multiplie le montant à payer par 100
            currency: 'eur',
            //vérification de paiement
            metadata: {integration_check: 'accept_a_payment'}, //on consulte si le paiement est accepté ou non
            receipt_email: req.body.email //l'utilisateur recoit sa confirmation de paiement par mail
        })
        
        res.json({client_secret: paymentIntent['client_secret']})
    })
    
    //route de modification du status de paiement de la commande
    app.put('/api/v1/order/validate', withAuth, async (req, res, next) => {
        //fonction de modification du status de paiement de la commande
        let validate = await orderModel.updateStatus(req.body.orderId, req.body.status)
    })
        
        
} 