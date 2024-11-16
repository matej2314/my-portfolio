import { useContext } from "react"
import { DataContext } from "../../store/data-context"

import Skill from "./Skill"
import { sectionsClasses } from "./portSections-classes"

export default function SkillsSection() {

    // const dataCtx = useContext(DataContext);


    return (
        <section id="skills-section" className={sectionsClasses.skillsSection.sectionWrapper}>
            <h2 className={sectionsClasses.skillsSection.h2}>Skills</h2>
            <ul className={sectionsClasses.skillsSection.ul}>
               <Skill />
            </ul>
        </section>
 )
}