import Footer from "./Footer";
import PortfolioHeader from "./portfolio-sections/PortfolioHeader.jsx";
import ServicesSection from "./portfolio-sections/ServicesSection.jsx";
import LanguagesSection from './portfolio-sections/LanguagesSection.jsx';
import SkillsSection from "./portfolio-sections/SkillsSection.jsx";

export default function Portfolio() {
    return (
        <>
            <div id="portfolio-wrapper" className="w-full h-[100%] flex flex-col gap-0">
               <PortfolioHeader />
                <ServicesSection />
                <LanguagesSection />
                <SkillsSection />
                <Footer />
            </div>
        </>
    );
}
