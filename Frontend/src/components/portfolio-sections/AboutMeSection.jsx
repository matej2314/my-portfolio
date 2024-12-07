import { useContext } from "react";
import { DataContext } from '../../store/data-context';
import { motion } from 'framer-motion';
import { sectionsClasses } from "./portSections-classes";

export default function AboutMe() {
    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const about = dataCtx.fetchedData.data.about;

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
            <div className={`${sectionsClasses.greybox.greybox}`}>
                {!loading && about && Array.isArray(about) ? (
                    about.map((desc) => (
                        <p key={desc.id} className={sectionsClasses.service.paragraph}>{desc.aboutText}</p>
                    ))
                ) : (
                    <p>Brak opisu.</p>
                )}

            </div>
        </motion.div >
    )
}