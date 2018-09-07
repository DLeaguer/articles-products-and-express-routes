const express = require('express');
const exphbs = require('express-handlebars');
const bp = require('body-parser');
const methodOverride = require('method-override');

//Gets add() from .js
const Products = require('./db/product.js');
const Products_Inv = new Products(); // products.js add()
const Articles = require('./db/articles.js');
const Articles_Inv = new Articles(); // articles.js add()

//Use app for all express methods
const app = express();

//middleware
app.use(express.static('public'));
app.use(bp.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use((req, res, next) => {
  console.log(`\n${req.method} request at: ${req.url}`);
  next();
});

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//ROUTES below will not be used until called upon

//RENDER ALL items with GET
app.get('/', (req, res) => {
  // const allProducts = Products_Inv.all();
  // const allArticles = Articles_Inv.all();
  // res.render('home', {allProducts, allArticles});
  res.render('home');
});

app.get('/productsHome', (req, res) => {
  const allProducts = Products_Inv.all();
  res.render('productsHome', { allProducts });
});

app.get('/articlesHome', (req, res) => {
  const allArticles = Articles_Inv.all();
  res.render('articlesHome', { allArticles });
})

//RENDER out FORM with GET
app.get('/products/new', (req, res) => {
  res.render('products-form');
});

app.get('/articles/new', (req, res) => {
  res.render('article-form');
});

app.get('/products/:id/edit', (req, res) => {
  console.log('edit is here')
  const { id } = req.params;
  let productToEdit = Products_Inv.getItemById(id);
  res.render('edit', { productToEdit });
});

app.get('/articles/:id/edit', (req, res) => {
  const { id } = req.params;
  let articleToEdit = Articles_Inv.getItemById(id);
  res.render('edit', { articleToEdit });
});

//RENDER out DETAIL with GET
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = Products_Inv.getItemById(id);
  res.render('product-detail',  product);
});

app.get('/articles/:id', (req, res) => {
  const{ id } = req.params;
  const article = Articles_Inv.getItemById(id);
  res.render('article-detail', article);
});

//ADD item with POST
app.post('/products/new', (req, res) => {
  const product = req.body;
  Products_Inv.add(product);
  console.log('^ post redirecting to app.get "/"');
  res.redirect('/productsHome');
});

app.post('/articles/new', (req, res) => {
  const article = req.body;
  Articles_Inv.add(article);
  res.redirect('/articlesHome');
});

//REMOVE item with DELETE
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const deleteProduct = Products_Inv.deleteProductById(id);
  res.redirect('/productsHome');
});

app.delete('/articles/:id', (req, res) => {
  const { id } = req.params;
  const deleteArticle = Articles_Inv.deleteArticleById(id);
  res.redirect('/articlesHome');
})

//EDIT item with PUT
app.put('/products/:id', (req, res) => {
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

app.put('/articles/:id', (req, res) => {
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

//ERROR page
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/404.html')
});

//SERVE PORT with LISTEN
app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`)});
