let express = require('express');
let app = express();

app.use(express.static(__dirname + '/Public'));


let expressHbs = require('express-handlebars');
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Use body-parser
// user cookie-parser
// use session
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    cookie: { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 },
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))
app.use((req, res, next) => {

    res.locals.Keeplogin = req.session.user ? true : false;

    next();
});
//-------------------------------------
app.use('/', require('./routes/homeRoutes'));
app.use('/login', require('./routes/loginRoutes'));


app.set('port', process.env.PORT || 5000)
app.listen(app.get('port'), () => {
    console.log(`Server is running port ${app.get('port')}`)
})