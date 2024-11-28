import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { cvURL } from "../../url";
import { mobileElements } from "./mobileElements-classes";

export default function MobileMenu() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prevState) => !isOpen);
    };

    return (
        <div id="responsive-menu" className={mobileElements.mobileMenu.wrapper}>
            <button
                onClick={toggleMenu}
                className={mobileElements.mobileMenu.button}
            >
                Menu
            </button>
            {isOpen && (
                <motion.ul
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 20 }}
                    transition={{ duration: 0.3 }}
                    className={mobileElements.mobileMenu.ul}>
                    <li className={mobileElements.mobileMenu.li}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={mobileElements.mobileMenu.li}>
                        <Link to="/projects">Projects</Link>
                    </li>
                    <li className={mobileElements.mobileMenu.li}>
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li className={mobileElements.mobileMenu.li}>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li className={mobileElements.mobileMenu.li}>
                        <Link to={cvURL}>Download CV</Link>
                    </li>
                </motion.ul>
            )}
        </div>
    )
}