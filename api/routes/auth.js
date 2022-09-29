const express = require("express");
const router = express.Router();
const userSchema = require("../models/User");
const bcrypt = require("bcrypt");
 
router.post("/register", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new userSchema({
        username: req.body.username,
        email: req.body.email, 
        password: hashedPassword,
    })
    user.save()

})

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email });
        !user && res.status(404).send("user not found");
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong password");
        res.json({message:"Utilisateur bien identifie",data:user})
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;