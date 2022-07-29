import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

//pages
import Homepage from './pages/homepage.js'

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
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
