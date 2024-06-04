import { useState } from 'react';
import { useUser } from '../context/UserContext.js';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const {user, setUser} = useUser();
    const displayName = user && user.user_name ? user.user_name : '';
    const navigate = useNavigate();

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user');
        navigate('/')
        console.log('登出成功')
    }

    return ( 
        <div>
            <p>This is title page</p>
            <p className={displayName ? '' : 'hide'}>Hello, {displayName}</p>
            <button onClick={logout}>Log out</button>
        </div>
    );
}

 
export default User;