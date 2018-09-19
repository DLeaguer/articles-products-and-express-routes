console.log('\nstart routes/articles.js');
console.log(' connect require/assign');
const express = require('express');
const Router = express.Router();

//Gets add() from .js
console.log(' connect db cache');
const Articles = require('../db/articles.js');
const Articles_Inv = new Articles(); //articles.js add()
const Users = require('../db/users.js');
const Users_Inv = new Users();

//RENDER LOGIN 
let authorized = false;
Router.get('/articles/login', (req, res) => {
  console.log('LOGIN');
  res.render('articlesLogin');
});

Router.get('/articles/logout', (req, res) => {
  authorized = false;
  console.log('LOGOUT');
  res.redirect('/');
});

//AUTHORIZE 
Router.post('/articles/login', (req, res) => {
  const info = req.body;
  const user = Users_Inv.getUserByInfo(info.username, info.password);
  if (user == undefined) {
    console.log('AUTH');
    res.redirect('/articles/login');
  }
  else {
    authorized = true;
    console.log('AUTH');
    res.redirect('/articlesHome');
  }
});

//RENDER ALL 
Router.get('/articlesHome', (req, res) => {
    const allArticles = Articles_Inv.all();
    console.log('ALL');
    res.render('articlesHome', { allArticles });
});

//RENDER FORM
Router.get('/articles/new', (req, res) => {
  if (!authorized) {
    console.log('FORM');
    res.redirect('/articles/login');
  }
  else {
    console.log('FORM');
    res.render('article-form');
  }
});

Router.get('/articles/:id/edit', (req, res) => {
  if (!authorized) {
    console.log('FORM');
    res.redirect('/articles/login');
  }
  else {
    const { id } = req.params;
    let articleToEdit = Articles_Inv.getItemById(id);
    console.log('FORM');
    res.render('edit', { articleToEdit });
  }
});

//RENDER DETAIL
Router.get('/articles/:id', (req, res) => {
    const{ id } = req.params;
    const article = Articles_Inv.getItemById(id);
    console.log('DETAIL');
    res.render('article-detail', article);
});

//ADD 
Router.post('/articles/new', (req, res) => {
  if (!authorized) {
    console.log('ADD');
    res.redirect('/articles/login');
  }
  else {
    const article = req.body;
    Articles_Inv.add(article);
    console.log('ADD');
    res.redirect('/articlesHome');
  }
});

//REMOVE 
Router.delete('/articles/:id', (req, res) => {
  if (!authorized) {
    console.log('DELETE');
    res.redirect('/articles/login');
  }
  else {
    const { id } = req.params;
    Articles_Inv.deleteArticleById(id);
    console.log('DELETE');
    res.redirect('/articlesHome');
  }
})

//EDIT 
Router.put('/articles/:id', (req, res) => {
  if (!authorized) {
    console.log('EDIT');
    res.redirect('/articles/login');
  }
  else {
    const { id } = req.params;
    let articleToEdit = Articles_Inv.getItemById(id);
    if (req.body.title !== articleToEdit.title) {
      articleToEdit.title = req.body.title;
    }
    if (req.body.body !== articleToEdit.body) {
      articleToEdit.body = req.body.body;
    }
    if ( req.body.author !== articleToEdit.author) {
      articleToEdit.author = req.body.author;
    }
    console.log('EDIT');
    res.redirect(`/articles/${id}`);
  }
});

module.exports = Router;
console.log('end routes/articles.js');