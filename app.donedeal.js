// SET DEPENDENCIES ------------------------------------------------------------
const Sequelize = require('sequelize');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

require('dotenv').config();

// CONNECT WITH TEMPLATE ENGINE FOLDER -----------------------------------------
app.set('views', './public/views');
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
    allowNull: false
  },
}, {
   timestamps: false
 });

// TABLES RELATIONSHIP/ASSOCIATION ---------------------------------------------
Business.hasMany(Offer, { foreignKey: { allowNull: false } });
Offer.belongsTo(Business, { foreignKey: { allowNull: false } });

Time.hasMany(Offer, { foreignKey: { allowNull: false } });
Offer.belongsTo(Time, { foreignKey: { allowNull: false } });

// HOME PAGE -------------------------------------------------------------------
app.get('/', (req, res) => {
  res.render('home')
})

// LOGIN AND CHECKING FOR MATCHING USER INPUT DATA------------------------------
app.get('/login', (req, res) => {
  let business = req.session.business;
  res.render('login')
})

app.post('/login', (req, res) => {
  const {email, password} = req.body;
  if(email.length === 0) {
    res.redirect('/?message=' + encodeURIComponent("Please fill in your correct email."));
    return;
  }
  if(password.length === 0) {
    res.redirect('/?message=' + encodeURIComponent("Please fill in your password."));
    return;
  }
  Business.findOne({
		where: {
			email: email
		}
	})
  .then((business) => {
    if(business !== undefined ) {
      let hash = business.password;
      bcrypt.compare(password, hash,(err, result) => {
        req.session.business = business;
        res.redirect('/profile');
      });
    } else {
      res.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
    }
  })
  .catch((error) => {
    console.error(error);
  });
});

// LOG OUT ---------------------------------------------------------------------
app.get('/logout', (req,res) => {
  req.session.destroy((err) => {
    if (err) {
      throw err
    }
    res.redirect('/?message=' + encodeURIComponent("logged-out"));
  })
});

// SIGN UP ---------------------------------------------------------------------
app.get('/signup', (req, res) => {
  res.render('signup');
})

// SIGN UP POST
app.post('/signup', (req,res) => {
  const {name, address, email, password} = req.body;
  Business.create({
    name: name,
    address: address,
    email: email,
    password: password,
  })
  .then((business) => {
    req.session.business = business;
    res.redirect('/profile');
  });
  Business.beforeCreate((business, options) => {
  return cryptPassword(business.password)
    .then(success => {
      business.password = success;
    })
    .catch(err => {
      if (err) console.log(err);
    });
  });
  function cryptPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        // Encrypt password using bycrpt module
        if (err) return reject(err);
        bcrypt.hash(password, salt,(err, hash) => {
          if (err) return reject(err);
          return resolve(hash);
        });
      });
    });
  }
});

// BUSINESS PROFILE ------------------------------------------------------------
app.get('/profile', (req, res)=> {
  const {business} = req.session;
  if(business === undefined){
    res.redirect('/?message=' + encodeURIComponent("Please-log-in-to-view-your-profile"));
  } else {
    res.render('profile', {
      business: business
    });
  }
});

// SEARCH ----------------------------------------------------------------------
app.post('/search' , (req, res) => {
  let searched_name = req.body.name;
  let b_found = [];

  Business.findAll()
  .then( business => {
    for (var i = 0; i < business.length; i++) {
      let name = business[i].name.toLowerCase();
      searched_name.toLowerCase();
      if (searched_name === business[i].name) {
        b_found.push(business[i].name);
      }
    }
    res.render('results', {
      b_found: b_found
    });
  })
});

// 06: CREATE AN OFFER ---------------------------------------------------------
app.get('/createoffer', (req,res)=>{
  res.render('createoffer')
})

// BUSINESS CREATE OFFER -------------------------------------------------------
app.post('/createoffer', (req, res) => {
  const {offer_content, time_time, time_day} = req.body;
  let business = req.session.business;
  Time.findOne({
    where: {
      time: time_time,
      day: time_day,
    }
  })
  .then(timeone => {
    Offer.create({
      body: offer_content,
      time: time_time,
      day: time_day,
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

// DISPLAY ALL OFFERS ----------------------------------------------------------
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

// BUSINESS ALL SPECIFIC BUSINESS OFFERS ---------------------------------------

app.get('/myoffers', (req, res)=>{
  let business = req.session.business;
  if (business == null) {
    res.redirect('/home')
  } else {
    var businessId = business.id
    Offer.findAll({
      where: {
        businessId: businessId
      },
      include:[{
        model: Business
      },{
        model: Time
        }]
    })
    .then((myoffers)=>{
      res.render('myoffers', {offers: myoffers})
    })
}
})

// HOW IT WORKS PAGE -----------------------------------------------------------
app.get('/howitworks', (req, res) => {
  res.render('howitworks')
})

// DEAL SEARCH PAGE ------------------------------------------------------------
app.get('/dealsearch', (req, res) => {
  res.render('dealsearch')
})

app.post('/dealsearch', (req, res) => {
  const {time_day, time_time} = req.body;
  console.log(time_day);
  Time.findOne({
    where: {
      day: time_day,
      time: time_time
    }
  })
  .then(time => {
    return Offer.findAll({
      where: {
        timeId: time.id
      },
      include: [{model: Business}, {model: Time}]
    })
  })
  .then((offers)=>{
    res.render('dealresult', {offers: offers})
  })
  .catch((err)=>{
    console.error(err);
  });
})

// DISPLAY ALL OFFERS ----------------------------------------------------------
app.get('/dealresult', (req, res)=>{
  Offer.findAll({include: [{model: Business}, {model: Time}]})
  .then(offers=>{
    res.render('dealresult', {offers: offers})
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

// START SERVER AND SEQUELIZE --------------------------------------------------
sequelize.sync({force: false})
.then(() => {
  const server = app.listen(3000, () => {
    console.log('App is running on port 3000');
  })
})
