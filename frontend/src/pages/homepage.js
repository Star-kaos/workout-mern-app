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
    const [isAuth, setIsAuth] = useState(null)
    const { dispatch } = useAuthContext()

    useEffect(() => {
        setEmail(user.userEmail)
        console.log("Welcome back", user.userEmail)

        const config = {
            headers: {
                "x-auth-token": user.token
            }
        }
        const fetchWorkouts = async () => {
            const response = await axios.get(`http://localhost:4000/api/workouts/user/${email}`, config).catch((error) => error.response)
            // console.log(response)
            if (response.status === 200) {
                setWorkouts(response.data)
                setIsAuth(response.data.isAuth)
            }
            if (response.status === 401) {
                dispatch({ type: "LOGOUT" })
                localStorage.removeItem('user')
            }
        }

        if (email) {
            fetchWorkouts()
        }
    }, [email, user, isAuth])

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
