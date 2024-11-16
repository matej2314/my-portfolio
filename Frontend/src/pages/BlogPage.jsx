import LeftSidebar from "../components/LeftSidebar";
import { pagesClasses } from "./pages-classes";

export default function BlogPage() {
    return (
        <div className={pagesClasses.blogPage.pageWrapper}>
            <LeftSidebar />
            <div className={pagesClasses.blogPage.contentWrapper}>
                <p className="text-gray-200 text-4xl">Work in progress</p>
            </div>
        </div>
    )
}