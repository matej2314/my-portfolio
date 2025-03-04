import { useRef, useState } from "react";
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';
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
                method: 'POST'
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
                <div className="relative w-full">
                    <input
                        className={compClasses.contactForm.input}
                        type="text"
                        name="Name"
                        id="user-name"
                        placeholder="Name"
                        onInput={(e) => e.target.nextSibling.style.display = e.target.value ? 'none' : 'block'}
                        ref={name}
                    />
                    <Icon
                        icon='mdi:user'
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl pointer-events-none"
                    />
                </div>


                <label className={compClasses.contactForm.otherLabels} htmlFor="user-email">Type your email:</label>
                <div className="relative w-full">
                    <input
                        className={compClasses.contactForm.input}
                        type="email"
                        name="email"
                        id="user-email"
                        placeholder="E-mail"
                        ref={email}
                        onInput={(e) => e.target.nextSibling.style.display = e.target.value ? 'none' : 'block'}
                    />
                    <Icon
                        icon='ix:e-mail'
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl pointer-events-none'
                    />
                </div>


                <label className={compClasses.contactForm.otherLabels} htmlFor="mess-subject">Subject:</label>
                <div className="relative w-full">
                    <input
                        className={compClasses.contactForm.input}
                        type="text"
                        name="mess-subject"
                        id="mess-subject"
                        placeholder="Subject"
                        ref={messageSubject}
                        onInput={(e) => e.target.nextSibling.style.display = e.target.value ? 'none' : 'block'}
                    />
                    <Icon
                        icon='ic:round-topic'
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl pointer-events-none'
                    />
                </div>


                <label className={compClasses.contactForm.otherLabels} htmlFor="user-message">Your message:</label>
                <div className="relative w-full">
                    <textarea
                        className={compClasses.contactForm.textarea}
                        name="user-message"
                        id="user-message"
                        placeholder="Message"
                        onInput={(e) => e.target.nextSibling.style.display = e.target.value ? 'none' : 'block'}
                        ref={message}
                    />
                    <Icon
                        icon='ic:baseline-message'
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl pointer-events-none`}
                    />
                </div>
                <button className={compClasses.contactForm.submitButton} type="submit">Send message</button>
            </form>
        </div>
    );
}
