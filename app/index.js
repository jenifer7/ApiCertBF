const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');

const connetion = require('./connect');


//Inicializar express
const app = express();


//Configuracion del puerto
app.set('port', process.env.PORT || 3000);


//Configuracion del motor de plantillas handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs',
	helpers: require('./config/handlebars')
}));
app.set('view engine', '.hbs');


//Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


//Variables globales
app.use((req, res, next) => {
	app.locals.user = req.user;
	next();
});


//Rutas
app.use(require('./routes/index'));
app.use('/petto', require('./routes/web'));
require('./routes/route')(app);


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/auth/signin.html'));
});

app.get('/signup', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/auth/signup.html'));
});

app.post('/auth', function (request, response) {
	const username = request.body.username;
	const password = request.body.password;
	if (username && password) {
		connetion.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function (request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});


app.get('/logout', function (req, res) {
	req.session.destroy();
	res.send("logout success!");
});



app.use(express.static(path.join(__dirname,'/public')));



//Starting server and app
app.listen(app.get('port'), () => {
	console.log("Server on port ", app.get('port'));
});
