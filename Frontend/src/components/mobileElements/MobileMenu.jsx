import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { cvURL } from "../../url";

export default function MobileMenu() {
    return (
        <div id="responsive-menu" className="">
            <ul className="w-fit h-fit flex flex-row justify-center items-center">
                <li>
                    <Link to="projects">Projects</Link>
                </li>
                <li>
                    <Link to="blog">Blog</Link>
                </li>
                <li>
                    <Link to="contact">Contact</Link>
                </li>
                <li>
                    <Link to={cvURL}>Download CV</Link>
                </li>
            </ul>
        </div>
    )
}