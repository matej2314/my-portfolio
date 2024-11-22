import { motion } from 'framer-motion';

import { langs } from '../../langs.js';
import { sectionsClasses } from './portSections-classes.js';

export default function LanguagesSection() {

    return (
        <motion.section
            id="languages"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className={sectionsClasses.languages.section}
        >
            <h2 className={sectionsClasses.h2.h2}>Languages</h2>
            <ul className={sectionsClasses.languages.ul}>
                {langs.map((lang) => {
                    return <motion.li
                        key={lang.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ amount: 0.4, once: false }}
                        className={sectionsClasses.languages.li}
                    >
                        {lang.lang}
                        <span className={sectionsClasses.languages.span}>
                            {lang.lvl}
                        </span>
                    </motion.li>
                })
                }


            </ul>
        </motion.section>
    )
}