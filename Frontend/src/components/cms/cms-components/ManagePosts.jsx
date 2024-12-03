import { useContext, useState } from "react";
import { DataContext } from "../../../store/data-context";

import AddPost from './data-forms/add-forms/AddPost';
import EditPosts from './data-forms/edit-forms/EditPosts';
import DeletePost from './data-forms/delete-forms/DeletePost';


export default function ManagePosts() {
    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const posts = dataCtx.fetchedData.data.posts;

    const [actionType, setActionType] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    const handleAddPost = () => {
        setActionType("add");
    }


    const handleEditPost = (post) => {
        setSelectedPost(post);
        setActionType("edit");
    };

    const handleDeletePost = (post) => {
        setSelectedPost(post)
        setActionType("delete");
    };

    if (actionType === "add") {
        return <AddPost />
    };

    if (actionType === 'edit') {
        return <EditPosts selectedPost={selectedPost} />
    };

    if (actionType === 'delete') {
        return <DeletePost selectedPost={selectedPost} />
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-start gap-3 text-white">
            <h2 className="text-2xl font-bold">Posts:</h2>
            <button onClick={handleAddPost} className="text-xl">Add new</button>
            <ul className="w-full h-fit flex flex-col justify-center items-center">
                {!loading && posts.length > 0 && Array.isArray(posts) ? (
                    posts.map((post) => {
                        return (
                            <li key={post.id}>
                                <h2>{post.title}</h2>
                                <p>{post_lead}</p>
                                <div>
                                    <button onClick={() => handleEditPost(post)}>Edit</button>
                                    <button onClick={() => handleDeletePost(post)}>Delete</button>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <li className="text-2xl text-white">No Posts</li>
                )}
            </ul>
        </div>
    )
}