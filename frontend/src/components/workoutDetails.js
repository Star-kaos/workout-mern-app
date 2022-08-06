import axios from 'axios';
import moment from 'moment';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutDetails = ({ workout }) => {
    const { user } = useAuthContext()

    const handleDelete = async (e) => {
        const config = {
            headers: {
                "x-auth-token": user.token
            }
        }

        const response = await axios.get(`http://localhost:4000/api/workouts/delete/${workout._id}`, config)
        if (response.status === 200) {
            console.log(response.data)
        }
    }
    return (
        <div className='workoutContainers'>
            <div>
                <h3 className="workoutsTitle">{workout.title}</h3>
                <p className="workoutsTime">{moment(workout.createdAt).format('LLLL')}</p>
                <p className="workoutsReps"><strong>Reps: {workout.reps}</strong></p>
                <p className="workoutsLoad"><strong>Load (lbs): {workout.load}</strong></p>
            </div>
            <div>
                <form onSubmit={handleDelete}>
                    <input type="submit" value="X" className='inputDelete' />
                </form>
            </div>
        </div>
    );
}

export default WorkoutDetails;