import { createContext, useState } from "react";
import useSendRequest from '../hooks/useSendRequest';
import { loginUrl, registerUrl } from "../url";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const { sendRequest, isLoading, error, logout } = useSendRequest();


    const login = async (email, password) => {
        setMessage(null);

        try {
            const response = await sendRequest({
                url: loginUrl,
                data: { email, password }
            });
            console.log('Login response:', response);

            if (response && response.userName) {
                setIsAuthenticated(true);
                setUser({ userName: response.userName, role: response.role });
            } else {
                setMessage('Logowanie nieudane');
            }
        } catch (error) {
            setMessage('Błąd logowania');
        }
    };


    const register = async (username, email, password) => {
        setMessage(null);

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
    };


    console.log('AuthContext state:', { isAuthenticated, user, message });

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
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
