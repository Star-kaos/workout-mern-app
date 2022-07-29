import { useState } from 'react'
import axios from 'axios';


function WorkoutForm() {
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')

    const handleSubmit = async (e) => {
        const workout = { title, reps, load }
        const response = await axios.post('http://localhost:4000/api/workouts/new', workout)

        if (response.status === 200) {
            console.log(response.data)
        }


    }

    return (

        <form className="creationForm" onSubmit={handleSubmit}>
            <label>Exercise name:</label>
            <input type="text" name="name" className='inputs' onChange={(e) => setTitle(e.target.value)} />
            <label>Reps:</label>
            <input type="number" name="name" className='inputs' onChange={(e) => setReps(e.target.value)} />
            <label>Load (lbs):</label>
            <input type="number" name="name" className='inputs' onChange={(e) => setLoad(e.target.value)} />
            <input type="submit" value="Submit" className='inputSubmit' />
        </form>
    );
}

export default WorkoutForm;
