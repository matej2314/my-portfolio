import { useRef } from "react";
import Cookies from 'js-cookie'
import useSendRequest from "../../../hooks/UseSendRequest";

import { loginUrl } from "../../../url";

export default function LoginForm() {
    const email = useRef(null);
    const password = useRef(null);

    const { sendRequest, result, isLoading, error } = useSendRequest();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailValue = email.current?.value;
        const passwordValue = password.current?.value;


        const response = await sendRequest({
            url: loginUrl,
            data: { email: emailValue, password: passwordValue },
        });


        if (response && response.token) {
            Cookies.set('SESSID', { expires: 7, secure: false });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-fit h-fit flex flex-col justify-center items-center gap-5 text-white">
                <h2>Log in</h2>
                {isLoading && <p>Sending data...</p>}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
                {result && result.userName && <p>Witamy, {result.userName}!</p>}
                <label htmlFor="email">Type your email:</label>
                <input className="text-black" type="email" name="email" ref={email} required />
                <label htmlFor="password">Type your password:</label>
                <input className="text-black" type="password" name="password" ref={password} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
