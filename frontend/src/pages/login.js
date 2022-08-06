import { useState } from 'react'
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { dispatch } = useAuthContext()
    // const { user } = useAuthContext()


    const handleSubmitUserData = async (e) => {
        e.preventDefault();

        // const config = {
        //     headers: {
        //         "x-auth-token": user.token
        //     }
        // }

        const userLoginData = { email, password }
        const response = await axios.post('http://localhost:4000/api/user/login', userLoginData).catch((error) => error.response)

        if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify({ userEmail: userLoginData.email, token: response.data.token, isAuth: true }))

            console.log(response)

            //update authcontext
            dispatch({ type: "LOGIN", payload: { userEmail: response.data.isUser.email, token: response.data.token, isAuth: true } })

            if (response.data.isAuth) {
                window.location = "/"
            }
        }
        if (response.status === 401) {
            console.log(response.data.msg)
            setError(response.data.msg)
        }
        if (response.status === 500) {
            console.log(response)
            setError(response.data.msg)
        }
    }

    return (
        <div className='loginPage'>
            <div className='signupNest'>
                <h2 className='signupTitle'>Login</h2>
                <form className="signupForm" onSubmit={handleSubmitUserData}>
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

export default LoginForm;