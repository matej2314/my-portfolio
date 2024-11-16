import { compClasses } from "./components-classes";

export default function Footer() {
    const endSign = "</msliwowski.net>";

    return (
        <footer className={compClasses.footer.footer}><p className={compClasses.footer.paragraph}>Made by mateo2314</p><span className={compClasses.footer.span}>{endSign}</span></footer>
    )
}