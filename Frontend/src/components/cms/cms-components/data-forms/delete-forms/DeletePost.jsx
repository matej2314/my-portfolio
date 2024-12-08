import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../../store/auth-context.jsx";
import useSendRequest from '../../../../../hooks/useSendRequest.jsx';
import { requestUrl } from "../../../../../url";
import { deleteForms } from "../data-forms-classes.js";
import ManagePosts from '../../ManagePosts.jsx';


const deletePostUrl = requestUrl.posts.delete;

export default function DeletePost({ selectedPost, onClose }) {
    const [denyDelete, setDenyDelete] = useState(false);
    const { sendRequest, result, error } = useSendRequest();
    const { user } = useContext(AuthContext);

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
        onClose();
    }

    useEffect(() => {
        if (result && !error) {
            const timer = setTimeout(() => {
                onClose();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [error, result, onClose]);



    return (
        <div className={deleteForms.wrapper.wrapper}>
            <h2 className={deleteForms.h2.h2}>Czy na pewno chcesz usunąć post?</h2>
            {selectedPost && <p>{selectedPost.id}</p>}
            {selectedPost && <p>{selectedPost.title}</p>}
            {selectedPost && <p>{selectedPost.post_lead}</p>}
            {result && result.message && <p className={deleteForms.messages.result}>{result.message}</p>}
            {error && <p className={deleteForms.messages.error}>{error}</p>}
            <div className={deleteForms.buttonWrapper.buttonWrapper}>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDeletePost} disabled={user.role !== 'admin'}>Tak</button>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDenyDelete}>Nie</button>
            </div>
        </div>
    )
}