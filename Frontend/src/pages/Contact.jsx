

import LeftSidebar from "../components/LeftSidebar"


export default function Contact() {
    return (
        <main className="w-screen h-dvh overflow-hidden flex justify-around flex-nowrap">
            <LeftSidebar />
            <div className="w-full h-content flex justify-center items-center mt-5">
                <div id="contact-form-div" className="w-full h-full bg-zinc-500/35 text-gray-300 flex flex-col items-center justify-stretch rounded-md pt-40">
                    <div id="contact-form" className="w-3/4  flex flex-col items-center">
                    <h2 className="text-5xl mb-8">Contact</h2>
                    <label className="text-lg mb-2" htmlFor="user-name">Type your name:</label>
                    <input className="w-2/4" type="text" name="Name" id="user-name" />
                    <label className="text-lg my-2" htmlFor="user-email">Type your email:</label>
                    <input type="email" name="email" id="user-email" />
                    <label className="text-lg my-2" htmlFor="mess-subject">Subject:</label>
                    <input type="text" name="mess-subject" id="mess-subject" />
                    <label className="text-lg my-2" htmlFor="user-message">Your message:</label>
                    <textarea name="user-message" id="user-message" />
                    </div>
                </div>
                </div>
        </main>
    )
}