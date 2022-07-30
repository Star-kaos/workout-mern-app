import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

//pages
import Homepage from './pages/homepage.js'
import Login from './pages/login.js'
import Signup from './pages/signup.js'


//components
import Navbar from './components/navbar.js'


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={<Homepage />}
            />
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
