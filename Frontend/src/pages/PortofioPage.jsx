import LeftSidebar from "../components/LeftSidebar";
import Portfolio from "../components/Portfolio";
import { pagesClasses } from "./pages-classes";


export default function PortfolioPage() {
    return (
        <div className={pagesClasses.portfolioPage.portfolioWrapper}>
            <LeftSidebar />
            <div className={pagesClasses.portfolioPage.portfolioContentWrapper}>
                    <Portfolio/>
                    </div>
                </div>
    )
};

