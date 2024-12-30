import { useContext, useState } from "react";
import { DataContext } from '../../../store/data-context';
import AddPost from './data-forms/add-forms/AddPost';
import EditPosts from './data-forms/edit-forms/EditPosts';
import DeletePost from './data-forms/delete-forms/DeletePost';
import { cmsComponents } from "./cms-componenst-styles";


export default function ManagePosts() {
    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const posts = dataCtx.fetchedData.data.posts;
    const { refreshData } = dataCtx;

    const [actionType, setActionType] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    const handleAddPost = () => {
        setActionType("add");
    }

    const handleEditPost = (post) => {
        setSelectedPost(() => post);
        setActionType("edit");
    };

    const handleDeletePost = (post) => {
        setSelectedPost(() => post)
        setActionType("delete");
    };

    const handleCloseAction = () => {
        setActionType(null);
        refreshData();
    }

    if (actionType === "add") {
        return <AddPost onClose={handleCloseAction} />
    };

    if (actionType === 'edit') {
        return <EditPosts selectedPost={selectedPost} onClose={handleCloseAction} />
    };

    if (actionType === 'delete') {
        return <DeletePost selectedPost={selectedPost} onClose={handleCloseAction} />
    }

    return (
        <div className={cmsComponents.wrapper.wrapper}>
            <h2 className={cmsComponents.h2.h2}>Posts:</h2>
            <h3 className="text-sm">( to go back, press "Menu" button )</h3>
            <button onClick={handleAddPost} className={cmsComponents.addNew.addNew}>Add new</button>
            <ul className={cmsComponents.managePosts.ul}>
                {!loading && posts.length > 0 && Array.isArray(posts) ? (
                    posts.map((post) => {
                        return (
                            <li key={post.id}>
                                <h2>{post.title}</h2>
                                <p>{post.post_lead}</p>
                                <div className={cmsComponents.managePosts.buttonDiv}>
                                    <button className={cmsComponents.actionBtn.actionBtn} onClick={() => handleEditPost(post)}>Edit</button>
                                    <button className={cmsComponents.actionBtn.actionBtn} onClick={() => handleDeletePost(post)}>Delete</button>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <li className={cmsComponents.managePosts.noPostsLi}>No Posts</li>
                )}
            </ul>
        </div>
    )
}