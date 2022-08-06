import { useEffect, useState } from 'react';
import '../index.css';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'

//components
import WorkoutDetails from '../components/workoutDetails'
import WorkoutForm from '../components/workoutForm'

//hooks
import useWindowSize from '../hooks/useWindowSize';


function Home() {
    const [displayNew, setDisplayNew] = useState(false)
    const { user } = useAuthContext()
    const [workouts, setWorkouts] = useState(null)
    const [workoutsLength, setWorkoutsLength] = useState(null)
    const [email, setEmail] = useState(null)
    const [isAuth, setIsAuth] = useState(null)
    const { dispatch } = useAuthContext()
    const size = useWindowSize()

    const handleDisplay = () => {
        setDisplayNew(!displayNew)

    }

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
                console.log(workouts)
                setWorkoutsLength(workouts.length)
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
            <div>
                {size.width < 1250 && <div className='displayFormBtnDiv'><button className='displayFormBtn' onClick={handleDisplay}>Create</button></div>}
                {displayNew ? <div>{size.width < 1250 && <div className='creationFormNest2'>
                    <WorkoutForm />
                </div>}</div> : null}
            </div>

            <div className='innerHomepage'>

                <div className='workouts'>
                    {workoutsLength > 0 ? <div className='innerWorkouts'>{workouts && workouts.map((workout) => (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))}</div> : <p className='askCreation'>Create a workout to begin</p>}
                </div>
                <div className='creationFormNest'>
                    <WorkoutForm />
                </div>
            </div>
        </div>

    );
}

export default Home;
