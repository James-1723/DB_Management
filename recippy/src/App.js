import Home from './Home';
import Navbar from './Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.js';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
            <div className='content'>
              <Routes>
                <Route path='/' element={<Home />} />
              </Routes>
            </div>
        </BrowserRouter>

    </div>
  );
}

export default App;
