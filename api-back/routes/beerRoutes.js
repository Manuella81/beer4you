const fs = require('fs')//va nous permettre de supprimer des images locales
const withAuth = require('../withAuth')

module.exports = (app,db)=>{
    const beerModel = require('../models/BeerModel')(db)
    
    //route permettant de récupérer toutes les bières
    app.get('/api/v1/beer/all',async (req, res, next)=>{
	
		let beers = await beerModel.getAllBeers()
		if(beers.code){
			res.json({status: 500, msg: "Il y'a eu un problème !", err: beers})
		}
		res.json({status:200, msg: "OK! Toutes les bières ont été récupérées!", result:beers})
	})
	
    
    //route permettant de récuperer une seule bière
    app.get('/api/v1/beer/one/:id',async (req, res, next)=>{
		let id = req.params.id
		let beer = await beerModel.getOneBeers(id)
		if(beer.code){
			res.json({status: 500, err: beer})
		}
		res.json({status: 200, result: beer[0]})
	})
	
    
    //route permettant d'enregistrer une bière
    app.post('/api/v1/beer/save', async (req, res, next) =>{
		let beer = await beerModel.saveOneBeer(req)
		if(beer.code){
			res.json({status: 500, err: "Echec: le produit n'a pas pu être rajouter"})
		}
		res.json({status:200, msg: "Bière enregistré !", result: beer})
	})
	
    
    //route d'ajout d'une image dans l'api (stock une image et retourne au front le nom de l'image stocké)
    app.post('/api/v1/beer/pict', (req, res, next)=>{
		//console.log(req.files.image);
		//si on a pas envoyé de req.files via le front ou que cet objet ne possède aucune propriété
		if (!req.files || Object.keys(req.files).length === 0) {
			//on envoi une réponse d'erreur
	    	 res.json({status: 400, msg: "La photo n'a pas pu être récupérée"});
	    }
	    
	    //la fonction mv va envoyer l'image dans le dossier que l'on souhaite.
	    req.files.image.mv('public/images/'+req.files.image.name, function(err) {
	    	console.log('ça passe', '/public/images/'+req.files.image.name)
	    	//si ça plante dans la callback
		    if (err) {
		    //renvoi d'un message d'erreur
		      res.json({status: 500, msg: "La photo n'a pas pu être enregistrée"})
		    }
		 });
	   //si c'est good on retourne un json avec le nom de la photo vers le front
        res.json({status: 200, msg: "image bien enregistré!", url: req.files.image.name})
    })
    
    
    //route permettant de modifier une bière
    app.put('/api/v1/beer/update/:id',withAuth, async (req, res, next)=>{
    	let id = req.params.id
    	let beer = await beerModel.updateOneBeers(req, id)
    	if(beer.code){
    		res.json({status: 500, msg: "il y'a eu un problème!", err: beer})
    	}
    	res.json({status: 200, msg: "Bière modifiée", result: beer})
    })
    
    
    //route permettant de supprimer une bière
    app.delete('/api/v1/beer/delete/:id', async (req, res, next)=>{
    	let id = req.params.id
    	let beer = await beerModel.getOneBeers(id)
    	if(beer.code){
    		res.json({status: 500, msg: "il y'a eu un problème!", err: beer})
    	}
    	let deleteBeer = await beerModel.deleteOneBeers(id)
    	if(deleteBeer.code){
    		res.json({status: 500, msg: "il y'a eu un problème!", err: deleteBeer})
    	}
    	//suppression de l'image correspondant à l'article
    	if(beer[0].photo !== "no-pict.jpg"){
    		//supprime le fichier (photo) correspondant au nom de la photo enregistrée pour le produit dans la bdd, il supprime la photo dans le dossier static ou son stockées les images
    		fs.unlink(`public/images/${beer[0].photo}`, function(err){
    			if(err){
    				res.json({status: 500, msg: "Problème suppression d'image!"})
    			}
    		})
    	}
    	res.json({status: 200, result: deleteBeer})
    })
}