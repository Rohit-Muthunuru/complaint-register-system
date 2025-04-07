const express = require("express")
const router = express.Router()
const AuthModel = require("../models/Auth")
const jwt = require("jsonwebtoken")

router.post("/signup", async function (req, res) {
    //implement the sign up function
    console.log(req.body)
    let user = await AuthModel.findOne({ email: req.body.email })
    if (user && user.email) {
        res.send({ msg: "email already exists" })
    } else {
        const user = new AuthModel(req.body)
        const result = await user.save()
        res.send("signup successfull")
    }


})

router.post("/login", async function (req, res) {
    //implement the login function

    let user = await AuthModel.findOne({ email: req.body.email })
    if (user && user.email) {
        if (user.password === req.body.password) {
            const token = jwt.sign({ id: user._id, email: user.email, role:user.role, name:user.name}, "testkey")
            res.send({ msg: "login successfull", success: true, token: token, role:user.role, userId:user._id,name:user.name});
        } else {
            res.send({ msg: "wrong password", success: false })
        }
    } else {
        res.send({ msg: "user does not exist", success: false })
    }

})

function isHeLoggedIn(req,res,next){
 if(req.headers && req.headers.authorization){
    let token = req.headers.authorization
   let decodedToken = jwt.verify(token,"testkey")
   if(decodedToken.role==="admin"){
    next()
   }else{
    res.send({msg:"you dont have access to users"})
   }
 }
}
router.get("/admin",isHeLoggedIn,async function (req, res) {
    let users = await AuthModel.find({})
     res.send(users)
     
})

module.exports = router