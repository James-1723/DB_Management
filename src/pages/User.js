import { useState } from 'react';
import { useUser } from '../context/UserContext.js';

const User = () => {
    const {user} = useUser();
    const displayName = user && user.user_name ? user.user_name : '';

    if (!user) {
        return <div>Loading...</div>; // 或其他臨時顯示
    }

    return ( 
        <div>
            <p>This is title page</p>
            <p className={displayName ? '' : 'hide'}>Hello, {displayName}</p>
        </div>
    );
}

 
export default User;