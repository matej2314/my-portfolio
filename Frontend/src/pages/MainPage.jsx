import LeftSidebar from "../components/LeftSidebar";
import MainLeftContainer from "../components/MainLeftContainer";
import MainRightContainer from "../components/MainRightContainer";
import { pagesClasses } from "./pages-classes";



export default function MainPage() {

    return (
        <main className={pagesClasses.mainPage.wrapper}>
            <LeftSidebar />
            <div id="content" className={pagesClasses.mainPage.contentWrapper}>
                <MainLeftContainer />
                <MainRightContainer />
            </div>
        </main>
    );
};