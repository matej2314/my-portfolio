import { motion } from "framer-motion"

import { sectionsClasses } from "../portSections-classes"

export default function CategoryMenu({ handleCategoryClick }) {

    const categories = [
        { name: 'WebDev', label: 'WebDev' },
        { name: 'DevOps', label: 'DevOps' },
        { name: 'SEO', label: 'SEO' },
        { name: 'Security', label: 'Security' },
        { name: null, label: 'All' },
    ];

    return (
        <motion.ul
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ amount: 0.4, once: false }}
            className={sectionsClasses.buttonsList.buttonsList}
        >
            {categories.map((category, index) => {
                return <li
                    key={index}
                >
                    <button
                        onClick={() => handleCategoryClick(category.name)}
                        className={sectionsClasses.categoryButton.categoryButton}
                    >
                        {category.label}
                    </button>
                </li>
            })}
        </motion.ul>
    )
}