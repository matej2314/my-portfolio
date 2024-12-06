import { useContext } from "react";
import { DataContext } from '../../store/data-context';
import { motion } from 'framer-motion';
import { sectionsClasses } from "./portSections-classes";

export default function AboutMe() {
    return (
        <motion.div
            id="aboutMe-section"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ amount: 0.4, once: false }}
            className={sectionsClasses.aboutMe.wrapper}
        >
            <div className={sectionsClasses.h2.titleWrapper}>
                <h2 className={sectionsClasses.h2.h2}>About Me</h2>
            </div>
            <div className={sectionsClasses.greybox.greybox}>
                <p className={sectionsClasses.service.paragraph}>About me text</p>
            </div>
        </motion.div >
    )
}