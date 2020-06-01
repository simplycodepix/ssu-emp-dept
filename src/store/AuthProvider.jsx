import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const authenticatedUser = localStorage.getItem('user');
        if (authenticatedUser) logIn(JSON.parse(authenticatedUser));
    }, []);

    const logIn = async (user) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));

            setAuthenticated(true);
            setUser(user);
        }
    }

    const logOut = async () => {
        localStorage.removeItem('user');
        setAuthenticated(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            user,
            authenticated,
            logOut,
            logIn
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;