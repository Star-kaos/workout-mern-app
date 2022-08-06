import { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'

function WorkoutForm() {
    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        setUserEmail(user.userEmail)
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "x-auth-token": user.token
            }
        }
        //set to users current email
        const workout = { title, userEmail, reps, load }
        const response = await axios.post('http://localhost:4000/api/workouts/new', workout, config).catch((error) => error.response)

        if (response.status === 200) {
            // console.log(response.data)
            window.location = "/"
        }
        if (response.status === 401) {
            setError(response.data.msg)
        }
    }

    return (
        <div className='workoutForm'>
            <form className="creationForm" onSubmit={handleSubmit}>
                <label>Exercise name:</label>
                <input type="text" name="name" className='inputs' maxLength="15" onChange={(e) => setTitle(e.target.value)} />
                <label>Reps:</label>
                <input type="number" name="name" className='inputs' maxLength="10" onChange={(e) => setReps(e.target.value)} />
                <label>Load (lbs):</label>
                <input type="number" name="name" className='inputs' maxLength="10" onChange={(e) => setLoad(e.target.value)} />
                <input type="submit" value="Submit" className='inputSubmit' />
            </form>
            <h3 className='signupError'>{error ? error : ""}</h3>
        </div>
    );
}

export default WorkoutForm;
