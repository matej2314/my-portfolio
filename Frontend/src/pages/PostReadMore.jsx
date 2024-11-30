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
            <div className={pagesClasses.postReadMore.contentWrapper}>
                <div className={pagesClasses.postReadMore.div}>
                    <h2 className={pagesClasses.postReadMore.h2}>{selectedPost.title}</h2>
                    <img className="rounded-lg" src={`${blogImgs}/${selectedPost.post_imageName}`}></img>
                    <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
                </div>
            </div>
        </main>
    )
}