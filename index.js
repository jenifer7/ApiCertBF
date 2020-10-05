const express = require('express');
const bodyPaser = require('body-parser');

const app = express();


//Mid
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({ message: "Welcome to PETTO Aplication" });
});

require("./app/routes/route.js")(app);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log("Servidor iniciado en el puerto ", app.get('port'));
});