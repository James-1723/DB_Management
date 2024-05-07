import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const userData = localStorage.getItem("user");
            if(userData) {
                setUser(JSON.parse(userData));
                console.log(userData, 'user status');
            } else {
                console.log('沒有找到 user');
            }
            setLoading(false);
        }

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser, loading}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
