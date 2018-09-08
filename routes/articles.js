const express = require('express');
const Router = express.Router();

//Gets add() from .js
const Articles = require('../db/articles.js');
const Articles_Inv = new Articles(); // articles.js add()
const Users = require('../db/users.js');
const Users_Inv = new Users();

//RENDER LOGIN 
let authorized = false;
Router.get('/articles/login', (req, res) => {
  res.render('articlesLogin');
});

Router.get('/articles/logout', (req, res) => {
  authorized = false;
  res.redirect('/');
});

//AUTHORIZE 
Router.post('/articles/login', (req, res) => {
  const info = req.body;
  const user = Users_Inv.getUserByInfo(info.username, info.password);
  if (user == undefined) {
    res.redirect('/articles/login');
  }
  else {
    authorized = true;
    res.redirect('/articlesHome');
  }
});

//RENDER ALL 
Router.get('/articlesHome', (req, res) => {
    const allArticles = Articles_Inv.all();
    res.render('articlesHome', { allArticles });
});

//RENDER FORM
Router.get('/articles/new', (req, res) => {
  if (!authorized) {
    res.redirect('/articles/login');
  }
  else {
    res.render('article-form');
  }
});

Router.get('/articles/:id/edit', (req, res) => {
  if (!authorized) {
    res.redirect('/articles/login');
  }
  else {
    const { id } = req.params;
    let articleToEdit = Articles_Inv.getItemById(id);
    res.render('edit', { articleToEdit });
  }
});

//RENDER DETAIL
Router.get('/articles/:id', (req, res) => {
    const{ id } = req.params;
    const article = Articles_Inv.getItemById(id);
    res.render('article-detail', article);
});

//ADD 
Router.post('/articles/new', (req, res) => {
  if (!authorized) {
    res.redirect('/articles/login');
  }
  else {
    const article = req.body;
    Articles_Inv.add(article);
    res.redirect('/articlesHome');
  }
});

//REMOVE 
Router.delete('/articles/:id', (req, res) => {
  if (!authorized) {
    res.redirect('/articles/login');
  }
  else {
    const { id } = req.params;
    Articles_Inv.deleteArticleById(id);
    res.redirect('/articlesHome');
  }
})

//EDIT 
Router.put('/articles/:id', (req, res) => {
  if (!authorized) {
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
    res.redirect(`/articles/${id}`);
  }
});

module.exports = Router;