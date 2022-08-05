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

//find all users
router.get('/', asyncHandler(async (req, res, next) => {
    const allUsers = await User.find().sort({ createdAt: -1 })
    res.status(200).json(allUsers)
}))

//find one user
router.get('/view/:id', asyncHandler(async (req, res) => {
    const viewUser = await User.findById(req.params.id)
    res.status(200).json(viewUser)
}))

//create user
router.post('/new', asyncHandler(async (req, res) => {

    //error handling
    if (req.body.username.length === 0) {
        res.status(401).json({ msg: "Please enter a username." })
        return
    }
    if (req.body.email.length === 0) {
        res.status(401).json({ msg: "Please enter an email." })
        return
    }
    if (req.body.password.length === 0) {
        res.status(401).json({ msg: "Please enter a password." })
        return
    }

    if (req.body.password.length <= 6) {
        res.status(401).json({ msg: "Please enter a stronger password (over 6 charectors)." })
        return
    }
    const existingEmail = await User.findOne({ email: req.body.email })

    //if worked with no errors
    if (existingEmail === null) {
        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        //user outline
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })
        //saving new user
        await newUser.save().catch(err => err.response)

        const token = createToken(newUser._id)
        // console.log(token)

        // console.log(newUser.password)
        res.status(200).json({ newUser, token })
        return
    }

    if (req.body.email === existingEmail.email) {
        res.status(401).json({ msg: "Email is already in use." })
        return
    }
}))

//delete user
router.get('/delete/:id', asyncHandler(async (req, res) => {
    const deletedUser = await User.deleteOne({ _id: req.params.id })
    res.status(200).json(deletedUser)
}))

//delete many Testing only
router.get('/deleteAll', asyncHandler(async (req, res) => {
    const deleteAll = await User.deleteMany()
    res.status(200).json(deleteAll)
}))

module.exports = router