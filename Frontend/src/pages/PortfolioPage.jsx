import { useMediaQuery } from "react-responsive";

import LeftSidebar from "../components/LeftSidebar";
import Portfolio from "../components/Portfolio";
import MobileMenu from "../components/mobileElements/MobileMenu";
import { pagesClasses } from "./pages-classes";


export default function PortfolioPage() {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <div className={pagesClasses.portfolioPage.portfolioWrapper}>
            {!isMobile ? <LeftSidebar /> : <MobileMenu />}
            <div className={pagesClasses.portfolioPage.portfolioContentWrapper}>
                <Portfolio isNested={false} />
            </div>
        </div>
    )
};

