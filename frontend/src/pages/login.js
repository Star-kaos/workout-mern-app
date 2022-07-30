import { useState } from 'react'
import axios from 'axios';


function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmitUserData = async (e) => {
        const userData = { email, password }
        const response = await axios.post('http://localhost:4000/api/user/login', userData)

        if (response.status === 200) {
            console.log(response.data)
        }


    }

    return (
        <div className='loginPage'>
            <h2 className='loginTitle'>Login</h2>
            <form className="loginForm" onSubmit={handleSubmitUserData}>
                <label>Email:</label>
                <input type="email" name="usremail" className='inputs' onChange={(e) => setEmail(e.target.value)} />
                <label>Password:</label>
                <input type="password" name="usrpass" className='inputs' onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Submit" className='inputSubmit' />
            </form>
        </div>
    );
}

export default LoginForm;