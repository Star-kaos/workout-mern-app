const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, "ilovebasketballsomuch", { expiresIn: '24h' })
}



//async machine
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

//user login
router.post('/login', asyncHandler(async (req, res) => {

    //error handling
    if (!req.body.email || req.body.email.length === 0) {
        res.status(401).json({ msg: "Please enter an email." })
        return
    }
    if (!req.body.password || req.body.password.length === 0) {
        res.status(401).json({ msg: "Please enter a password." })
        return
    }

    const isUser = await User.findOne({ email: req.body.email })
    // console.log(isUser)

    if (isUser === null) {
        res.status(401).json({ msg: "Please try again" })
        return
    }

    bcrypt.compare(req.body.password, isUser.password, function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).json({ msg: err })
            return
        }
        if (result) {
            const token = createToken(isUser._id)
            res.status(200).json({ isUser, token: token, isAuth: true })
            return
        }
        if (!result) {
            res.status(401).json({ msg: "Incorrect password" })
            return
        }
    });
}))

//logout user
router.get('logout', asyncHandler(async (req, res) => {
    const deletedUser = await User.deleteOne({ _id: req.params.id })
    res.status(200).json(deletedUser)
}))

module.exports = router