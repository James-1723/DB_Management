import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // 加載狀態

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true); // 開始加載
            const userData = localStorage.getItem("user");
            if(userData) {
                setUser(JSON.parse(userData)); // 確保進行JSON解析
                console.log(userData, 'user status');
            } else {
                console.log('沒有找到 user');
            }
            setLoading(false); // 結束加載
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
