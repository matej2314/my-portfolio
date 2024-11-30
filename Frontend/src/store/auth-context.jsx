import { createContext, useState, useCallback } from "react";
import useSendRequest from '../hooks/useSendRequest';

import { loginUrl, registerUrl } from "../url";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [registerMessage, setRegisterMessage] = useState(null);
    const { sendRequest, isLoading, error } = useSendRequest();

    const login = async (email, password) => {
        const response = await sendRequest({
            url: loginUrl,
            data: { email, password }
        });

        if (response && response.userName) {
            setIsAuthenticated(true);
            setUser({ userName: response.userName });
        }
    };

    const register = useCallback(async (username, email, password) => {
        try {
            const response = await sendRequest({
                url: registerUrl,
                data: { reg_username: username, reg_email: email, reg_password: password, role: 'user' }
            });

            if (response) {
                setRegisterMessage('Rejestracja zakończona sukcesem. Możesz się zalogować.');
            }
        } catch (error) {
            setRegisterMessage('Wystąpił błąd podczas rejestracji nowego użytkownika');
        }
    });

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            isLoading,
            error,
            login,
            register,
            registerMessage,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};