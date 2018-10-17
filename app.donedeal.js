// SET DEPENDENCIES ------------------------------------------------------------

const Sequelize = require('sequelize');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

require('dotenv').config();

// CONNECT WITH TEMPLATE ENGINE FOLDER -----------------------------------------

app.set('views', './views');
app.set('view engine', 'ejs');

// SET UP BODY PARSER ----------------------------------------------------------

app.use(bodyParser.urlencoded({extended: true}));

// CONNECT WITH PUBLIC FOLDER --------------------------------------------------

app.use(express.static('./public'));

// DATABASE ---------------------------------------------------------

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

//MODELS DEFINITION ------------------------------------------------------------

const Business = sequelize.define('business',{
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  address: {
    type: Sequelize.STRING,
    unique: false
  }
}, {timestamps: false});

const Offer = sequelize.define('offers', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {timestamps: false});

const Time = sequelize.define('time',{
  time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  day: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {timestamps: false});

// TABLES RELATIONSHIP/ASSOCIATION ---------------------------------------------
  Business.hasMany(Offer, { foreignKey: { allowNull: false } });
  Offer.belongsTo(Business, { foreignKey: { allowNull: false } });
  Time.belongsTo(Offer, { foreignKey: { allowNull: false } });

// 01: HOME PAGE----------------------------------------------------------------

app.get('/', (req, res) => {
    res.render('home')
})

// 02: DRINKS PAGE -------------------------------------------------------------

app.get('/drinks', (req, res) => {
  res.render('drinks')
})

// 03: FOOD PAGE ---------------------------------------------------------------

app.get('/food', (req, res) => {
  res.render('food')
})

// 04: ABOUT US ----------------------------------------------------------------

 app.get('/aboutus', (req, res) => {
  res.render('aboutus')
})

// 05: CONTACT -----------------------------------------------------------------

app.get('/contact', (req, res) => {
  res.render('contact')
})

// 06: BUSINESS MODEL ----------------------------------------------------------

app.get('/businessmodel', (req, res) => {
    res.render('businessmodel')
})

// START SERVER AND SEQUELIZE ------------------------------------------------------

sequelize.sync({force: true})
.then(() => {
  const server = app.listen(3000, () => {
    console.log('App is running on port 3000');
  });
});