import { createContext, useState } from "react";
import useSendRequest from '../hooks/useSendRequest';
import { loginUrl, registerUrl } from "../url";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const { sendRequest, isLoading, error, logout } = useSendRequest();


    const login = async (email, password) => {

        try {
            const response = await sendRequest({
                url: loginUrl,
                data: { email, password }
            });

            if (response && response.userName) {

                setIsAuthenticated(true);
                setUser({ userName: response.userName, role: response.role });

            }
        } catch (error) {

        }
    };


    const register = async (username, email, password) => {

        try {
            const response = await sendRequest({
                url: registerUrl,
                data: { reg_username: username, reg_email: email, reg_password: password, role: 'user' }
            });

            if (response) {
                console.log('Rejestracja zakończona sukcesem. Możesz się zalogować.');
            }
        } catch (error) {

        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            isLoading,
            error,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
