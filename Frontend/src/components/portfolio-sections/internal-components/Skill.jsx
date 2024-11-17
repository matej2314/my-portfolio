import { sectionsClasses } from "../portSections-classes";

export default function Skill({ skills, loading, selectedCategory }) {
    
    const filteredSkills = selectedCategory ? skills.filter(skill => skill.category === selectedCategory) : skills;

    return (
        <>
            {!loading && filteredSkills && Array.isArray(filteredSkills) ? (
                filteredSkills.map(skill => (
                    <li key={skill.id} className={sectionsClasses.li.li}>
                        {skill.title}<span className={sectionsClasses.skill.span}>{skill.level}</span>
                    </li> 
                ))
            ) : (
                <p>Brak danych</p>
            )}
        </>
    );
}
