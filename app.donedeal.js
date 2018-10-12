// SET DEPENDENCIES ------------------------------------------------------------

const Sequelize = require('sequelize');
const express = require('express');
const ejs = require('ejs');
const app = express();

const bodyParser = require('body-parser');

// CONNECT WITH TEMPLATE ENGINE FOLDER -----------------------------------------

app.set('views', './views');
app.set('view engine', 'ejs');

// CONFIG DEPENDENCIES ---------------------------------------------------------

const sequelize = new Sequelize('donedeal', 'postgres', 'p0stgr3SQL', {
    host: 'localhost',
    dialect: 'postgres'
})

// CONNECT WITH PUBLIC FOLDER --------------------------------------------------

app.use(express.static('./public'));

// SET UP BODY PARSER ----------------------------------------------------------

app.use(bodyParser.urlencoded({extended: true}));

// ROUTING----------------------------------------------------------------------

// CONNECT WITH PUBLIC FOLDER --------------------------------------------------

app.use(express.static('./public'));


//MODELS DEFINITION ------------------------------------------------------------

// const Bar = sequelize.define('users',{
//     username: {
//         type: Sequelize.STRING,
//         unique: true
//     },
//     firstname: {
//         type: Sequelize.STRING,
//         unique: false
//     },
//     lastname: {
//         type: Sequelize.STRING,
//         unique: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         unique: true
//     },
//     password: {
//         type: Sequelize.STRING,
//         unique: false,
//     },
//   },   {
//       timestamps: false
//     })
//
//     const Post = sequelize.define('posts', {
//       username: {
//           type: Sequelize.STRING,
//           allowNull: false
//       },
//         title: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         body: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//     },  {
//        timestamps: false
//      })
//
//     const Comments = sequelize.define('comments', {
//         body: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//     },   {
//         timestamps: false
//       })

// TABLES RELATIONSHIP/ASSOCIATION ---------------------------------------------
    // User.hasMany(Post, { foreignKey: { allowNull: false } });
    // Post.belongsTo(User, { foreignKey: { allowNull: false } });
    // Comments.belongsTo(Post, { foreignKey: { allowNull: false } });
    // Comments.belongsTo(User, { foreignKey: { allowNull: false } });


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




// app.get('/show_all_messages', function(req, res){
//
//     client.query('SELECT * FROM messages', function(err, result) {
//
// 			console.log(err? err.stack : result.rows)
//
//   	var data = result.rows;
//     res.render('show_all_messages', {data: data});
//     //     }
//     });
// });
//
//
// app.post('/', (req, res) => {
//
//   console.log(req.body.firstname);
//   client.query('SELECT * FROM bars')
//
//   fs.readFile('resources/users.json', (err, data) => {
//     if (err) {
//       throw err;
//     }
//     let myUsers = JSON.parse(data);
//     var suggest = {};
//
//     for (let i = 0; i < myUsers.length; i++) {
//       var compfirst = myUsers[i].firstname.toLowerCase();
//       var complast = myUsers[i].lastname.toLowerCase();
//       if (compfirst.includes(req.body.firstname) || complast.includes(req.body.lastname)) {
//         suggest[i] = compfirst + " " + complast;
//       }
//     }
//     res.send(suggest)
//   })
// })
//
// app.post('/matched', (req, res) => {
// let matchedUser = null;
// fs.readFile('resources/users.json', (err, data) => {
//   if (err) {
//     throw err;
//   }
//   let myUsers = JSON.parse(data);
//
//   for (let i = 0; i < myUsers.length; i++) {
//     if (req.body.firstname.toLowerCase() == myUsers[i].firstname.toLowerCase() || req.body.lastname.toLowerCase() == myUsers[i].lastname.toLowerCase()) {
//       matchedUser = myUsers[i];
//       res.render('matched', {
//         match: matchedUser
//       });
//     }
//   }
//   if (matchedUser === null) {
//     res.render('no_match');
//   }
// });
// });

// ENABLE SEQUELIZE.SYNC ------------------------------------------------------

sequelize.sync({force: false})


// CONFIGURE PORT - ------------------------------------------------------------

  app.listen(3017, () => {
      console.log('App is running on port 3017');
  })
