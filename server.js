var express = require('express');
var app = express();

app.use(express.static('public'))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

var dotenv = require('dotenv');
dotenv.config();

var session = require('express-session');
var FileStore = require('session-file-store')(session);


app.use(session({ secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore,
    cookie: { maxAge: 3600000,secure: false, httpOnly: true }
  })
);

// Middleware pentru setarea variabilei globale user
app.use((req, res, next) => {
  if (req.session.loggedInUser) {
    res.locals.user = req.session.loggedInUser.type;
  } else {
    res.locals.user = null;
  }
  next();
});

const bcrypt = require('bcryptjs');

app.set('view engine', 'ejs');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//models------------------------------------------------------------------------------------------------------
const sequelize = require('./config/database');
const User = require('./models/user');
const Product = require('./models/product');
const userBoughtProduct = require('./models/userBoughtProduct');

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
});

const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

const vendorRoutes = require('./routes/vendor');
app.use('/vendor', vendorRoutes);

const clientRoutes = require('./routes/client');
app.use('/account',clientRoutes);

const generalRoutes = require('./routes/general');
app.use('/', generalRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


