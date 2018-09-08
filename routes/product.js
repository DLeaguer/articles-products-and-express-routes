const express = require('express');
const Router = express.Router();

//Gets add() from .js
const Products = require('../db/product.js');
const Products_Inv = new Products(); // products.js add()
const Users = require('../db/users.js');
const Users_Inv = new Users();

//RENDER LOGIN 
let authorized = false;
Router.get('/products/login', (req, res) => {
  res.render('productsLogin');
});

Router.get('/products/logout', (req, res) => {
  authorized = false;
  res.redirect('/');
});

//AUTHORIZE 
Router.post('/products/login', (req, res) => {
  const info = req.body;
  const user = Users_Inv.getUserByInfo(info.username, info.password);
  if (user == undefined) {
    res.redirect('/products/login');
  }
  else {
    authorized = true;
    res.redirect('/productsHome');
  }
});

//RENDER ALL
Router.get('/productsHome', (req, res) => {
    const allProducts = Products_Inv.all();
    res.render('productsHome', { allProducts });
});

//RENDER FORM 
Router.get('/products/new', (req, res) => {
  if (!authorized) {
    res.redirect('/products/login');
  }
  else {
    res.render('products-form');
  }
});

Router.get('/products/:id/edit', (req, res) => {
  if (!authorized) {
    res.redirect('/products/login');
  }
  else {
    console.log('edit is here')
    const { id } = req.params;
    let productToEdit = Products_Inv.getItemById(id);
    res.render('edit', { productToEdit });
  }
});

//RENDER DETAIL 
Router.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = Products_Inv.getItemById(id);
    res.render('product-detail',  product);
});

//ADD 
Router.post('/products/new', (req, res) => {
  if (!authorized) {
    res.redirect('/producs/login');
  }
  else {
    const product = req.body;
    Products_Inv.add(product);
    console.log('^ post redirecting to Router.get "/"');
    res.redirect('/productsHome');
  }
});

//REMOVE  
Router.delete('/products/:id', (req, res) => {
  if (!authorized) {
    res.redirect('/products/login');
  }
  else {
    const { id } = req.params;
    Products_Inv.deleteProductById(id);
    res.redirect('/productsHome');
  }
});

//EDIT  
Router.put('/products/:id', (req, res) => {
  if (!authorized) {
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
    res.redirect(`/products/${id}`);
  }
});

module.exports = Router;