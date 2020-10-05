module.exports = app => {
    const users = require("../controllers/user_controller.js");

    app.post("/users", users.create);

    app.get("/users", users.findAll);

    app.get("/users/:userId", users.findById);

    app.put("/users/:userId", users.update);

    app.delete("/users/:userId", users.delete);
}
