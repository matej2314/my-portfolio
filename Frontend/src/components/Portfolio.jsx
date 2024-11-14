import Footer from "./Footer"
import portfolioImage from '../assets/portfolio-header-image.png';
import ServicesSection from "./portfolio-sections/ServicesSection.jsx";
import LanguagesSection from './portfolio-sections/LanguagesSection.jsx';

export default function Portfolio() {
    
    return (
        <>
            <div className="w-full bg-gradient-to-t from-bg-neutral-600/30 via-transparent to-transparent"><img className="h-80 w-full opacity-60 object-cover blur-[2px]" src={portfolioImage} />
            </div>
            <ServicesSection />
           <LanguagesSection />
                <Footer />
                </> )
}