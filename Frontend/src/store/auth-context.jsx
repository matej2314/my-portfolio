import { createContext, useState, useEffect } from "react";
import useSendRequest from '../hooks/useSendRequest';
import { loginUrl, registerUrl, verifyURL, logOutUrl } from "../url";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const { sendRequest, isLoading, error, result } = useSendRequest();

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

    const logout = async () => {
        try {
            const response = await sendRequest({
                url: logOutUrl,
                method: "GET",
            });

            if (response && response.message) {
                setIsAuthenticated(false);
                setUser(null);
                return response.message;
            };

        } catch (error) {
            console.log('Failed to log out user.');
        }
    }

    const register = async (username, email, password) => {

        try {
            const response = await sendRequest({
                url: registerUrl,
                data: { reg_username: username, reg_email: email, reg_password: password, role: 'user' }
            });

            if (response) {
                return response.message;
            }
        } catch (error) {
            console.log(error)
        }
    };

    const verifySession = async () => {
        try {
            const response = await sendRequest({
                url: verifyURL,
                method: "GET",
            });

            if (response && response.userName) {
                setIsAuthenticated(true);
                setUser({ userName: response.userName, role: response.role });
            }

        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);

        }
    };

    useEffect(() => {
        verifySession();
    }, [])

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
