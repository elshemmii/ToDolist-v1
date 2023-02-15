const express = require('express');  // requires express module
const bodyParser = require('body-parser');// requires body-parser module
const app = express(); //init express
const date = require(__dirname + "/date"); // requires date module from dir
const port = 3000; //setting port


const items = ["Buy Food", "Cook Food", "Eat Food"]; //array of list
const workItems = [];  //array of work
app.set('view engine', 'ejs'); //setting ejs engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //to use css styles into express

//get the date
app.get("/", function (req, res) {
    const day = date.getDate();
    //renders title and new list from "list.ejs"
    res.render("list", { listTitle: day, newListItems: items });
});

//post to home route
app.post("/", function (req, res) {

    const item = req.body.newItem;
    //determine which list to add new items 
    //switch routes
    if (req.body.list === 'Work') {

        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", function (req, res) {
    //render title and work list 
    res.render("list", { listTitle: "Work List", newListItems: workItems });

});
//app listen on port "port"
app.listen(port, function () {
    console.log('Port started successfully on: ' + port + "");
});


//formatting date in js
// new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
// "Friday, Jul 2, 2021"