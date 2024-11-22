import { motion } from "framer-motion"

import { sectionsClasses } from "./portSections-classes"


export default function WorkSection() {
  return (<>
    <div className={sectionsClasses.h2.titleWrapper}>
      <h2 className={sectionsClasses.h2.h2}>Work</h2>
    </div>
    <div className={sectionsClasses.workSection.sectionWrapper}>
      <div id="work--1" className={sectionsClasses.workSection.workWrapper}>
        <h3 className={sectionsClasses.h3.h3}><span className={sectionsClasses.service.span}>#</span>SEO Copywriter</h3>
        <p className={sectionsClasses.service.paragraph}>I worked as an SEO Copywriter and Junior SEO Specialist. My responsibilities included creating SEO-friendly content, on-site and off-site optimization, and initial preparation of online campaigns.</p>
      </div>
    </div>
  </>)
}