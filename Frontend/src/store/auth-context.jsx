import { createContext, useState, useCallback } from "react";
import useSendRequest from '../hooks/useSendRequest';

import { loginUrl, registerUrl } from "../url";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [status, setStatus] = useState(null);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const { sendRequest, isLoading, error, logout, result } = useSendRequest();

    const login = async (email, password) => {
        setMessage(null);

        const response = await sendRequest({
            url: loginUrl,
            data: { email, password }
        });

        if (response && response.userName) {
            setIsAuthenticated(true);
            setUser({ userName: response.userName, role: response.role });
            setStatus(response.status);
            setMessage(result.message);
        }
    };

    const register = useCallback(async (username, email, password) => {
        try {
            const response = await sendRequest({
                url: registerUrl,
                data: { reg_username: username, reg_email: email, reg_password: password, role: 'user' }
            });

            if (response) {
                setMessage('Rejestracja zakończona sukcesem. Możesz się zalogować.');
            }
        } catch (error) {
            setMessage('Wystąpił błąd podczas rejestracji nowego użytkownika');
        }
    });
    console.log('message w auth context:', message)
    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            status,
            user,
            isLoading,
            error,
            login,
            register,
            message,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};