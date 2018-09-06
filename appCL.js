console.log('Start app.js articles-products-and-express session')

console.log('\n// runs through required installs') 

const express = require('express');
console.log('required express');
const exphbs = require('express-handlebars');
console.log('required express-handlebars');
const bp = require('body-parser');
console.log('required body-parser');
const methodOverride = require('method-override');

console.log('\n// runs through required folders')

const Products = require('./db/product.js');
console.log('required ./db/product.js');

// add product in products.js
const Products_Inv = new Products();
// console.log('Products_Inv =\n', Products_Inv);

const Articles = require('./db/articles.js');
console.log('required ./db/articles.js');

// add article in articles.js 
const Articles_Inv = new Articles();

//Use app for all express methods
const app = express();
console.log('assigned express() to app');

//middleware
app.use(express.static('public'));
console.log('using all of public folder');

app.use(bp.urlencoded({ extended: true }));
console.log('using bp.urlencoded');

app.use(methodOverride('_method'));
console.log('using methodOverride');

app.use((req, res, next) => {
  console.log(`\n${req.method} request at: ${req.url}`);
  next();
});

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
console.log('app.engine started')
app.set('view engine', '.hbs');
console.log('app.set started')

//ROUTES below will not be used until called upon

//RENDER ALL items with GET
app.get('/', (req, res) => {
  console.log('\nstarted get /');
  // const allProducts = Products_Inv.all();
  // console.log('allProducts =', allProducts);
  // const allArticles = Articles_Inv.all();
  // console.log('allArticles =', allArticles);
  console.log('^ res.render home.hbs allProducts, allArticles')
  // res.render('home', {allProducts, allArticles});
  res.render('home');
  console.log('ended get /');
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
  console.log('\nstarted get /products/new');
  res.render('products-form');
  console.log('ended get /products/new');
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
  console.log('\nstarted get /products/:id');
  const { id } = req.params;
  console.log('id', id);
  console.log('req.params', req.params);
  const product = Products_Inv.getItemById(id);
  console.log('addProduct =\n', product);
  // const deleteProduct = Products_Inv.deleteProductById(id);
  // console.log('deleteProduct', deleteProduct);
  res.render('product-detail',  product);
  console.log('ended get /products/:id');
});

app.get('/articles/:id', (req, res) => {
  const{ id } = req.params;
  const article = Articles_Inv.getItemById(id);
  res.render('article-detail', article);
});

// app.get('/products/:id/removeProduct', (req, res) => {
//   console.log('\n started get /products/:id/removeProduct');
//   console.log('req.params', req.params);
//   const { id } = req.params;
//   console.log('id', id);
//   const deleteProduct = Products_Inv.deleteProductById(id);
//   console.log('deleteProduct =\n', deleteProduct);
//   res.render('removeProduct', { deleteProduct });
//   console.log('ended get /products/:id/removeProduct');
// })

// app.get('/articles/:id/removeArticle', (req, res) => {
//   const { id } = req.params;
//   const deleteArticle = Articles_Inv.deleteArticleById(id);
//   res.render('removeArticle', { deleteArticle });
// })


//ADD item with POST
app.post('/products/new', (req, res) => {
  console.log('\nstarted post /products/new');
  console.log('post req.body =\n', req.body);
  const product = req.body;
  Products_Inv.add(product);
  console.log('Products_Inv =\n', Products_Inv);
  console.log('^ redirecting to app.get "/"');
  res.redirect('/productsHome/');
  console.log('ended post /products/new');
});

app.post('/articles/new', (req, res) => {
  const article = req.body;
  Articles_Inv.add(article);
  res.redirect('/articlesHome');
});

//REMOVE item with DELETE
app.delete('/products/:id', (req, res) => {
  console.log('delete req.params =', req.params);
  const { id } = req.params;
  let deletedProduct = Products_Inv.deleteProductById(id);
  console.log('deletedProduct =', deletedProduct);
  console.log('Products_Inv.all() =', Products_Inv.all());
  res.redirect('/productsHome');
})

app.delete('/articles/:id', (req, res) => {
  console.log('delete req.params =', req.params);
  const { id } = req.params;
  let deletedArticle = Articles_Inv.deleteArticleById(id);
  console.log('deletedArticle =', deletedArticle);
  console.log('Articles_Inv.all() =', Articles_Inv.all());
  res.redirect('/articlesHome');
})

//EDIT item with PUT
app.put('/products/:id', (req, res) => {
  console.log('req.body =', req.body);
  console.log('req.params =', req.params);
  const { id } = req.params;
  let productToEdit = Products_Inv.getItemById(id);
  console.log('productToEdit =\n', productToEdit);
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
