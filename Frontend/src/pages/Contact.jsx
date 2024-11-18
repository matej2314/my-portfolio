import ContactForm from "../components/ContactForm";
import LeftSidebar from "../components/LeftSidebar";
import { pagesClasses } from "./pages-classes";

export default function Contact() {
    return (
        <main className={pagesClasses.contactPage.pageWrapper}>
            <LeftSidebar />
            <div className={pagesClasses.contactPage.formWrapper}>
                <ContactForm />
            </div>
        </main>
    )
}