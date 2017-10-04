const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, "static")));
app.use(session({secret: "somestring"}));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) =>{
    res.render("index");
})
app.get("/user", (req, res) =>{
    data = {
        name: req.session.name,
        location: req.session.location,
        language: req.session.language,
        comment: req.session.comment
    }
    res.render("user", data)
})
app.post("/create", (req, res) =>{
    req.session.name = req.body.name;
    req.session.location = req.body.location;
    req.session.language = req.body.language;
    req.session.comment = req.body.comment;


    res.redirect("user");
})
app.listen(8000, () =>{
    console.log("listening on port 8000");
})