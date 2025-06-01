import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext)!;

export const AuthProvider = ({ children }) => {
    const [ token, setToken ] = useState(() => {
        return localStorage.getItem("token") || null;
    });

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = async () => {
        try {
            await axios.post(
                "http://localhost:8000/api/auth/logout/",
            );
        } catch (err: any) {
            console.log(err?.response?.data?.error);
        } finally {
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            setToken(null);
        }
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
