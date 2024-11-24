import { useContext } from "react";
import { DataContext } from '../store/data-context';

import LeftSidebar from "../components/LeftSidebar";
import { pagesClasses } from "./pages-classes";

export default function BlogPage() {

    const dataCtx = useContext(DataContext);
    const posts = dataCtx.fetchedData.data.posts;


    return (
        <div className={pagesClasses.blogPage.pageWrapper}>
            <LeftSidebar />
            <div className={pagesClasses.blogPage.contentWrapper}>
                <p className="text-gray-200 text-4xl">Work in progress</p>
            </div>
        </div>
    )
}