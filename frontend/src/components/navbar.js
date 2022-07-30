import { Link } from 'react-router-dom'
import '../index.css'

function Navbar() {
    return (
        <div className="navBar">
            <div className='innerNav'>
                <div className='navHomeLink'>
                    <Link to="/">
                        <h1 className='navTitle'>Workout-App</h1>
                    </Link>
                </div>
                <div className='loginSignup'>
                    <Link to="/login">
                        <p className='navLogin'>login</p>
                    </Link>
                    <Link to="/signup">
                        <p className='navSignup'>sign-up</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
