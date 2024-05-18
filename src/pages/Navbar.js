import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext.js'
import '../style/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSquarePlus, faMagnifyingGlass,  faArrowRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

    const { user, setUser } = useUser();

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('searching...');
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <nav className='navbar'>
            <div className='navbar-content'>
                <div className='home-link'>
                    <Link to='/'>HomePage</Link>
                </div>

                <form className='search-bar' onSubmit={handleSearch}>
                    <input type="text" placeholder="請輸入菜名"></input>
                    <div className='search_icon'>
                        < FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                </form>

                <div className='links'>   
                    <div className='filter-link'>
                        <Link to='/'>
                            <FontAwesomeIcon icon={faFilter}/> 篩選 
                        </Link>
                    </div>

                    {user ? (
                        <>
                            <div className='create-link'>
                                <Link to='/create'>
                                    <FontAwesomeIcon icon={faSquarePlus} /> 建立
                                </Link>
                            </div>
                            <div className='user-link'>
                                <Link to='/user'>
                                    <FontAwesomeIcon icon={faUser} /> 個人介面
                                </Link>
                            </div>
                            <div className='log-out-link' onClick={handleLogout}>
                                <Link to='/login'>
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} /> 登出
                                </Link>
                            </div>
                        </>
                    ):( 
                        <div className='login-link'>
                            <Link to='/login'>
                                <FontAwesomeIcon icon={faUser} /> 登入
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </nav>        
    );
};
 
export default Navbar;