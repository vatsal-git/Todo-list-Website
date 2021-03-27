const express = require('express');
const bodyParser = require('body-parser');
var mainItems = [];
var workItems = [];

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    var today = new Date();
    var options = {
        weekday: "long"
    }
    var list = today.toLocaleDateString("en-US", options);
    res.render('list', { listTitle: list, NewListItems: mainItems });

})

app.post("/", (req, res) => {

    var newItem = req.body.listItem;

    if (req.body.list === "Work") {
        workItems.push(newItem);
        res.redirect("/work");
    } else {
        mainItems.push(newItem);
        res.redirect("/");
    }


})

app.get("/work", (req, res) => {
    var today = new Date();
    var options = {
        weekday: "long"
    }
    var list = "Work";
    res.render('list', { listTitle: list, NewListItems: workItems });
})


app.listen(3000, (req, res) => {
    console.log('server started on port 3000');
})