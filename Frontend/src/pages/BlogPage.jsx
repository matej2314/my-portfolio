import { useContext } from "react";
import { DataContext } from '../store/data-context';

import LeftSidebar from "../components/LeftSidebar";
import { pagesClasses } from "./pages-classes";
import { blogImgs } from "../url";


export default function BlogPage() {

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const posts = dataCtx.fetchedData.data.posts || [];

    console.log(posts)
    return (
        <div className={pagesClasses.blogPage.pageWrapper}>
            <LeftSidebar />
            <div className={pagesClasses.blogPage.contentWrapper}>
                <ul className="w-full flex flex-row justify-between items-center">
                    {!loading && posts && Array.isArray(posts) ? (
                        posts.map((post) => (
                            <li key={post.id}>
                                <div id="blog-post" className="w-full flex flex-col items-center gap-3 bg-neutral-400 p-10">
                                    <img className="max-w-96" src={`${blogImgs}/${post.post_imageName}`}></img>
                                    <h2 className="text-black font-bold text-lg">{post.title}</h2>
                                    <p className="w-full text-black">{post.content}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No blog posts.</p>
                    )}
                </ul>
            </div>
        </div>
    )
}