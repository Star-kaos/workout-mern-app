import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { useAuthContext } from './hooks/useAuthContext'

//pages
import Welcomepage from './pages/welcomepage'
import Homepage from './pages/homepage.js'
import Login from './pages/login.js'
import Signup from './pages/signup.js'


//components
import Navbar from './components/navbar.js'


function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            {user ? <Route
              path="/"
              element={<Homepage />}
            /> : <Route
              path="/"
              element={<Welcomepage />}
            />}
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
