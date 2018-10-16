// SET DEPENDENCIES ------------------------------------------------------------

const Sequelize = require('sequelize');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express();

// require('dotenv').config();

// CONNECT WITH TEMPLATE ENGINE FOLDER -----------------------------------------

app.set('views', './views');
app.set('view engine', 'ejs');

// DATABASE ---------------------------------------------------------

const sequelize = new Sequelize('happyhour', 'postgres', 'p0stgr3SQL', {
    host: 'localhost',
    dialect: 'postgres'
});


// SET UP SESSION --------------------------------------------------------------

app.use(session({
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000
  }),
  secret: "any string",
  saveUninitialized: true,
  resave: false
}))

// SET UP BODY PARSER ----------------------------------------------------------

app.use(bodyParser.urlencoded({extended: true}));

// CONNECT WITH PUBLIC FOLDER --------------------------------------------------

app.use(express.static('./public'));


//MODELS DEFINITION ------------------------------------------------------------

const Business = sequelize.define('businesses',{
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  address: {
    type: Sequelize.STRING,
    unique: false
  },
  email: {
    type: Sequelize.STRING,
    unique: false
  },
  password: {
    type: Sequelize.STRING,
    unique: false
  },
},   {
     timestamps: false
   })

const Offer = sequelize.define('offers', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
    timestamps: false
  })

const Time = sequelize.define('times', {
  time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  day: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
    timestamps: false
  })

// TABLES RELATIONSHIP/ASSOCIATION ---------------------------------------------
  Business.hasMany(Offer, { foreignKey: { allowNull: false } });
  Offer.belongsTo(Business, { foreignKey: { allowNull: false } });

// 01: HOME PAGE----------------------------------------------------------------

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/login', (req, res) => {
  var business = req.session.business;
    res.render('login')
})

// 02: CHECKING FOR MATCHING USER INPUT DATA------------------------------------

app.post('/login', function (req, res) {

    let username = req.body.username;
    let password = req.body.password;

    if(username.length === 0) {
      res.redirect('/?message=' + encodeURIComponent("Please fill in your correct username."));
      return;
    }

    if(password.length === 0) {
      res.redirect('/?message=' + encodeURIComponent("Please fill in your password."));
      return;
    }

    Business.findOne({
  		where: {
  			username: username
  		}
  	}).then(function(business){

  			if(business!== null && password === business.password){
          console.log("business info" + JSON.stringify(business.dataValues));
          req.session.business = business;
  				res.redirect('/profile');
  			} else {
  				res.redirect('/?message=' + encodeURIComponent('Invalid email or password.'));
  			}
  	});
  });

//  LOG OUT ---------------------------------------------------------------

app.get('/logout', (req,res)=>{
  req.session.destroy(function(error) {
    if(error) {
      throw error;
    }
    res.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
  })
})

// LOGIN

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

// 07: SIGN UP----------------------------------------------------------------

app.get('/signup', (req, res) => {
  res.render('signup');
})

app.post('/signup', (req,res) => {

  let inputusername = req.body.username
  let inputname = req.body.name
  let inputaddress = req.body.address
  let inputemail = req.body.email
  let inputpassword = req.body.password
  let inputconfirmpassword = req.body.confirmpassword

  if (inputpassword !== inputconfirmpassword) {
    res.send('Your password does not match');
  } else {
  Business.create({
    username: inputusername,
    name: inputname,
    address: inputaddress,
    email: inputemail,
    password: inputpassword,
  })

  .then((business) => {
        req.session.business = business;
        res.redirect('/profile');
      });
    }
})

// 08: BUSINESS PROFILE ---------------------------------------------------------------

app.get('/profile', (req, res)=> {

  const business = req.session.business;
  if(business != null){
  res.render('profile', {business: business})             // message: message
}else{
    res.redirect('/')
}
})

// 09: BUSINESS CREATE OFFER ---------------------------------------------------



// ENABLE SEQUELIZE.SYNC ------------------------------------------------------

sequelize.sync({force: false})

// CONFIGURE PORT - ------------------------------------------------------------

 app.listen(3018, () => {
     console.log('App is running on port 3018');
 })

// START SERVER AND SEQUELIZE ------------------------------------------------------

// sequelize.sync({force: false})
// .then(() => {
//   const server = app.listen(3000, () => {
//     console.log('App is running on port 3000');
//   });
// });
