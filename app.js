var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://daeperdomocr-olympus-6506740/test', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/user')(app, mongoose);
var UserCtrl = require('./controllers/users');

// Default Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Olympus gym system management!");
});
app.use(router);

// API routes
var users = express.Router();

users.route('/users')
  .get(UserCtrl.findAllUsers)
  .post(UserCtrl.addUser);

users.route('/users/:id')
  .get(UserCtrl.findById)
  .put(UserCtrl.updateUser)
  .delete(UserCtrl.deleteUser);

//
app.use('/api', users);

// Start server
app.listen(process.env.PORT);
console.log('Server running at ' + process.env.IP + ':' + process.env.PORT);
module.exports = app;