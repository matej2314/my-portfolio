import { useRef, useContext } from "react";
import { AuthContext } from '../../../store/auth-context';

export default function LoginForm() {
    const email = useRef(null);
    const password = useRef(null);

    const { login, isLoading, error, user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email.current.value, password.current.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-fit h-fit flex flex-col justify-center items-center gap-5 text-white">
                <h2>Log in</h2>
                {isLoading && <p>Sending data...</p>}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
                {user && <p>Witamy, {user.userName}!</p>}
                <label htmlFor="email">Type your email:</label>
                <input className="text-black" type="email" name="email" ref={email} required />
                <label htmlFor="password">Type your password:</label>
                <input className="text-black" type="password" name="password" ref={password} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}