import {createSlice} from "@reduxjs/toolkit"

//récupération du basket présent dans le localStorage que l'on stock dans une variable lsBasket
let lsBasket = JSON.parse(window.localStorage.getItem('b4y-basket'))
//si lsBasket est null (introuvable dans le storage pas de panier)
if(lsBasket === null){
    //on initialise un tableau vide pour lsBasket
    lsBasket = []
}
//si lsBasket n'est pas null, lsBasket enfermera un tableau d'objet, du coup calculateTotalAmount calculera le montant total du panier, si jamais il est null, calculateTotalAmount va faire une boucle sur une tableau vide donc totalPrice restera à zero
let totalPrice = calculateTotalAmount(lsBasket)

//on initialise une state, soit on aura basket avec un tableau d'objet et totalPrice avec la somme totale, soit on aura un basket tableau vide et totalPrice à zero
const initialState = {
    basket: lsBasket,
    totalPrice: totalPrice
}


function calculateTotalAmount(basket){
    console.log("newBasket", basket)
    let basketPrice = 0;
    for(let i=0; i < basket.length; i++){
        basketPrice += parseInt(basket[i].quantityInCart) * parseFloat(basket[i].price)
    }
    return basketPrice
}
//création d'un slice avec une action modifyBasket et une autre cleanBasket
export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        modifyBasket: (state, action)=>{
            let totalPrice = calculateTotalAmount(action.payload)
            state.basket = action.payload
            state.totalPrice = totalPrice
        },
        cleanBasket: (state)=>{
            state.basket = []
            state.totalPrice = 0
        }
    }
})

export const {modifyBasket, cleanBasket} = basketSlice.actions

export const selectBasket = state => state.basket

export default basketSlice.reducer