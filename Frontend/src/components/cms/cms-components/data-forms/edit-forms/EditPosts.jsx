import { useRef, useContext } from "react";
import { DataContext } from "../../../../../store/data-context";
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';

const editPostUrl = requestUrl.posts.put;

export default function EditPosts({ selectedPost }) {
    const postId = useRef(selectedPost.id || '');
    const postTitle = useRef(selectedPost.title || '');
    const postLead = useRef(selectedPost.post_lead || '');
    const postContent = useRef(selectedPost.content || '');
    const postImage = useRef(selectedPost.postImage || '');
    const { sendRequest, result, error } = useSendRequest();
    const { refreshData } = useContext(DataContext);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedPost = {
            postId: postId.current.value,
            postTitle: postTitle.current.value,
            postLead: postLead.current.value,
            postContent: postContent.current.value,
            postImage: postImage.current.value > 0 ? postImage.current.value : null,
        };

        try {
            await sendRequest({
                url: editPostUrl,
                method: "PUT",
                data: updatedPost
            })
        } catch (error) {
            console.log('Nie udało się edytować posta')
        }
    }

    return (
        <div>
            <h2>Edit selected post:</h2>
            {result && result.message && <p>{result.message}</p>}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="post-id">Post id: </label>
                <input type="text" name="post-id" id="post-id" defaultValue={selectedPost.id} readOnly />
                <label htmlFor="post-title">Post title:</label>
                <input type="text" name="post-title" id="post-title" ref={postTitle} defaultValue={selectedPost.title} />
                <label htmlFor="post-lead">Post lead:</label>
                <textarea name="post-lead" id="post-lead" ref={postLead} defaultValue={selectedPost.post_lead} />
                <label htmlFor="post-content">Post content:</label>
                <textarea name="post-content" id="post-content" ref={postContent} defaultValue={selectedPost.content} />
                <label htmlFor="post-image">Post image name:</label>
                <input type="text" name="post-image" id="post-image" ref={postImage} defaultValue={selectedPost.postImage} />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}