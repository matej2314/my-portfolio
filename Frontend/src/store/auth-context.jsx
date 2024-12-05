import { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';
import useSendRequest from '../hooks/useSendRequest';
import { loginUrl, registerUrl, verifyURL } from "../url";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const { sendRequest, isLoading, error, logout } = useSendRequest();


    useEffect(() => {
        const checkAuth = async () => {
            const sessionCookie = Cookies.get('SESSID');

            if (sessionCookie) {
                try {
                    const response = await sendRequest({
                        url: verifyURL,
                        method: "GET",
                    });

                    if (response && response.userName) {
                        setIsAuthenticated(true);
                        setUser({ userName: response.userName, role: response.userRole });
                    }
                } catch (error) {
                    console.log('Błąd autoryzacji', error);
                    setIsAuthenticated(false);
                    setUser(null);
                }
            }
        }
        checkAuth();
    }, [sendRequest]);

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
            console.log(error)
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
            console.log(error)
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
