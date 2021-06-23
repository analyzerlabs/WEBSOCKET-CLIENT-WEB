const express   = require('express');
const path  = require('path');
const app = express();
const bodyParser= require('body-parser');

const routes = require('./routes/index');
// settings de express
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views')); // define donde esta la carpeta views
app.set('views engine','ejs');

// middlewares
app.use((req, res, next)=>{
    console.log(`${req.url} - ${req.method}`);
    next();
});

app.use(bodyParser.json()); // para entender la info del navegador
app.use(bodyParser.urlencoded({extended : false}));



// routes
app.use(routes);


// static files
app.use(express.static(path.join(__dirname,'public')));


// errors

// init Server
app.listen(app.get('port'),()=> {
    console.log('server on port '+ app.get('port'))
});
