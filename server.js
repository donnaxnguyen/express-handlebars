var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3306;
var app = express();

var burgerController = require("./controllers/burgers_controller.js");
var burger = require("./models/burger.js");



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));


var exphbs = require("express-handlebars");


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
    burger.selectAll(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });


app.use("/api/burgers", burgerController);

app.listen(PORT);