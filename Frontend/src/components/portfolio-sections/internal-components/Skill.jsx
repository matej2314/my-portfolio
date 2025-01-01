import { motion } from 'framer-motion';
import { Icon } from "@iconify/react";
import { sectionsClasses } from "../portSections-classes";

export default function Skill({ skills, loading, selectedCategory }) {

    const filteredSkills = Array.isArray(skills) && selectedCategory
        ? skills.filter(skill => skill.category === selectedCategory)
        : skills;

    return (
        <>
            {!loading && filteredSkills && Array.isArray(filteredSkills) && filteredSkills.length > 0 ? (
                filteredSkills.map(skill => (
                    <motion.li
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ amount: 0.4, once: false }}
                        className={sectionsClasses.skill.li}
                    >
                        {skill.icon && (
                            <span className={sectionsClasses.skill.span}>
                                <Icon
                                    icon={skill.icon}
                                    width={40}
                                    height={40}
                                    color={skill.iconColor || null}
                                />
                            </span>
                        )}
                        {skill.title}
                    </motion.li>
                ))
            ) : (
                <p>Brak danych</p>
            )}
        </>
    );
}
