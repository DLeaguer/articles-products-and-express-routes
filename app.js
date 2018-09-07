const express = require('express');
const exphbs = require('express-handlebars');
const bp = require('body-parser');
const methodOverride = require('method-override');

//Use db folder
//Gets add() from .js
const Products = require('./db/product.js');
const Products_Inv = new Products(); // products.js add()
const Articles = require('./db/articles.js');
const Articles_Inv = new Articles(); // articles.js add()

//Use routes folder
const productRoutes = require('./routes/product.js');
const articleRoutes = require('./routes/articles.js')

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
  res.render('home');
});

app.use('/', productRoutes);
app.use('/', articleRoutes);

//ERROR page
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/404.html')
});  

//SERVE PORT with LISTEN
app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`)});
