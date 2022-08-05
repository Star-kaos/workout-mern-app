const express = require('express')
const router = express.Router()
const Workout = require('../models/workoutModel')

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

//find all workouts
router.get('/', asyncHandler(async (req, res) => {
    const allWorkouts = await Workout.find().sort({ createdAt: -1 })
    res.status(200).json(allWorkouts)
}))

//find all users workouts
router.get('/user/:email', asyncHandler(async (req, res) => {
    const allWorkouts = await Workout.find({ userEmail: req.params.email }).sort({ createdAt: -1 })
    res.status(200).json(allWorkouts)
}))

//find one workouts
router.get('/view/:id', asyncHandler(async (req, res) => {
    const viewWorkout = await Workout.findById(req.params.id)
    res.status(200).json(viewWorkout)
}))

//create workout
router.post('/new', asyncHandler(async (req, res) => {

    //error handling
    if (req.body.title.length === 0) {
        res.status(401).json({ msg: "Please enter a title." })
        return
    }
    if (req.body.reps.length === 0) {
        res.status(401).json({ msg: "Please enter your reps." })
        return
    }
    if (req.body.load.length === 0) {
        res.status(401).json({ msg: "Please enter a load." })
        return
    }
    if (req.body.load.length >= 4) {
        res.status(401).json({ msg: "Are you sure you can lift that much?" })
        return
    }
    const usedWorkout = await Workout.findOne({ title: req.body.title, userEmail: req.body.userEmail })
    if (usedWorkout === null) {
        const newWorkout = await Workout.create(req.body)
        res.status(200).json(newWorkout)
        // console.log('workout created')
        return
    }

    if (req.body.title === usedWorkout.title) {
        res.status(401).json({ msg: "Workout is already created." })
        return
    }
    // res.status(200).json({ msg: "not hitting anything else." })
}))

//delete workout
router.get('/delete/:id', asyncHandler(async (req, res) => {
    const deletedWorkout = await Workout.deleteOne({ _id: req.params.id })
    res.status(200).json(deletedWorkout)
}))

//deleteAll
router.get('/deleteAll', asyncHandler(async (req, res) => {
    const deleteAll = await Workout.deleteMany()
    res.status(200).json(deleteAll)
}))

module.exports = router