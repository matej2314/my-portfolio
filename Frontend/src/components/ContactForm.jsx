import { useRef, useState } from "react";
import { toast } from 'react-toastify';
import ReactGA from 'react-ga4';

import SocialIcons from "./icons/SocialIcons.jsx";
import useSendRequest from '../hooks/useSendRequest.jsx';
import { compClasses } from "./components-classes.js";
import { mailUrl } from "../url.js";

export default function ContactForm() {
    const [status, setStatus] = useState("");
    const { sendRequest, result, isLoading, error } = useSendRequest();

    const name = useRef();
    const email = useRef();
    const messageSubject = useRef();
    const message = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.current.value || !email.current.value || !messageSubject.current.value || !message.current.value) {
            setStatus("Please fill out all fields");
            toast.error('Please fill out all fields');
            return;
        }

        try {
            const contactObj = {
                userName: name.current.value,
                userEmail: email.current.value,
                subject: messageSubject.current.value,
                userMessage: message.current.value,
            };


            await sendRequest({
                url: mailUrl,
                data: contactObj,
            });

            if (!error) {
                setStatus("Message sent successfully");
                toast.info('Message sent successfully');


                name.current.value = "";
                email.current.value = "";
                messageSubject.current.value = "";
                message.current.value = "";


                ReactGA.event('submit', {
                    category: 'Contact Form',
                    action: 'Form submitted',
                    label: 'Contact message sent',
                    elementId: 'contact-form'
                });

            } else {
                setStatus("Failed to send message. Try again");
                toast.error('Failed to send message. Try again.');
            }

        } catch (error) {
            setStatus("An error occurred. Please try again.");
            toast.error('An error occurred. Please try again.');
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
