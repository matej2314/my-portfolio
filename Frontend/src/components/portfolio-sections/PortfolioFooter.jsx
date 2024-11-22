import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import { sectionsClasses } from "./portSections-classes"



export default function PortfolioFooter() {

    return (
        <>
            <div className={sectionsClasses.portfolioFooter.wrapper}>
                <p className={sectionsClasses.portfolioFooter.firstParagraph}>Thank you very much for your attention!</p>
                <p className={sectionsClasses.portfolioFooter.secondParagraph}>Check my <Link to="blog" className={sectionsClasses.portfolioFooter.link}>blog</Link> and Social Media profiles.</p>
            </div>

        </>
    )
};