import { useState } from "react";
import useSendRequest from '../../../../../hooks/useSendRequest.jsx';
import { requestUrl } from "../../../../../url";
import { deleteForms } from "../data-forms-classes.js";
import ManagePosts from '../../ManagePosts.jsx';


const deletePostUrl = requestUrl.posts.delete;

export default function DeletePost({ selectedPost }) {
    const [denyDelete, setDenyDelete] = useState(false);
    const { sendRequest, result, error } = useSendRequest();

    const handleDeletePost = async () => {
        const postId = selectedPost.id;

        try {
            await sendRequest({
                url: deletePostUrl,
                method: "DELETE",
                data: { postId: postId }
            });
        } catch (error) {
            console.log('Nie udało się usunąć posta');
        }
    };

    const handleDenyDelete = () => {
        setDenyDelete(true);
    };

    if (denyDelete) {
        return <ManagePosts />
    }

    return (
        <div>
            <h2>Czy na pewno chcesz usunąć post?</h2>
            {selectedPost && <p>{selectedPost.id}</p>}
            {selectedPost && <p>{selectedPost.title}</p>}
            {selectedPost && <p>{selectedPost.post_lead}</p>}
            {result && result.message && <p>{result.message}</p>}
            {error && <p>{error}</p>}
            <div>
                <button onClick={handleDeletePost}>Tak</button>
                <button onClick={handleDenyDelete}>Nie</button>
            </div>
        </div>
    )
}