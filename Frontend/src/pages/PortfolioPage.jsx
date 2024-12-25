import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ReactGA from 'react-ga4';

import LeftSidebar from "../components/LeftSidebar";
import Portfolio from "../components/Portfolio";
import MobileMenu from "../components/mobileElements/MobileMenu";
import { pagesClasses } from "./pages-classes";

export default function PortfolioPage() {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            const scrollPercentage = (scrollPosition / (docHeight - windowHeight)) * 100;

            if (scrollPercentage >= 50 && !hasScrolled) {
                ReactGA.event('scroll-portfolio', {
                    category: 'scroll',
                    action: 'scroll_portfolio',
                    label: 'Scrolled 50% down',
                });
                setHasScrolled(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={pagesClasses.portfolioPage.portfolioWrapper}>
            {!isMobile ? <LeftSidebar /> : <MobileMenu />}
            <div className={pagesClasses.portfolioPage.portfolioContentWrapper}>
                <Portfolio isNested={false} />
            </div>
        </div>
    )
};

