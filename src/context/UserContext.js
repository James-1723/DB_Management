import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = localStorage.getItem("user");
            if(!user) {
                console.log('沒有找到 user');
                return;
            }
            setUser(user);
        }

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);