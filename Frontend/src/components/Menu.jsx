import { NavLink } from "react-router-dom"

import { compClasses } from "./components-classes"

export default function Menu() {

    return (
        <menu className={compClasses.menu.menu}>
            <nav>
                <ul className={compClasses.menu.ul}>
                    <li><NavLink className={compClasses.menu.link} to="/">Home</NavLink></li>
                    <li><NavLink className={compClasses.menu.link} to="/portfolio">Portfolio</NavLink></li>
                    <li><NavLink className={compClasses.menu.link} to="/contact">Contact</NavLink></li>
                    <li><NavLink className={compClasses.menu.link} to="/blog">Blog</NavLink></li>
                    <li><button>Download CV</button></li>
                </ul>
            </nav>
        </menu>
    )
}