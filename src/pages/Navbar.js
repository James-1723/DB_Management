import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext.js'
import '../style/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import {faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import{faUser } from '@fortawesome/free-solid-svg-icons';
import{faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

    const { user } = useUser();

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('searching...');
    }
    return (
        <nav className='navbar'>
            <div className='home-link'>
                <Link to='/'>HomePage</Link>
            </div>
            <form className='search-bar' onSubmit={handleSearch}>
                <input type="text" placeholder="請輸入菜名"></input>
                <div className='search_icon'>< FontAwesomeIcon icon={faMagnifyingGlass} /></div>
            </form>
            <div className='links'>
                <div className='filter-link'>
                    <Link to='/'>
                        <FontAwesomeIcon icon={faFilter}/> 篩選 
                    </Link>
                </div>
                <div className='create-link'>
                    <Link to='/create'>
                        <FontAwesomeIcon icon={faSquarePlus} /> 建立
                    </Link>
                </div>
                <div className='create-link'>
                    <Link to='/login'><FontAwesomeIcon icon={faUser} /> 登入</Link>
                </div>
                {
                    user
                    ? <Link to='/user'>個人介面</Link>
                    : <Link to='/login'>登入</Link>
                }
            </div>
        </nav>        
    );
}
 
export default Navbar;