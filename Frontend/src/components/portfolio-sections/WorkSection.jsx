import { sectionsClasses } from "./portSections-classes"


export default function WorkSection() {
    return (<>
        
        <h2 className={sectionsClasses.h2.h2}>Work</h2>
        <div className={sectionsClasses.workSection.sectionWrapper}>
          <div id="work--1" className={sectionsClasses.workSection.workWrapper}>
            <h3 className={sectionsClasses.service.h3}><span className={sectionsClasses.service.span}>#</span>SEO Copywriter</h3>
            <p className={sectionsClasses.service.paragraph}>test</p>
          </div>
            </div>
</>)
}