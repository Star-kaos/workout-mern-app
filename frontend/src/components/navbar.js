import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'


function Navbar() {
    const { user } = useAuthContext()
    const { dispatch } = useAuthContext()
    const handleClick = () => {
        dispatch({ type: "LOGOUT" })
        localStorage.removeItem('user')
    }

    return (
        <div className="navBar">
            <div className='innerNav'>
                <div className='navHomeLink'>
                    <Link to="/">
                        <h1 className='navTitle'>Workout-App</h1>
                    </Link>
                </div>
                <div className='loginSignup'>
                    <span>{user && user.userEmail ? <div className='loggedinDiv'>
                        <p className='userEmailP'>{user.userEmail}</p>
                        <div className='logoutBtnNest'>
                            <button className='logoutBtn' onClick={handleClick}>logout</button>
                        </div>
                    </div> :
                        <div className='loginSignup'>
                            {/* <Link to="/login">
                                <p className='navLogin'>login</p>
                            </Link>
                            <Link to="/signup">
                                <p className='navSignup'>sign-up</p>
                            </Link> */}
                        </div>}</span>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
