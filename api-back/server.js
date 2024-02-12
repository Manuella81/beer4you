const express = require('express')
const app = express()

const mysql = require('promise-mysql')
const cors = require('cors')

app.use(cors())

const fileUpload = require('express-fileupload')

app.use(fileUpload({
    createParentPath: true
}))

//parse les url
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(__dirname+'/public'))

//middleware withAuth: une fonction qu'on va par la suite utiliser dans nos routes api pour controller si l'utilisateur peux accéder à la callback de la route ou non


let config;
//on check si l'api est en ligne ou non et on décide quelle bdd on va utiliser
if(!process.env.HOST_DB){
    //nous sommes en local
    config = require("./config-exemple")
}else{
    //nous sommes en ligne
    config = require("./config")
}

//connexion à la bdd
const host = process.env.HOST_DB || config.db.host
const database = process.env.DATABASE_DB || config.db.database
const user = process.env.USER_DB || config.db.user
const password = process.env.PASSWORD || config.db.password
//const port = process.env.PORT || config.db.port

console.log(host, database, user, password)

//import de nos routes
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const beerRoutes = require('./routes/beerRoutes')
const orderRoutes = require('./routes/orderRoutes')

mysql.createConnection({
    host: host,
    database: database,
    user: user,
    password: password
    //port:port
}).then((db)=>{
    console.log('connecté bdd')
    setInterval(async function(){
        let res = await db.query('SELECT 1')
    }, 10000)
    
    app.get('/', (req, res, next)=>{
        res.json({status: 200, msg: "Welcome to your API beer4you!"})
    })
    
    //appel de nos routes
    userRoutes(app, db)
    authRoutes(app, db)
    beerRoutes(app, db)
    orderRoutes(app, db)
})
.catch(err=>console.log(err))

const PORT = process.env.PORT || 9500
//const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`listening port ${PORT}, all is ok!`)
})