// SET DEPENDENCIES ------------------------------------------------------------
const Sequelize = require('sequelize');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

require('dotenv').config();

// CONNECT WITH TEMPLATE ENGINE FOLDER -----------------------------------------
app.set('views', './public/views');
app.set('view engine', 'ejs');

// DATABASE ---------------------------------------------------------
const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
});

app.use(cookieParser())

app.use(session({
  secret: 'keyboard cat',
  store: new SequelizeStore({
    db: sequelize
  }),
  resave: false, // we support the touch method so per the express-session docs this should be set to false
  proxy: true // if you do SSL outside of node.
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
  const {business} = req.session;
  console.log(`req.session.business in get /    : ${business}`);
  res.render('home', {business: business})
})

// LOGIN AND CHECKING FOR MATCHING USER INPUT DATA------------------------------
app.get('/login', (req, res) => {
  const {business} = req.session;
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
    console.error(`business findOne error app.post('login'): ${error}`);
  });
});

// LOG OUT ---------------------------------------------------------------------
app.get('/logout', (req,res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("logout", err)
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
  })
  .catch((error) => {
    console.error(`signup create error: ${error}`);
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
  const {business} = req.session;
  let searched_name = req.body.name;
  let b_found = [];

  Business.findAll()
  .then( business => {
    for (let i = 0; i < business.length; i++) {
      if (searched_name.toLowerCase() == business[i].name.toLowerCase()) {
        b_found.push(business[i]);
      }
    }
  })
  .then(() => {
    Offer.findAll({
      where: {
        businessId: business.id
      },
      include: [{model: Time}]
    })
  })
  .then(offer => {
    res.render('results', {
      b_found: b_found,
      business:business,
      offer:offer
    })
  })
  .catch((error) => {
    console.error(`business findAll error app.post('search'): ${error}`);
  });
});

// 06: CREATE AN OFFER ---------------------------------------------------------
app.get('/createoffer', (req,res)=> {
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
  .catch((error) => {
    console.error(`createoffer findOne error: ${error}`);
  });
})

// BUSINESS UPDATE OFFERS ------------------------------------------------------

// BUSINESS DISPLAY ALL OFFERS -------------------------------------------------
app.get('/offers', (req, res)=>{
  const {business} = req.session;
  Offer.findAll({
    include:[{
      model: Business
    },{
      model: Time
      }]
  })
  .then((alloffers)=>{
    res.render('offers', {offers: alloffers, business:business})
  })
  .catch((error) => {
    console.error(`offers findAll error: ${error}`);
  });
})

// BUSINESS ALL SPECIFIC BUSINESS OFFERS ---------------------------------------
app.get('/myoffers', (req, res)=>{
  const {business} = req.session;
  if (business == null) {
    res.redirect('/home')
  } else {
    let businessId = business.id
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
    .catch((error) => {
      console.error(`myoffers findAll error: ${error}`);
    });
  }
})

// HOW IT WORKS PAGE ----------------------------------------------------------
app.get('/howitworks', (req, res) => {
  const {business} = req.session;
  res.render('howitworks', {business: business})
})

// DEAL SEARCH PAGE ----------------------------------------------------------
app.get('/dealsearch', (req, res) => {
  const {business} = req.session;
  res.render('dealsearch', {business:business})
})

app.post('/dealsearch', (req, res) => {
  const {business} = req.session;
  const {time_day, time_time} = req.body;
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
    res.render('dealresult', {offers: offers, business:business})
  })
  .catch((error) => {
    console.error(`dealsearch findAll error: ${error}`);
  });
})

// DISPLAY ALL OFFERS ----------------------------------------------------------
app.get('/dealresult', (req, res)=>{
  const {business} = req.session;
  Offer.findAll({include: [{model: Business}, {model: Time}]})
  .then(offers=>{
    res.render('dealresult', {offers: offers, business: business})
  })
  .catch((error) => {
    console.error(`dealresult findAll error: ${error}`);
  });
})

// ABOUT US --------------------------------------------------------------------
 app.get('/aboutus', (req, res) => {
  const {business} = req.session;
  res.render('aboutus', {business:business})
})

// CONTACT ---------------------------------------------------------------------
app.get('/contact', (req, res) => {
  res.render('contact')
})

// TEAM ---------------------------------------------------------------------
app.get('/team', (req, res) => {
  res.render('team')
})

// BUSINESS MODEL --------------------------------------------------------------
app.get('/businessmodel', (req, res) => {
  const {business} = req.session;
  res.render('businessmodel', {business:business})
})

// START SERVER AND SEQUELIZE ------------------------------------------------------
sequelize.sync({force: true})
.then(() => {
  let sql_time = "insert into times (id, time, day) values (1, '00:00-01:00', 'Monday'),(2, '01:00-02:00', 'Monday'),(3, '02:00-03:00', 'Monday'),(4, '03:00-04:00', 'Monday'),(5, '04:00-05:00', 'Monday'),(6, '05:00-06:00', 'Monday'),(7, '06:00-07:00', 'Monday'),(8, '07:00-08:00', 'Monday'),(9, '08:00-09:00', 'Monday'),(10, '09:00-10:00', 'Monday'),(11, '10:00-11:00', 'Monday'),(12, '11:00-12:00', 'Monday'),(13, '12:00-13:00', 'Monday'),(14, '13:00-14:00', 'Monday'),(15, '14:00-15:00', 'Monday'),(16, '15:00-16:00', 'Monday'),(17, '16:00-17:00', 'Monday'),(18, '17:00-18:00', 'Monday'),(19, '18:00-19:00', 'Monday'),(20, '19:00-20:00', 'Monday'),(21, '20:00-21:00', 'Monday'),(22, '21:00-22:00', 'Monday'),(23, '22:00-23:00', 'Monday'),(24, '23:00-00:00', 'Monday'),(25, '00:00-01:00', 'Tuesday'),(26, '01:00-02:00', 'Tuesday'),(27, '02:00-03:00', 'Tuesday'),(28, '03:00-04:00', 'Tuesday'),(29, '04:00-05:00', 'Tuesday'),(30, '05:00-06:00', 'Tuesday'),(31, '06:00-07:00', 'Tuesday'),(32, '07:00-08:00', 'Tuesday'),(33, '08:00-09:00', 'Tuesday'),(34, '09:00-10:00', 'Tuesday'),(35, '10:00-11:00', 'Tuesday'),(36, '11:00-12:00', 'Tuesday'),(37, '12:00-13:00', 'Tuesday'),(38, '13:00-14:00', 'Tuesday'),(39, '14:00-15:00', 'Tuesday'),(40, '15:00-16:00', 'Tuesday'),(41, '16:00-17:00', 'Tuesday'),(42, '17:00-18:00', 'Tuesday'),(43, '18:00-19:00', 'Tuesday'),(44, '19:00-20:00', 'Tuesday'),(45, '20:00-21:00', 'Tuesday'),(46, '21:00-22:00', 'Tuesday'),(47, '22:00-23:00', 'Tuesday'),(48, '23:00-00:00', 'Tuesday'),(49, '00:00-01:00', 'Wednesday'),(50, '01:00-02:00', 'Wednesday'),(51, '02:00-03:00', 'Wednesday'),(52, '03:00-04:00', 'Wednesday'),(53, '04:00-05:00', 'Wednesday'),(54, '05:00-06:00', 'Wednesday'),(55, '06:00-07:00', 'Wednesday'),(56, '07:00-08:00', 'Wednesday'),(57, '08:00-09:00', 'Wednesday'),(58, '09:00-10:00', 'Wednesday'),(59, '10:00-11:00', 'Wednesday'),(60, '11:00-12:00', 'Wednesday'),(61, '12:00-13:00', 'Wednesday'),(62, '13:00-14:00', 'Wednesday'),(63, '14:00-15:00', 'Wednesday'),(64, '15:00-16:00', 'Wednesday'),(65, '16:00-17:00', 'Wednesday'),(66, '17:00-18:00', 'Wednesday'),(67, '18:00-19:00', 'Wednesday'),(68, '19:00-20:00', 'Wednesday'),(69, '20:00-21:00', 'Wednesday'),(70, '21:00-22:00', 'Wednesday'),(71, '22:00-23:00', 'Wednesday'),(72, '23:00-00:00', 'Wednesday'),(73, '00:00-01:00', 'Thursday'),(74, '01:00-02:00', 'Thursday'),(75, '02:00-03:00', 'Thursday'),(76, '03:00-04:00', 'Thursday'),(77, '04:00-05:00', 'Thursday'),(78, '05:00-06:00', 'Thursday'),(79, '06:00-07:00', 'Thursday'),(80, '07:00-08:00', 'Thursday'),(81, '08:00-09:00', 'Thursday'),(82, '09:00-10:00', 'Thursday'),(83, '10:00-11:00', 'Thursday'),(84, '11:00-12:00', 'Thursday'),(85, '12:00-13:00', 'Thursday'),(86, '13:00-14:00', 'Thursday'),(87, '14:00-15:00', 'Thursday'),(88, '15:00-16:00', 'Thursday'),(89, '16:00-17:00', 'Thursday'),(90, '17:00-18:00', 'Thursday'),(91, '18:00-19:00', 'Thursday'),(92, '19:00-20:00', 'Thursday'),(93, '20:00-21:00', 'Thursday'),(94, '21:00-22:00', 'Thursday'),(95,'22:00-23:00', 'Thursday'),(96, '23:00-00:00', 'Thursday'),(97, '00:00-01:00', 'Friday'),(98, '01:00-02:00', 'Friday'),(99, '02:00-03:00', 'Friday'),(100, '03:00-04:00', 'Friday'),(101, '04:00-05:00', 'Friday'),(102, '05:00-06:00', 'Friday'),(103, '06:00-07:00', 'Friday'),(104, '07:00-08:00', 'Friday'),(105, '08:00-09:00', 'Friday'),(106, '09:00-10:00', 'Friday'),(107, '10:00-11:00', 'Friday'),(108, '11:00-12:00', 'Friday'),(109, '12:00-13:00', 'Friday'),(110, '13:00-14:00', 'Friday'),(111, '14:00-15:00', 'Friday'),(112, '15:00-16:00', 'Friday'),(113, '16:00-17:00', 'Friday'),(114, '17:00-18:00', 'Friday'),(115, '18:00-19:00', 'Friday'),(116, '19:00-20:00', 'Friday'),(117, '20:00-21:00', 'Friday'),(118, '21:00-22:00', 'Friday'),(119, '22:00-23:00', 'Friday'),(120, '23:00-00:00', 'Friday'),(121, '00:00-01:00', 'Saturday'),(122, '01:00-02:00', 'Saturday'),(123, '02:00-03:00', 'Saturday'),(124, '03:00-04:00', 'Saturday'),(125, '04:00-05:00', 'Saturday'),(126, '05:00-06:00', 'Saturday'),(127, '06:00-07:00', 'Saturday'),(128, '07:00-08:00', 'Saturday'),(129, '08:00-09:00', 'Saturday'),(130, '09:00-10:00', 'Saturday'),(131, '10:00-11:00', 'Saturday'),(132, '11:00-12:00', 'Saturday'),(133, '12:00-13:00', 'Saturday'),(134, '13:00-14:00', 'Saturday'),(135, '14:00-15:00', 'Saturday'),(136, '15:00-16:00', 'Saturday'),(137, '16:00-17:00', 'Saturday'),(138, '17:00-18:00', 'Saturday'),(139, '18:00-19:00', 'Saturday'),(140, '19:00-20:00', 'Saturday'),(141, '20:00-21:00', 'Saturday'),(142, '21:00-22:00', 'Saturday'),(143, '22:00-23:00', 'Saturday'),(144, '23:00-00:00', 'Saturday'),(145, '00:00-01:00', 'Sunday'),(146, '01:00-02:00', 'Sunday'),(147, '02:00-03:00', 'Sunday'),(148, '03:00-04:00', 'Sunday'),(149, '04:00-05:00', 'Sunday'),(150, '05:00-06:00', 'Sunday'),(151, '06:00-07:00', 'Sunday'),(152, '07:00-08:00', 'Sunday'),(153, '08:00-09:00', 'Sunday'),(154, '09:00-10:00', 'Sunday'),(155, '10:00-11:00', 'Sunday'),(156, '11:00-12:00', 'Sunday'),(157, '12:00-13:00', 'Sunday'),(158, '13:00-14:00', 'Sunday'),(159, '14:00-15:00', 'Sunday'),(160, '15:00-16:00', 'Sunday'),(161, '16:00-17:00', 'Sunday'),(162, '17:00-18:00', 'Sunday'),(163, '18:00-19:00', 'Sunday'),(164, '19:00-20:00', 'Sunday'),(165, '20:00-21:00', 'Sunday'),(166, '21:00-22:00', 'Sunday'),(167, '22:00-23:00', 'Sunday'),(168, '23:00-00:00', 'Sunday');";
  let sql_business = "insert into businesses (id, name, address, email, password) values (1, 'Cafe Mokum A2', 'Leidseplein 18', 'cafemokum@gmail.com', 'cafemokum'),(2, 'Cafe De Gieter', 'Korte Leidsedwarsstraat 179', 'cafedegieter@gmail.com', 'cafedegieter'),(3, 'Kopstootbar', 'Marnixstraat 429', 'kopstootbar@gmail.com', 'kopstootbar'),(4, 'De Zotte', 'Raamstraat 29', 'dezotte@gmail.com', 'dezotte'),(5, 'Cafe Bubbels', 'Lange Leidsedwarsstraat 90-92', 'cafebubbels@gmail.com', 'cafebubbels'),(6, 'Pianobar Maxim', 'Leidsekruisstraat 33', 'pianobarmaxim@gmail.com', 'pianobarmaxim');";
  
  sequelize.query(sql_time, (err, result) => {
    if (err) throw err;
  })
  // sequelize.query(sql_business, (err, result) => {
  //   if (err) throw err;
  // })
  const server = app.listen(process.env.PORT, () => {
    console.log('App is running on port '+ process.env.PORT);
  })
})
