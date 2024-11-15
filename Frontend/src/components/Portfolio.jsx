
import Footer from "./Footer"
import portfolioImage from '../assets/portfolio-header-image.png';
import portfolioPhoto from '../assets/portfolio-photo.jpg';
import ServicesSection from "./portfolio-sections/ServicesSection.jsx";
import LanguagesSection from './portfolio-sections/LanguagesSection.jsx';
import SkillsSection from "./portfolio-sections/SkillsSection.jsx";

export default function Portfolio() {
    
    return (
        <>
            <div id="portfolio-wrapper" className="w-full h-[100%] flex flex-col gap-0">
            <div id="portfolio-header" className="w-full flex justify-center">
            <div className="w-full h-56 bg-gradient-to-t from-bg-neutral-600/30 via-transparent to-transparent">
                <img className="h-56 w-full opacity-60 object-cover blur-[2px]" src={portfolioImage} alt="portfolio header background image"/>
                <img className="w-24 h-24 z-10 relative bottom-1/2 justify-self-center items-center justify-center rounded-full border-4 border-slate-300 -translate-y-1/2 hover:scale-[1.1]" src={portfolioPhoto} alt="my personal photo" />
                </div>
                </div>
            <ServicesSection />
            <LanguagesSection />
            <SkillsSection />
                <Footer />
                </div>
                </> )
}