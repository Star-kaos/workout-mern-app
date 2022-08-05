import { Link } from 'react-router-dom'

function Welcomepage() {

    return (
        <div className="welcomepage">
            <div className='innerWelcomepage'>
                <h2 className='welcomeTitle'>Please login or sign-up to view your personal workouts</h2>
                <Link to="/signup">
                    <button className='welcomepageBtns'>sign-up</button>
                </Link>
                <Link to="/login">
                    <button className='welcomepageBtns'>login</button>
                </Link>
            </div>
        </div>
    );
}

export default Welcomepage;
