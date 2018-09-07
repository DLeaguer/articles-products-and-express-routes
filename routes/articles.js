const express = require('express');
const Router = express.Router();

//Gets add() from .js
const Articles = require('../db/articles.js');
const Articles_Inv = new Articles(); // articles.js add()

//RENDER ALL items with GET
Router.get('/articlesHome', (req, res) => {
  const allArticles = Articles_Inv.all();
  res.render('articlesHome', { allArticles });
})

//RENDER out FORM with GET
Router.get('/articles/new', (req, res) => {
  res.render('article-form');
});

Router.get('/articles/:id/edit', (req, res) => {
  const { id } = req.params;
  let articleToEdit = Articles_Inv.getItemById(id);
  res.render('edit', { articleToEdit });
});

//RENDER out DETAIL with GET
Router.get('/articles/:id', (req, res) => {
  const{ id } = req.params;
  const article = Articles_Inv.getItemById(id);
  res.render('article-detail', article);
});

//ADD item with POST
Router.post('/articles/new', (req, res) => {
  const article = req.body;
  Articles_Inv.add(article);
  res.redirect('/articlesHome');
});

//REMOVE item with DELETE
Router.delete('/articles/:id', (req, res) => {
  const { id } = req.params;
  Articles_Inv.deleteArticleById(id);
  res.redirect('/articlesHome');
})

//EDIT item with PUT
Router.put('/articles/:id', (req, res) => {
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
});

module.exports = Router;