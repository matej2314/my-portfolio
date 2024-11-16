import { sectionsClasses } from "./portSections-classes"

export default function Skill({ skills, loading }) {
    return (
        <>
        <li className={sectionsClasses.skill.li}>HTML, CSS, JS<span className={sectionsClasses.skill.span}>advanced</span></li>
        <li className={sectionsClasses.skill.li}>React.js<span className={sectionsClasses.skill.span}>basic</span></li>
        <li className={sectionsClasses.skill.li}>Node.js<span className={sectionsClasses.skill.span}>pre intermediate</span></li>
        </>
    )
       
}