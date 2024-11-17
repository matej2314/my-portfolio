import { compClasses } from "./components-classes.js";

export default function ContactForm() {

    return (
        <div id="contact-form-div" className={compClasses.contactForm.formDiv}>
        <form id="contact-form" className={compClasses.contactForm.contactForm}>
        <h2 className={compClasses.contactForm.h2}>Contact</h2>
        <label className={compClasses.contactForm.firstLabel} htmlFor="user-name">Type your name:</label>
        <input className={compClasses.contactForm.input} type="text" name="Name" id="user-name" />
        <label className={compClasses.contactForm.otherLabels} htmlFor="user-email">Type your email:</label>
        <input className={compClasses.contactForm.input} type="email" name="email" id="user-email" />
        <label className={compClasses.contactForm.otherLabels} htmlFor="mess-subject">Subject:</label>
        <input className={compClasses.contactForm.input}  type="text" name="mess-subject" id="mess-subject" />
        <label className={compClasses.contactForm.otherLabels} htmlFor="user-message">Your message:</label>
        <textarea className={compClasses.contactForm.textarea} name="user-message" id="user-message" />
        </form>
    </div>
    )
}