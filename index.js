const express = require('express');
const app = express();
const port = 8000;
// adding the library
const expressLayout = require('express-ejs-layouts');

const db = require('./config/mongoose');

app.use(express.static('./assets'));

// to let the routes know that what a layout is
app.use(expressLayout);

// extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//use express router
app.use('/',require('./routes'));

//setup our view engine
app.set('view engine','ejs');
app.set('views','./views');

// listen for connection
app.listen(port,function(err){
    if(err){
        //console.log('Error: ',err);
        //OR
        console .log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});