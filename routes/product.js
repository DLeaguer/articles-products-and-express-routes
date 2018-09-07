const express = require('express');
const Router = express.Router();

//Gets add() from .js
const Products = require('../db/product.js');
const Products_Inv = new Products(); // products.js add()

//RENDER ALL items with GET
Router.get('/productsHome', (req, res) => {
  const allProducts = Products_Inv.all();
  res.render('productsHome', { allProducts });
});

//RENDER out FORM with GET
Router.get('/products/new', (req, res) => {
  res.render('products-form');
});

Router.get('/products/:id/edit', (req, res) => {
  console.log('edit is here')
  const { id } = req.params;
  let productToEdit = Products_Inv.getItemById(id);
  res.render('edit', { productToEdit });
});

//RENDER out DETAIL with GET
Router.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = Products_Inv.getItemById(id);
  res.render('product-detail',  product);
});

//ADD item with POST 
Router.post('/products/new', (req, res) => {
  const product = req.body;
  Products_Inv.add(product);
  console.log('^ post redirecting to Router.get "/"');
  res.redirect('/productsHome');
});

//REMOVE item with DELETE 
Router.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  Products_Inv.deleteProductById(id);
  res.redirect('/productsHome');
});

//EDIT item with PUT 
Router.put('/products/:id', (req, res) => {
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
});

module.exports = Router;