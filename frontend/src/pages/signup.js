import { useState } from 'react'
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'


function SignupForm() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { dispatch } = useAuthContext()

    const handleSubmitUserData = async (e) => {
        e.preventDefault();

        const userData = { email, password, username }
        const response = await axios.post('http://localhost:4000/api/user/new', userData).catch((error) => error.response)

        if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify({ userEmail: userData.email, token: response.data.token }))
            console.log(response)

            //update authcontext
            dispatch({ type: "LOGIN", payload: { userEmail: response.data.newUser.email, token: response.data.token } })

            window.location = "/"
        }
        if (response.status === 401) {
            console.log(response)
            setError(response.data.msg)
        }
        if (response.status === 500) {
            console.log(response)
            setError(response.data.msg)
        }

    }

    return (
        <div className='signupPage'>
            <div className='signupNest'>
                <h2 className='signupTitle'>Sign-Up</h2>
                <form className="signupForm" onSubmit={handleSubmitUserData}>
                    <label>User-Name:</label>
                    <input type="text" name="usremail" className='signLogInputs' maxLength="20" onChange={(e) => setUsername(e.target.value)} />
                    <label>Email:</label>
                    <input type="email" name="usremail" className='signLogInputs' maxLength="35" onChange={(e) => setEmail(e.target.value)} />
                    <label>Password:</label>
                    <input type="password" name="usrpass" className='signLogInputs' maxLength="20" onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value="Submit" className='signLogInputSubmit' />
                </form>
            </div>
            <h3 className='signupError'>{error ? error : ""}</h3>
        </div>

    );
}

export default SignupForm;