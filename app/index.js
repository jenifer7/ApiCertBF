const express = require('express');
const morgan = require('morgan');
const hbsplant = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

//Inicializar express
const app = express();



//Configuracion del puerto
app.set('port', process.env.PORT || 3000);



//Configuracion del motor de plantillas handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbsplant({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs',
    helpers: require('./config/handlebars')
}));
app.set('view engine', '.hbs');



//Middleware
app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({ extended:false }));
// app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(express.json());




//Variables globales
//Variables que se utilizaran en otros archivos
app.use((req, res, next) => {

    next();
});




//Rutas
app.use(require("./routes/authentication"));
app.use('/petto', require("./routes/rutas"));
require("./routes/route")(app);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to PETTO Aplication" });
});



//Starting server and app
app.listen(app.get('port'), () => {
    console.log("Server on port ", app.get('port'));
});