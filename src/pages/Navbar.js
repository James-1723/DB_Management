import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext.js'
import '../style/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

    const { user } = useUser();

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('searching...');
    }
    return (
        <nav className='navbar'>
            <div className='home-link'>
                <Link to='/'>首頁</Link>
            </div>
            <form className='search-bar' onSubmit={handleSearch}>
                <input type="text" placeholder="輸入文字..."/>
                <button>搜尋</button>
            </form>
            <div className='links'>
                <div className='filter-link'>
                    <Link to='/'>
                        <FontAwesomeIcon icon={faFilter}/> 篩選
                    </Link>
                </div>
                <div className='create-link'>
                    <Link to='/create'>建立</Link>
                </div>
                {
                    user
                    ? <Link to='/user'>Personal</Link>
                    : <Link to='/login'>登入</Link>
                }
            </div>
        </nav>        
    );
}
 
export default Navbar;