import React, { createContext, useState } from "react";

export const AuthContext = createContext(undefined);
export const ThemeContext = createContext(undefined);
export const UserContext = createContext(undefined);

function AuthProvider({ children }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    return(
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, username, setUsername, email, setEmail, password, setPassword, persist, setPersist, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}

function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);

    const toggleMode = () => {
        setDarkMode(!darkMode);
    }

    return(
        <ThemeContext.Provider value={{darkMode, toggleMode}}>
            {children}
        </ThemeContext.Provider>
    )
}

function UserProvider({ children }) {
    const [user, setUser] = useState({
        username: "",
        email: "",
        tasks: []

    });

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export {AuthProvider, ThemeProvider, UserProvider};