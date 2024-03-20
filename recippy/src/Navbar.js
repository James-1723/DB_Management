import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='home-link'>
                <Link to='/'>Home</Link>
            </div>
            <div className="links">
                <Link to='/'>Create</Link>
                <Link to='/'>User</Link>
            </div>
        </nav>        
    );
}
 
export default Navbar;