import Footer from "./Footer";
import PortfolioHeader from "./portfolio-sections/PortfolioHeader.jsx";
import ServicesSection from "./portfolio-sections/ServicesSection.jsx";
import LanguagesSection from './portfolio-sections/LanguagesSection.jsx';
import SkillsSection from "./portfolio-sections/SkillsSection.jsx";
import { compClasses } from "./components-classes.js";

export default function Portfolio() {
    return (
        <>
            <div id="portfolio-wrapper" className={compClasses.portfolio.wrapper}>
               <PortfolioHeader />
                <ServicesSection />
                <LanguagesSection />
                <SkillsSection />
                <Footer />
            </div>
        </>
    );
}
