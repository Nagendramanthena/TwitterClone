const express = require('express');
const app = express();
const path = require("path");

const session = require("express-session");
const middleware = require("./middleware");


const bodyparser = require("body-parser");



//Mongodb connection
const mongoose = require("mongoose");



mongoose.connect("mongodb+srv://Nagendravarma:Nagendra%402002@twiitercluster.hvpqw.mongodb.net/?retryWrites=true&w=majority")
    .then(()=> {
    console.log("connection open!!")
})

    .catch((err)=> {
    console.log("Oh no error!"+err)
})


//Mongodb Connection

//sessions 

app.use(session({
    secret:"nagendra",
    resave:true,
    saveUninitialized:false


}));






app.listen(3001,()=> {
    console.log("Hey iam listening on port 3001");
    
})


app.set("view engine","pug");


app.set("views","views");
app.use(bodyparser.urlencoded({ extended:false}))

app.use(express.static(path.join(__dirname,"public")));





//routes

const loginroute = require("./routes/loginRoutes");
const registerroute = require("./routes/Registerroutes");
const logoutroute = require("./routes/logout")

//connecting to app
app.use("/login",loginroute);
app.use("/register",registerroute);
app.use("/logout",logoutroute);

app.get("/",middleware.requireLogin,(req,res,next) => {

    var payLoad = {
        pageTitle: "Home",
        UserLoggedIn:req.session.user
    }
    
    res.status(200).render("home",payLoad)
})