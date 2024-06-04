import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext.js';
import { useSearch } from '../context/SearchContext.js'; // 引入 useSearch
import '../style/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSquarePlus, faMagnifyingGlass, faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import FilterModal from './FilterModal.js';

const Navbar = () => {
    const { user, setUser } = useUser();
    const { handleKeywordSearch } = useSearch(); // 使用 useSearch
    const navigate = useNavigate();
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleKeywordSearch(searchQuery);
    };

    const handleLogout = () => {
        setUser(null);
        navigate('/login');
    };

    const handleFilterClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-content'>
                    <div className='home-link'>
                        <Link to='/'>HomePage</Link>
                    </div>

                    <form className='search-bar' onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="請輸入菜名"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type='submit' className='search_icon'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>

                    <div className='links'>
                        {location.pathname === '/' && (
                            <div className='filter-link' onClick={handleFilterClick}>
                                <span>
                                    <FontAwesomeIcon icon={faFilter}/> 篩選 
                                </span>
                            </div>
                        )}

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
                                    <span>
                                        <FontAwesomeIcon icon={faArrowRightFromBracket} /> 登出
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className='login-link'>
                                <Link to='/login'>
                                    <FontAwesomeIcon icon={faUser} /> 登入
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <FilterModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
};

export default Navbar;
