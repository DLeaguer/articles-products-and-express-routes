const express = require('express');
const Router = express.Router();

const Users = require('../db/users.js');
const Users_Inv = new Users();

//RENDER LOGIN 
Router.get('/login', (req, res) => {
  res.render('login');
});

Router.get('/logout', (req, res) => {
  authorized = false;
  res.render('login');
});

//RENDER FORM 
let authorized = true;
Router.get('/users/new', (req, res) => {
  if (!authorized) {
    res.redirect('/login');
  }
  else {
    res.render('login');
  }
});

Router.get('/users/:id/edit', (req, res) => {
  if (!authorized) {
    res.redirect('/login');
  }
  else {
    const { id } = req.params;
    let userToEdit = Users_Inv.getUserById(id);
    res.render('edit', { userToEdit});
  }
});

//RENDER DETAIL 
Router.get('/users/:id', (req, res) => {
  if (!authorized) {
    res.redirect('/login');
  }
  else {
    const { id } = req.params;
    const user = User_Inv.getUserById(id);
    res.render('login', user);
  }
});

//AUTHORIZE 
Router.post('/login', (req, res) => {
  const info = req.body;
  const user = Users_Inv.getUserByInfo(info.username, info.password);
  if (user == undefined) {
    res.redirect('/login');
  }
  else {
    authorized = true;
    res.render('home');
  }
});

//ADD 
Router.post('/users/new', (req, res) => {
  if (!authorized) {
    res.redirect('/login');
  }
  else {
    const user = req.body;
    Users_Inv.add(user);
    res.redirect('/users');
  }
});

//REMOVE 
Router.delete('/users/:id', (req, res) => {
  if (!authorized) {
    res.redirect('/login');
  }
  else {
    const { id } = req.params;
    const deleteUser = Users_Inv.deleteUserById(id);
    res.redirect('/users');
  }
});

//EDIT 
Router.put('/users/:id', (req, res) => {
  if (!authorized) {
    res.redirect('/login');
  }
  else {
    let userToEdit = Users_Inv.getUserById(id);
    if (req.body.username !== userToEdit.username) {
      userToEdit.username = req.body.username;
    }
    if (req.body.password !== userToEdit.password) {
      userToEdit.password = req.body.password;
    }
    res.redirect(`/users/${id}`);
  }
});

module.exports = Router;