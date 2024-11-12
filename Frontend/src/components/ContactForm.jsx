export default function ContactForm() {

    return (
        <div id="contact-form-div" className="w-full h-full text-gray-100 flex flex-col items-center rounded-md pt-24 overflow-hidden">
        <div id="contact-form" className="w-3/4  flex flex-col items-center font-black">
        <h2 className="text-5xl mb-8">Contact</h2>
        <label className="text-lg mb-2" htmlFor="user-name">Type your name:</label>
        <input className="w-5/12 text-stone-950 p-1" type="text" name="Name" id="user-name" />
        <label className="text-lg my-2" htmlFor="user-email">Type your email:</label>
        <input className="w-5/12 text-stone-950 p-1" type="email" name="email" id="user-email" />
        <label className="text-lg my-2" htmlFor="mess-subject">Subject:</label>
        <input className="w-5/12 text-stone-950 p-1"  type="text" name="mess-subject" id="mess-subject" />
        <label className="text-lg my-2" htmlFor="user-message">Your message:</label>
        <textarea className="w-5/12 h-32 text-stone-950 p-1 resize-none" name="user-message" id="user-message" />
        </div>
    </div>
    )
}