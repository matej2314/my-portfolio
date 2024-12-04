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
            }, 2000)
        }

        username.current.value = "";
        email.current.value = "";
        password.current.value = "";
    };

    return (
        <div>
            <form
                className={cmsComponents.registerForm.form}
                onSubmit={handleSubmit}
            >
                <h2 className={cmsComponents.h2.h2}>Register</h2>
                {isLoading && <p>Sending data...</p>}
                {message && <p className={cmsComponents.message.positive}>{message}</p>}
                {error && <p className={cmsComponents.message.error}>Error: {error}</p>}

                <label htmlFor="username">Type your username:</label>
                <input
                    className={cmsComponents.input.input}
                    type="text"
                    id="username"
                    ref={username}
                    required
                />

                <label htmlFor="email">Type your email:</label>
                <input
                    className={cmsComponents.input.input}
                    type="email"
                    id="email"
                    ref={email}
                    required
                />

                <label htmlFor="password">Type your password:</label>
                <input
                    className={cmsComponents.input.input}
                    type="password"
                    id="password"
                    ref={password}
                    required
                />

                <button
                    className={cmsComponents.buttonSubmit.button}
                    type="submit"
                    disabled={isLoading}
                >
                    Register
                </button>
            </form>
        </div>
    );
}
