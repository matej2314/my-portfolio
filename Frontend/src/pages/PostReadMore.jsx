import { useContext } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

import { DataContext } from "../store/data-context";
import LeftSidebar from '../components/LeftSidebar';
import { pagesClasses } from "./pages-classes";
import { blogImgs } from "../url";

export default function PostReadMore() {
    const { id } = useParams();

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const posts = dataCtx.fetchedData.data.posts || [];

    const selectedPost = id === null ? '' : posts.find((post) => post.id === id);

    if (!selectedPost) {
        return <p>Post not found.</p>
    }

    return (
        <main className={pagesClasses.contactPage.pageWrapper}>
            <LeftSidebar />
            <div className="w-full h-content flex flex-col justify-start items-center mt-5 mr-9 p-5 bg-neutral-600/30">
                <div className=" w-3/4 h- flex flex-col bg-neutral-100 py-2 px-5 gap-4">
                    <h2 className="w-full flex flex-row justify-center text-black font-bold text-2xl underline underline-offset-2">{selectedPost.title}</h2>
                    <img className="rounded-lg" src={`${blogImgs}/${selectedPost.post_imageName}`}></img>
                    <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
                </div>
            </div>
        </main>
    )
}