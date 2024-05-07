import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext.js'
import '../style/Navbar.css';
const Navbar = () => {

    const { user } = useUser();

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('searching...');
    }
    return (
        <nav className='navbar'>
            <div className='home-link'>
                <Link to='/'>Home</Link>
            </div>
            <form className='search-bar' onSubmit={handleSearch}>
                <input type="text" placeholder="Search..."/>
                <button>Search</button>
            </form>
            <div className="links">
                <Link to='/'>Filter</Link>
                <Link to='/create'>Create</Link>
                {
                    user
                    ? <Link to='/user'>Personal</Link>
                    : <Link to='/login'>Log In</Link>
                }
            </div>
        </nav>        
    );
}
 
export default Navbar;