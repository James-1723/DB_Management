import { useState } from 'react';
import { useUser } from '../context/UserContext.js';

const User = () => {
    const {user , setUser} = useUser();
    return (
        <div>
            <h2>Hello, {user.user_name} !</h2>
            <p>This is your personal page</p>
        </div>
    );
}
 
export default User;