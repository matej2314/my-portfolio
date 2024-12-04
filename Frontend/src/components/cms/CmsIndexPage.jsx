import { useState } from "react";

import LoginForm from "./cms-components/LoginForm"
import RegisterForm from "./cms-components/RegisterForm";
import { cmsPages } from './cmsPages-styles';

export default function CmsIndexPage() {

    const [selectedForm, setSelectedForm] = useState(null);

    const selectForm = (form) => {
        setSelectedForm(() => form);
    }

    return (
        <main className={cmsPages.indexPage.main}>
            <div className={cmsPages.indexPage.mainDiv}>
                <h2 className="text-4xl mb-8">msliwowski.net</h2>
                {selectedForm == null && <div className={cmsPages.indexPage.buttonWrapper}>
                    <button onClick={() => selectForm("login")} className={cmsPages.indexPage.button}>
                        Log In
                    </button>
                    <button onClick={() => selectForm("register")} className={cmsPages.indexPage.button}>
                        Register
                    </button>
                </div>}
                {selectedForm === 'login' ? <LoginForm /> : null}
                {selectedForm === 'register' ? <RegisterForm /> : null}
            </div>
        </main>
    );
};