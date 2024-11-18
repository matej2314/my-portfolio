import { compClasses } from "./components-classes";

export default function Footer() {
    const endSign = "</msliwowski.net>";

    return (
        <div className={compClasses.footer.wrapper}>
            <footer className={compClasses.footer.footer}>
                <p className={compClasses.footer.paragraph}>Copyright@mateo2314</p>
                <span className={compClasses.footer.span}>{endSign}</span>
            </footer>
        </div>
    );
}
