import { motion } from "framer-motion"

import { sectionsClasses } from "./portSections-classes"


export default function WorkSection() {
  return (<>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className={sectionsClasses.workSection.sectionWrapper}
    >
      <div className={sectionsClasses.h2.titleWrapper}>
        <h2 className={sectionsClasses.h2.h2}>Work</h2>
      </div>
      <div className={sectionsClasses.workSection.contentWrapper}>
        <motion.div
          id="work--1"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ amount: 0.4, once: false }}
          className={sectionsClasses.greybox.greybox}
        >
          <h3 className={sectionsClasses.h3.h3}><span className={sectionsClasses.service.span}>#</span>SEO Copywriter</h3>
          <p className="w-full h-full flex justify-center items-center mt-2 leading-relaxed text-justify">I worked as an SEO Copywriter and Junior SEO Specialist. My responsibilities included creating SEO-friendly content, on-site and off-site optimization, and initial preparation of online campaigns.</p>
        </motion.div>
      </div>
    </motion.div>
  </>)
}