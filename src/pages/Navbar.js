import { Link } from 'react-router-dom';
import '../style/Navbar.css';
const Navbar = () => {

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
                <Link to='/'>Create</Link>
                <Link to='/login'>Login</Link>
            </div>
        </nav>        
    );
}
 
export default Navbar;