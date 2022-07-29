const express = require('express')
const app = express()
const { default: mongoose } = require("mongoose")
const workoutRoutes = require('./routes/workouts')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/workouts', workoutRoutes)

//sending to /api/workouts
app.get('/', (req, res) => {
    res.redirect('/api/workouts')
})

//connecting to mongodb and starting localhost 
mongoose.connect("mongodb://127.0.0.1:27017/workout_db")
    .then(() => {
        app.listen(4000, () => {
            console.log('connected to port: 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })
