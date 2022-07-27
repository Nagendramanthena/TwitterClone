const express = require('express');
const app = express();

const bodyParser = require("body-parser");
const bcyrpt = require("bcrypt");



const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
const User = require('../schemas/UserSchema');








router.get("/",(req,res,next) => {
 if(req.session){
    req.session.destroy(()=> {
        res.redirect("/login")
    })
 }
})


module.exports = router;