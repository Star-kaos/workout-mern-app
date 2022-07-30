import { useEffect, useState } from 'react';
import '../index.css';
import axios from 'axios';

//components
import WorkoutDetails from '../components/workoutDetails'
import WorkoutForm from '../components/workoutForm'

function Home() {
    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await axios.get('http://localhost:4000/api/workouts')
            // console.log(response)
            if (response.status === 200) {
                setWorkouts(response.data)
            }

        }

        fetchWorkouts()
    }, [])

    return (
        <div className="homepage">
            <div className='innerHomepage'>
                <div className='workouts'>
                    {workouts && workouts.map((workout) => (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))}
                </div>
                <div className='creationFormNest'>
                    <WorkoutForm />
                </div>
            </div>
        </div>

    );
}

export default Home;
