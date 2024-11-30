import { useRef, useContext } from "react";
import { AuthContext } from "../../../store/auth-context";
import { cmsComponents } from './cms-componenst-styles';

export default function RegisterForm() {
    const username = useRef();
    const email = useRef();
    const password = useRef();

    const { register, isLoading, error, message } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !username.current.value.trim() ||
            !email.current.value.trim() ||
            !password.current.value.trim()
        ) {
            alert("Wszystkie pola muszą być wypełnione.");
            return;
        }

        const response = await register(username.current.value, email.current.value, password.current.value);

        if (response) {
            setTimeout(() => {
                window.location.reload();
            })
        }

        username.current.value = "";
        email.current.value = "";
        password.current.value = "";
    };

    return (
        <div>
            <form
                className="w-fit h-fit flex flex-col justify-center items-center text-white gap-4 text-xl"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl">Register</h2>
                {isLoading && <p>Sending data...</p>}
                {message && <p>{message}</p>}
                {error && <p className="text-red-700">Error: {error}</p>}

                <label htmlFor="username">Type your username:</label>
                <input
                    className="text-black"
                    type="text"
                    id="username"
                    ref={username}
                    required
                />

                <label htmlFor="email">Type your email:</label>
                <input
                    className="text-black"
                    type="email"
                    id="email"
                    ref={email}
                    required
                />

                <label htmlFor="password">Type your password:</label>
                <input
                    className="text-black"
                    type="password"
                    id="password"
                    ref={password}
                    required
                />

                <input type="submit" value="Register" />
            </form>
        </div>
    );
}
