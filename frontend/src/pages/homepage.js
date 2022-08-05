import { useEffect, useState } from 'react';
import '../index.css';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'

//components
import WorkoutDetails from '../components/workoutDetails'
import WorkoutForm from '../components/workoutForm'

function Home() {
    const { user } = useAuthContext()
    const [workouts, setWorkouts] = useState(null)
    const [email, setEmail] = useState(null)

    useEffect(() => {
        setEmail(user.userEmail)

        const fetchWorkouts = async () => {
            const response = await axios.get(`http://localhost:4000/api/workouts/user/${email}`)
            if (response.status === 200) {
                setWorkouts(response.data)
            }
        }

        if (email) {
            fetchWorkouts()
        }
    }, [email, user])

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
