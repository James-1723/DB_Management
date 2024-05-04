import Home from './pages/Home.js';
import Navbar from './pages/Navbar.js';
import NotFound from './pages/NotFound.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.js';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
            <div className='content'>
              <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/sign-up' element={<Signup />} />
              </Routes>
            </div>
        </BrowserRouter>

    </div>
  );
}

export default App;
