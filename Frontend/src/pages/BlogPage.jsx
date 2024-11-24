import { useContext } from "react";
import { DataContext } from '../store/data-context';
import { Link } from "react-router-dom";

import LeftSidebar from "../components/LeftSidebar";
import { pagesClasses } from "./pages-classes";
import { blogImgs } from "../url";


export default function BlogPage() {
    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const posts = dataCtx.fetchedData.data.posts || [];

    return (
        <div className={pagesClasses.blogPage.pageWrapper}>
            <LeftSidebar />
            <div className={pagesClasses.blogPage.contentWrapper}>
                <ul className="w-full flex flex-row justify-start items-center p-3">
                    {loading ? (
                        <p className="hidden">Loading...</p>
                    ) : posts.length === 0 ? (
                        <p className="w-full flex flex-row justify-center font-bold text-5xl text-slate-300">No blog posts.</p>
                    ) : (
                        posts.map((post) => (
                            <li key={post.id}>
                                <div id="blog-post" className="w-fit flex flex-col items-center gap-3 bg-neutral-400 p-2 rounded-md border-4 border-stone-500">
                                    <img className="max-w-[30rem]" src={`${blogImgs}/${post.post_imageName}`} alt={post.title}></img>
                                    <h2 className="w-fit h-fit text-black font-bold text-lg">{post.title}</h2>
                                    <p className="w-fit text-black">{post.post_lead}</p>
                                    <Link to={`/post/more/${post.id}`}>Read More</Link>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}
