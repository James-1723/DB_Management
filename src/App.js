import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { UserProvider } from './context/UserContext.js'
import { SearchProvider } from './context/SearchContext.js';
import Home from './pages/Home.js';
import Navbar from './pages/Navbar.js';
import NotFound from './pages/NotFound.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import User from './pages/User.js';
import Create from './pages/Create.js';

import './App.js';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <UserProvider>
            <SearchProvider>
              <Navbar />
              <div className='content'>
                <Routes>
                  <Route path='*' element={<NotFound />} />
                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/sign-up' element={<Signup />} />
                  <Route path='/user' element={<User />} />
                  <Route path='/create' element={<Create />} />
                  
                </Routes>
              </div>
              </SearchProvider>
          </UserProvider>
        </BrowserRouter>

    </div>
  );
}

export default App;
