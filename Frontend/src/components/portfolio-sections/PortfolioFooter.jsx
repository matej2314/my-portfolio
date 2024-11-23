import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import { sectionsClasses } from "./portSections-classes"



export default function PortfolioFooter() {

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ amount: 0.4, once: false }}
                className={sectionsClasses.portfolioFooter.wrapper}
            >
                <p className={sectionsClasses.portfolioFooter.firstParagraph}>
                    Thank you very much for your attention!
                </p>
                <p className={sectionsClasses.portfolioFooter.secondParagraph}>
                    Check my <Link to="blog" className={sectionsClasses.portfolioFooter.link}>blog</Link> and Social Media profiles.
                </p>
            </motion.div>

        </>
    )
};