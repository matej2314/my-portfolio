import { useRef, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../store/auth-context';
import { cmsComponents } from './cms-componenst-styles';

export default function LoginForm() {
    const navigate = useNavigate();
    const email = useRef(null);
    const password = useRef(null);

    const { login, isLoading, error, user, message } = useContext(AuthContext);


    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email.current.value, password.current.value);
    };


    // useEffect(() => {
    //     if (user) {

    //         navigate('/dashboard'); 
    //     }
    // }, [user, navigate]);

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-fit h-fit flex flex-col justify-center items-center gap-5 text-white">
                <h2>Log in</h2>

                {isLoading && <p>Sending data...</p>}


                {error && <p style={{ color: "red" }}>Error: {error}</p>}


                {message && <p style={{ color: "green" }}>{message}</p>}


                {!isLoading && user && <p>Witamy ponownie, {user.userName}!</p>}

                <label htmlFor="email">Type your email:</label>
                <input
                    className="text-black"
                    type="email"
                    name="email"
                    ref={email}
                    required
                    disabled={isLoading}
                />

                <label htmlFor="password">Type your password:</label>
                <input
                    className="text-black"
                    type="password"
                    name="password"
                    ref={password}
                    required
                    disabled={isLoading}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                >
                    Login
                </button>
            </form>
        </div>
    );
}
