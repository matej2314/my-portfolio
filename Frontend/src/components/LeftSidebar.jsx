import { Link } from "react-router-dom";
import Menu from "./Menu";
import { compClasses } from "./components-classes";

export default function LeftSidebar() {
    const codeSign = "<msliwowski.net>";
    return (
        <div id="left-sidebar" className={compClasses.leftSidebar.leftSidebar}>
            <Link to="/contact" className={compClasses.leftSidebar.link}><span className={compClasses.leftSidebar.span}>{codeSign}</span></Link>
            <Menu />
        </div>
    )
}