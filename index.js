const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
// adding the library
const expressLayout = require('express-ejs-layouts');

const db = require('./config/mongoose');
// used for session cookies
const session =require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// to store the cookies
const MongoStore = require('connect-mongo')(session);

// to handle the POST requests
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

// to let the routes know that what a layout is
app.use(expressLayout);

// extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//setup our view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    // if the session has not been initialised which means the user has not logged in
    // then in that do not save data in cookies
    saveUninitialized: false,
    // when the user has logged in and we do not what to save the data everytime
    resave: false,
    cookie:{
        maxAge:(1000 * 60 * 100 )
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

// we need to tell app to use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes'));

// listen for connection
app.listen(port,function(err){
    if(err){
        //console.log('Error: ',err);
        //OR
        console .log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});