import { useRef, useState } from "react";
import SocialIcons from "./icons/SocialIcons.jsx";
import { compClasses } from "./components-classes.js";

export default function ContactForm() {
    const name = useRef();
    const email = useRef();
    const messageSubject = useRef();
    const message = useRef();

    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userName = name.current.value;
        const userEmail = email.current.value;
        const subject = messageSubject.current.value;
        const userMessage = message.current.value;

        if (!userName || !userEmail || !subject || !userMessage) {
            setStatus("Please fill out all fields");
            return;
        }

        try {
            const response = await fetch("", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName, userEmail, subject, userMessage }),
            });

            if (response.ok) {
                setStatus("Message sent successfully");

                name.current.value = "";
                email.current.value = "";
                messageSubject.current.value = "";
                message.current.value = "";
            } else {
                setStatus("Failed to send message. Try again");
            }

        } catch (error) {
            console.error("Error:", error.message);
            setStatus("An error occurred. Please try again.");
        }
    };

    return (
        <div id="contact-form-div" className={compClasses.contactForm.formDiv}>
            <form id="contact-form" className={compClasses.contactForm.contactForm} onSubmit={handleSubmit}>
                <h2 className={compClasses.contactForm.h2}>Contact</h2>
                <h3 className={compClasses.contactForm.h3}>{status}</h3>
                <SocialIcons mailSize={34} iconsSize={34} />

                <label className={compClasses.contactForm.firstLabel} htmlFor="user-name">Type your name:</label>
                <input
                    className={compClasses.contactForm.input}
                    type="text"
                    name="Name"
                    id="user-name"
                    ref={name}
                />

                <label className={compClasses.contactForm.otherLabels} htmlFor="user-email">Type your email:</label>
                <input
                    className={compClasses.contactForm.input}
                    type="email"
                    name="email"
                    id="user-email"
                    ref={email}
                />

                <label className={compClasses.contactForm.otherLabels} htmlFor="mess-subject">Subject:</label>
                <input
                    className={compClasses.contactForm.input}
                    type="text"
                    name="mess-subject"
                    id="mess-subject"
                    ref={messageSubject}
                />

                <label className={compClasses.contactForm.otherLabels} htmlFor="user-message">Your message:</label>
                <textarea
                    className={compClasses.contactForm.textarea}
                    name="user-message"
                    id="user-message"
                    ref={message}
                />

                <button className={compClasses.contactForm.submitButton} type="submit">Send message</button>
            </form>
        </div>
    );
}
