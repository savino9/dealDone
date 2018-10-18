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
});

const Offer = sequelize.define('offers', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

const Time = sequelize.define('time', {
  time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  day: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

// TABLES RELATIONSHIP/ASSOCIATION ---------------------------------------------

Business.hasMany(Offer, { foreignKey: { allowNull: false } });
Offer.belongsTo(Business, { foreignKey: { allowNull: false } });

// HOME PAGE -------------------------------------------------------------------

app.get('/', (req, res) => {
  res.render('home')
})

// LOGIN AND CHECKING FOR MATCHING USER INPUT DATA------------------------------

app.get('/login', (req, res) => {
  var business = req.session.business;
    res.render('login')
})

app.post('/login', (req, res) => {
  let name = req.body.name;
  let password = req.body.password;

  if(name.length === 0) {
    res.redirect('/?message=' + encodeURIComponent("Please fill in your correct username."));
    return;
  }

  if(password.length === 0) {
    res.redirect('/?message=' + encodeURIComponent("Please fill in your password."));
    return;
  }

  Business.findOne({
		where: {
			name: name
		}
	})
  .then( business =>{
		if(business !== null && password === business.password){
      console.log("business info" + JSON.stringify(business.dataValues));
      req.session.business = business;
			res.redirect('/profile');
		} else {
			res.redirect('/?message=' + encodeURIComponent('Invalid email or password.'));
		}
	});
});

// LOG OUT ---------------------------------------------------------------------

app.get('/logout', (req,res) => {
  req.session.destroy((error) => {
    if (err) {
      throw err
    }
    res.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
  })
});

// SIGN UP ---------------------------------------------------------------------

app.get('/signup', (req, res) => {
  res.render('signup');
})

app.post('/signup', (req,res) => {
  let inputname = req.body.name
  let inputaddress = req.body.address
  let inputemail = req.body.email
  let inputpassword = req.body.password
  let inputconfirmpassword = req.body.confirmpassword

  if (inputpassword !== inputconfirmpassword) {
    res.send('Your password does not match');
  } else {
  Business.create({
    name: inputname,
    address: inputaddress,
    email: inputemail,
    password: inputpassword,
  }).then((business) => {
    req.session.business = business;
    res.redirect('/profile');
  });
  }
});

// BUSINESS PROFILE ------------------------------------------------------------

app.get('/profile', (req, res)=> {
  const business = req.session.business;
  if(business !== null){
    res.render('profile', {business: business})             // message: message
  } else {
    res.redirect('/')
  }
});

// SEARCH ----------------------------------------------------------------------
app.post('/search' , (req, res) => {
  let searched_name = req.body.name;
  let b_found = [];

  console.log(`request body: ${searched_name}`);

  Business.findAll()
  .then( business => {
    console.log(`business after findAll: ${business}`);
  
    for (var i = 0; i < business.length; i++) {
      let name = business[i].name.toLowerCase();
      searched_name.toLowerCase();
      
      if (searched_name === business[i].name) {
        console.log(`yeeah ${searched_name}, you're in the server!`);
        b_found.push(business[i].name);
        console.log(`new array with results: ${b_found}`);
      } 
    }
    res.render('results' , {
      b_found: b_found  
    });
  })
});

// BUSINESS CREATE OFFER -------------------------------------------------------

// BUSINESS UPDATE OFFERS ------------------------------------------------------

// BUSINESS DISPLAY ALL OFFERS -------------------------------------------------

// DRINKS SEARCH PAGE ----------------------------------------------------------

app.get('/drinks', (req, res) => {
  res.render('drinks')
})

// FOOD SEARCH PAGE ------------------------------------------------------------

app.get('/food', (req, res) => {
  res.render('food')
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
