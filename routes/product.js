console.log('\nstart routes/product.js');
console.log(' connect require/assign');
const express = require('express');
const Router = express.Router();

//Gets add() from .js
console.log(' connect db cache');
const Products = require('../db/product.js');
const Products_Inv = new Products(); //products.js add()
const Users = require('../db/users.js');
const Users_Inv = new Users();

//RENDER LOGIN 
let authorized = false;
Router.get('/products/login', (req, res) => {
  console.log('LOGIN');
  res.render('productsLogin');
});

Router.get('/products/logout', (req, res) => {
  authorized = false;
  console.log('LOGOUT');
  res.redirect('/');
});

//AUTHORIZE 
Router.post('/products/login', (req, res) => {
  const info = req.body;
  const user = Users_Inv.getUserByInfo(info.username, info.password);
  if (user == undefined) {
    console.log('AUTH');
    res.redirect('/products/login');
  }
  else {
    authorized = true;
    console.log('AUTH');
    res.redirect('/productsHome');
  }
});

//RENDER ALL
Router.get('/productsHome', (req, res) => {
    const allProducts = Products_Inv.all();
    console.log('ALL');
    res.render('productsHome', { allProducts });
});

//RENDER FORM 
Router.get('/products/new', (req, res) => {
  if (!authorized) {
    console.log('FORM');
    res.redirect('/products/login');
  }
  else {
    console.log('FORM');
    res.render('products-form');
  }
});

Router.get('/products/:id/edit', (req, res) => {
  if (!authorized) {
    console.log('FORM');
    res.redirect('/products/login');
  }
  else {
    const { id } = req.params;
    let productToEdit = Products_Inv.getItemById(id);
    console.log('FORM');
    res.render('edit', { productToEdit });
  }
});

//RENDER DETAIL 
Router.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = Products_Inv.getItemById(id);
    console.log('DETAIL');
    res.render('product-detail',  product);
});

//ADD 
Router.post('/products/new', (req, res) => {
  if (!authorized) {
    console.log('ADD');
    res.redirect('/producs/login');
  }
  else {
    const product = req.body;
    Products_Inv.add(product);
    console.log('ADD');
    res.redirect('/productsHome');
  }
});

//REMOVE  
Router.delete('/products/:id', (req, res) => {
  if (!authorized) {
    console.log('DELETE');
    res.redirect('/products/login');
  }
  else {
    const { id } = req.params;
    Products_Inv.deleteProductById(id);
    console.log('DELETE');
    res.redirect('/productsHome');
  }
});

//EDIT  
Router.put('/products/:id', (req, res) => {
  if (!authorized) {
    console.log('EDIT');
    res.redirect('/products/login');
  }
  else {
    const { id } = req.params;
    let productToEdit = Products_Inv.getItemById(id);
    if (req.body.product !== productToEdit.product) {
      productToEdit.product = req.body.product;
    }
    if (req.body.price !== productToEdit.price) {
      productToEdit.price = req.body.price;
    }
    if ( req.body.inventory !== productToEdit.inventory) {
      productToEdit.inventory = req.body.inventory;
    }
    console.log('EDIT');
    res.redirect(`/products/${id}`);
  }
});

module.exports = Router;
console.log('end routes/product.js');