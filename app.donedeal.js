// SET DEPENDENCIES ------------------------------------------------------------

const Sequelize = require('sequelize');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express();

require('dotenv').config();

// CONNECT WITH TEMPLATE ENGINE FOLDER -----------------------------------------

app.set('views', './views');
app.set('view engine', 'ejs');

// DATABASE ---------------------------------------------------------

const sequelize = new Sequelize('donedeal', process.env.POSTGRES_USER, process.env.POSTGRES_USER, {
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

const Business = sequelize.define('business',{
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
    unique: false,
  }
},  {
   timestamps: false
 });

const Offer = sequelize.define('offers', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
},  {
   timestamps: false
 });

const Time = sequelize.define('time', {
  time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  day: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
   timestamps: false
 });

// TABLES RELATIONSHIP/ASSOCIATION ---------------------------------------------
  Business.hasMany(Offer, { foreignKey: { allowNull: false } });
  Offer.belongsTo(Business, { foreignKey: { allowNull: false } });

  Time.hasMany(Offer, { foreignKey: { allowNull: false } });
  Offer.belongsTo(Time, { foreignKey: { allowNull: false } });
  // Offer.hasMany(Time, { foreignKey: { allowNull: false } });

// HOME PAGE -------------------------------------------------------------------

app.get('/', (req, res) => {
    res.render('home')
})

// LOGIN AND CHECKING FOR MATCHING USER INPUT DATA------------------------------

app.get('/login', (req, res) => {
  var business = req.session.business;
    res.render('login')
})

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

// LOG OUT ---------------------------------------------------------------------

app.get('/logout', (req,res)=>{
  req.session.destroy(function(error) {
    if(error) {
      throw error;
    }
    res.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
  })
})

// SIGN UP ---------------------------------------------------------------------

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

// BUSINESS PROFILE ------------------------------------------------------------

app.get('/profile', (req, res)=> {

  const business = req.session.business;
  if(business != null){
  res.render('profile', {business: business})             // message: message
}else{
    res.redirect('/')
}
})

// 06: CREATE AN OFFER ---------------------------------------------------------

app.get('/createoffer', (req,res)=>{
    res.render('createoffer')
})

app.post('/createoffer', (req, res) => {

    var name = req.body.offer_name;
    // var title = req.body.offer_title;
    var body = req.body.offer_content;
    var business = req.session.business;
    // var time = req.session.time;
    var time = req.body.time_time;
    var day = req.body.time_day;

    Time.findOne({
      where: {
        time: time,
        day: day,
      }
    }).then(timeone => {
      Offer.create({
          body: body,
          time: time,
          day: day,
          businessId: business.id,
          timeId: timeone.id
      })
    })
        .then((offer) => {
          console.log(offer)
            res.redirect('/offers')
        })
        .catch((err)=>{
            console.log("ERROR " + err);
        });
})

// BUSINESS CREATE OFFER -------------------------------------------------------

// BUSINESS UPDATE OFFERS ------------------------------------------------------

// BUSINESS DISPLAY ALL OFFERS -------------------------------------------------

app.get('/offers', (req, res)=>{
    Offer.findAll({
      include:[{
        model: Business
      },{
        model: Time
        }]
    })
    .then((alloffers)=>{
      res.render('offers', {offers: alloffers})
    })
})

// DISPLAY ALL OFFERS ----------------------------------------------------------

// HOW IT WORKS PAGE ----------------------------------------------------------

app.get('/howitworks', (req, res) => {
  res.render('howitworks')
})

// DRINKS SEARCH PAGE ----------------------------------------------------------

app.get('/drinks', (req, res) => {
  res.render('drinks')
})

// FOOD SEARCH PAGE ------------------------------------------------------------

app.get('/food', (req, res) => {
  res.render('food')
})

// DEAL SEARCH PAGE ----------------------------------------------------------

app.get('/dealsearch', (req, res) => {
  res.render('dealsearch')
})

app.post('/dealsearch', (req, res) => {

    // var name = req.body.offer_name;
    // var title = req.body.offer_title;
    var body = req.body.offer_content;
    var business = req.session.business;
    // var time = req.session.time;
    var time = req.body.time_time;
    var day = req.body.time_day;

    Time.findAll({
      where: {
        time: time,
        day: day,
      }
    }).then(timeone => {
      Offer.create({
          body: body,
          time: time,
          day: day,
          businessId: business.id,
          timeId: timeone.id
      })
    })
        .then((offer) => {
          console.log(dealresult)
            res.redirect('/dealresult')
        })
        .catch((err)=>{
            console.log("ERROR " + err);
        });
})

// DEAL RESULT PAGE ----------------------------------------------------------

// app.get('/dealresult', (req, res) => {
//   res.render('dealresult')
// })

app.get('/dealresult', (req, res)=>{
    Offer.findAll({
      include:[{
        model: Business
      },{
        model: Time
        }]
    })
    .then((alloffers)=>{
      res.render('dealresult', {offers: alloffers})
    })
})


// ABOUT US --------------------------------------------------------------------

 app.get('/aboutus', (req, res) => {
  res.render('aboutus')
})

// CONTACT ---------------------------------------------------------------------

app.get('/contact', (req, res) => {
  res.render('contact')
})

// BUSINESS MODEL --------------------------------------------------------------

app.get('/businessmodel', (req, res) => {
    res.render('businessmodel')
})

// START SERVER AND SEQUELIZE ------------------------------------------------------

sequelize.sync({force: false})
.then(() => {
  const server = app.listen(3000, () => {
    console.log('App is running on port 3000');
  });
});
