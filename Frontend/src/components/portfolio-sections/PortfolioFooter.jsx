import { sectionsClasses } from "./portSections-classes"

import { Link } from "react-router-dom"

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