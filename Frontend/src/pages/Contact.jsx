import { useMediaQuery } from "react-responsive";

import ContactForm from "../components/ContactForm";
import LeftSidebar from "../components/LeftSidebar";
import MobileMenu from "../components/mobileElements/MobileMenu";
import { pagesClasses } from "./pages-classes";
import contactBg from '../assets/contact-bg.jpg';

export default function Contact() {

    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <main className={pagesClasses.contactPage.pageWrapper}>
            {!isMobile ? <LeftSidebar /> : <MobileMenu />}
            <div className={pagesClasses.contactPage.formWrapper}>
                <img src={contactBg} className={pagesClasses.contactPage.img}></img>
                <ContactForm />
            </div>
        </main>
    )
}