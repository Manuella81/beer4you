import React from 'react'
import './App.css';
import RequireDataAuth from './helpers/require-data-auth'

import Header from './containers/header'
import Home from './containers/home'
import Basket from './containers/basket'
import Detail from './containers/detail'
import Payment from './containers/payment'
import Product from './containers/product'
import Success from './containers/success'

//User
import Login from './containers/user/login'
import Logout from './containers/user/logout'
import Profil from './containers/user/profil'
import Register from './containers/user/register'

//Admin
import Admin from './containers/admin/admin'
import AddBeer from './containers/admin/beer/addBeer'
import EditBeer from './containers/admin/beer/editBeer'

import {Routes, Route} from 'react-router-dom'

function App() {
 return (
    <div className="App">
    <Header/>
      <Routes>
        <Route exact path="/" element={<RequireDataAuth child={Home} auth={false}/>}/>
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/logout" element={<Logout />}/>
          <Route exact path="/profil" element={<RequireDataAuth child={Profil} auth={true}/>}/>
          <Route exact path="/product" element={<RequireDataAuth child={Product} auth={false}/>}/>
          <Route exact path="/detail/:id" element={<RequireDataAuth child={Detail} auth={false}/>}/>
          <Route exact path="/admin" element={<RequireDataAuth child={Admin} auth={true}/>}/>
          <Route exact path="/editBeer/:id" element={<RequireDataAuth child={EditBeer} auth={true}/>}/>
          <Route exact path="/addBeer" element={<RequireDataAuth child={AddBeer} auth={true}/>}/>
          <Route exact path="/basket" element={<RequireDataAuth child={Basket} auth={false}/>}/>
          <Route exact path="/payment/:orderId" element={<RequireDataAuth child={Payment} auth={true}/>}/>
          <Route exact path="/success" element={<RequireDataAuth child={Success} auth={true}/>}/>
      </Routes>
    </div>
  );
}

export default App;
