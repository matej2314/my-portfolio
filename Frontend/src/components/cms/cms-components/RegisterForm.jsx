import { useRef } from "react"
import useSendRequest from "../../../hooks/UseSendRequest"

import { registerUrl } from "../../../url"


export default function RegisterForm() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const role = 'user';

    const { sendRequest, result, isLoading, error } = useSendRequest();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nameValue = username.current.value;
        const emailValue = email.current.value;
        const passwordValue = password.current.value;

        await sendRequest({
            url: registerUrl,
            data: {
                reg_username: nameValue,
                reg_email: emailValue,
                reg_password: passwordValue,
                role: role,
            }
        });

        username.current.value = '';
        email.current.value = '';
        password.current.value = '';
    }

    return (
        <div>
            <form className="w-fit h-fit flex flex-col justify-center items-center text-white gap-4 text-xl" onSubmit={handleSubmit}>
                <h2 className="text-2xl">Register</h2>
                {isLoading && <p>Sending data...</p>}
                {result && result.message && <p>{result.message}</p>}
                {error && <p className="text-red-700">Error: {error}</p>}
                <label htmlFor="">Type your username:</label>
                <input className="text-black" type="text" ref={username} required />
                <label htmlFor="">Type your email</label>
                <input className="text-black" type="email" name="" id="" ref={email} required />
                <label htmlFor="">Type your password:</label>
                <input className="text-black" type="password" required ref={password} />
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}