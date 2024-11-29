import { useState } from "react";

import LoginForm from "./cms-components/LoginForm"
import RegisterForm from "./cms-components/RegisterForm";


export default function CmsIndexPage() {

    const [selectedForm, setSelectedForm] = useState(null);

    const selectForm = (form) => {
        setSelectedForm(() => form);
    }

    return (
        <main className="w-screen h-screen flex flex-row justify-center items-center bg-slate-800 pt-10">
            <div className="w-full h-full flex flex-col justify=center items-center gap-4">
                {selectedForm == null && <div className="w-fit h-fit flex flex-row justify-around text-white gap-4">
                    <button onClick={() => selectForm("login")} className="w-fit h-fit p-5 bg-black">
                        Log In
                    </button>
                    <button onClick={() => selectForm("register")} className="w-fit h-fit p-5 bg-black">
                        Register
                    </button>
                </div>}
                {selectedForm === 'login' ? <LoginForm /> : null}
                {selectedForm === 'register' ? <RegisterForm /> : null}
            </div>
        </main>
    );
};