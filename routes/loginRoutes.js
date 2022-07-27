const express = require('express');
const app = express();

const bodyParser = require("body-parser");
const bcyrpt = require("bcrypt");



const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
const User = require('../schemas/UserSchema');





app.set("view engine","pug");


app.set("views","views");



router.get("/",(req,res,next) => {
 res.status(200).render("login")
})

router.post("/",async (req,res,next)=> {
    var payload = req.body;

    if(req.body.logusername && req.body.loginpassword){
            var user = await User.findOne({
                $or: [
                    { username: req.body.logusername },
                    { email: req.body.logusername }
                ]
            })
            .catch((error) => {
                console.log(error);
                payload.errorMessage = "Something went wrong.";
                res.status(200).render("login", payload);
            });


            if(user!=null)
            {
              var result= await bcyrpt.compare(req.body.loginpassword,user.password)
              if(result === true){

                req.session.user  = user;
                return res.redirect("/");
              }
            }
            payload.errorMessage = "Login credentials incorrect.";
            res.status(200).render("login", payload);


    }

})

module.exports = router;