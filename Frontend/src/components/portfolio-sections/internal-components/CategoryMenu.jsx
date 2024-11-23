import { motion } from "framer-motion"

import { sectionsClasses } from "../portSections-classes"

export default function CategoryMenu({ handleCategoryClick }) {

    return (
        <motion.ul
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ amount: 0.4, once: false }}
            className={sectionsClasses.buttonsList.buttonsList}
        >
            <li><button onClick={() => handleCategoryClick("WebDev")} className={sectionsClasses.categoryButton.categoryButton}>WebDev</button></li>
            <li><button onClick={() => handleCategoryClick("DevOps")} className={sectionsClasses.categoryButton.categoryButton}>DevOps</button></li>
            <li><button onClick={() => handleCategoryClick("SEO")} className={sectionsClasses.categoryButton.categoryButton}>SEO</button></li>
            <li><button onClick={() => handleCategoryClick("Security")} className={sectionsClasses.categoryButton.categoryButton}>Security</button></li>
            <li><button onClick={() => handleCategoryClick(null)} className={sectionsClasses.categoryButton.categoryButton}>All</button></li>
        </motion.ul>
    )
}