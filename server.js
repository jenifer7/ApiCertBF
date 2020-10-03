const express = require('express');
const bodyPaser = require('body-parser');

const app = express();

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "PETTO Aplication" });
});

app.listen(3000, () => {
    console.log("Servidor en el puerto 3000");
});