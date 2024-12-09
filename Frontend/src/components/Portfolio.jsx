import Footer from "./Footer";
import PortfolioHeader from "./portfolio-sections/PortfolioHeader.jsx";
import AboutMe from "./portfolio-sections/AboutMeSection.jsx";
import ServicesSection from "./portfolio-sections/ServicesSection.jsx";
import LanguagesSection from './portfolio-sections/LanguagesSection.jsx';
import SkillsSection from "./portfolio-sections/SkillsSection.jsx";
import Interests from "./portfolio-sections/InterestsSection.jsx";
import WorkSection from "./portfolio-sections/WorkSection.jsx";
import CoursesSection from "./portfolio-sections/CoursesSection.jsx";
import PortfolioFooter from "./portfolio-sections/PortfolioFooter.jsx";
import { compClasses } from "./components-classes.js";

export default function Portfolio({ isNested }) {
    return (
        <>
            <PortfolioHeader />
            <div id="portfolio-wrapper" className={isNested ? compClasses.portfolio.wrapper_nested : compClasses.portfolio.wrapper}>
                <AboutMe />
                <ServicesSection />
                <LanguagesSection />
                <SkillsSection />
                <CoursesSection />
                <Interests isNested={isNested} />
                <WorkSection />
                <PortfolioFooter />
                <Footer />
            </div>
        </>
    );
}
