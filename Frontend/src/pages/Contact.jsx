import ContactForm from "../components/ContactForm";
import LeftSidebar from "../components/LeftSidebar";

export default function Contact() {
    return (
        <main className="w-screen h-dvh overflow-hidden flex justify-around flex-nowrap">
            <LeftSidebar />
            <div className="w-full h-content flex justify-center mt-5 bg-contact-image bg-cover mr-9 bg-opacity-75">
               <ContactForm />
                </div>
        </main>
    )
}