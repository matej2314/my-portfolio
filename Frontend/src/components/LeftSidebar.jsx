import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Menu from "./Menu";
import { compClasses } from "./components-classes";

export default function LeftSidebar() {
    const codeSign = "<msliwowski.net>";
    return (
        <motion.div
            id="left-sidebar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", damping: 40, stiffness: 60 }}
            className={compClasses.leftSidebar.leftSidebar}
        >
            <Link to="/contact" className={compClasses.leftSidebar.link}><span className={compClasses.leftSidebar.span}>{codeSign}</span></Link>
            <Menu />
        </motion.div>
    )
}