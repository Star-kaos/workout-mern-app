import { Link } from 'react-router-dom'
import '../index.css'

function Navbar() {
    return (
        <div className="navBar">
            <Link to="/">
                <h1 className='navTitle'>Workout-App</h1>
            </Link>
        </div>
    );
}

export default Navbar;
