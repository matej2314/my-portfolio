import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { DataContext } from "../../store/data-context";

import Skill from "./internal-components/Skill";
import CategoryMenu from "./internal-components/CategoryMenu";
import { sectionsClasses } from "./portSections-classes";

export default function SkillsSection() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const skills = dataCtx.fetchedData.data.skills;

    function handleCategoryClick(category) {
        setSelectedCategory(category);
    }

    return (
        <motion.section
            id="skills-section"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className={sectionsClasses.skillsSection.sectionWrapper}
        >
            <div className={sectionsClasses.h2.titleWrapper}>
                <h2 className={sectionsClasses.h2.h2}>Skills</h2>
            </div>
            <ul className={sectionsClasses.skillsSection.ul}>
                <Skill skills={skills} loading={loading} selectedCategory={selectedCategory} />
            </ul>
            <CategoryMenu handleCategoryClick={handleCategoryClick} />
        </motion.section>
    );
}
