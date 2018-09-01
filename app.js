// console.log('Start articles-products-and-express session')
const express = require('express');
// console.log('required express');
const exphbs = require('express-handlebars');
// console.log('required express-handlebars');
const bp = require('body-parser');
// console.log('required body-parser');
const Products = require('./db/product.js');
// console.log('required ./db/product.js');
const Products_Inv = new Products();
// console.log('Products_Inv =', Products_Inv);
const Articles = require('./db/articles.js');
const Articles_Inv = new Articles();

const app = express();
// console.log('assigned express() to app');

app.use(express.static('public'));
// console.log('using all of public folder');

app.use(bp.urlencoded({ extended: true }));
// console.log('using bp.urlencoded')

app.use((req, res, next) => {
  console.log(`\n${req.method} request at: ${req.url}`);
  next();
});

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
// console.log('app.engine started')
app.set('view engine', '.hbs');
console.log('app.set started')

//render all items
app.get('/', (req, res) => {
  // console.log('\nstarted get /');
  const proditem = Products_Inv.all();
  console.log('proditem =', proditem);
  const artitem = Articles_Inv.all();
  // console.log('artitem =', artitem);
  res.render('home', {proditem, artitem});
  // res.render('home', {articles});
  // console.log('ended get /');
});


//render out the form
app.get('/products/new', (req, res) => {
  console.log('\nstarted get /products/new');
  res.render('products-form');
  console.log('ended get /products/new');
});

app.get('/articles/new', (req, res) => {
  res.render('article-form');
});

//rendor out detail
app.get('/products/:id', (req, res) => {
  console.log('\nstarted get /products/:id');
  const { id } = req.params;
  console.log('id', id);
  console.log('req.params', req.params);
  const product = Products_Inv.getItemById(id);
  console.log('product', product);
  res.render('product-detail', product);
  console.log('ended get /products/:id');
});

app.get('/articles/:id', (req, res) => {
  const{ id } = req.params;
  const article = Articles_Inv.getItemById(id);
  res.render('article-detail', article);
});

// add item
app.post('/products/new', (req, res) => {
  console.log('\nstarted post /products/new');
  console.log('req.body', req.body);
  const product = req.body;
  Products_Inv.add(product);
  console.log('Products_Inv =', Products_Inv);
  console.log('redirecting to "/"');
  res.redirect('/');
  console.log('ended post /products/new');
});

app.post('/articles/new', (req, res) => {
  const article = req.body;
  Articles_Inv.add(article);
  res.redirect('/');
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/404.html')
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`)});
