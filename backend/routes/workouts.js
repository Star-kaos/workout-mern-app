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
router.get('/', asyncHandler(async (req, res, next) => {
    const allWorkouts = await Workout.find().sort({ createdAt: -1 })
    res.status(200).json(allWorkouts)
}))

//find one workouts
router.get('/view/:id', asyncHandler(async (req, res) => {
    const viewWorkout = await Workout.findById(req.params.id)
    res.status(200).json(viewWorkout)
}))

//create workout
router.post('/new', asyncHandler(async (req, res) => {
    console.log(req.body.title)
    const usedWorkout = await Workout.findOne({ title: req.body.title })

    if (usedWorkout === null) {
        const newWorkout = await Workout.create(req.body)
        res.status(200).json(newWorkout)
        console.log('workout already created')
    }
}))

//delete workout
router.get('/delete/:id', asyncHandler(async (req, res) => {
    const deletedWorkout = await Workout.deleteOne({ _id: req.params.id })
    res.status(200).json(deletedWorkout)
}))

module.exports = router