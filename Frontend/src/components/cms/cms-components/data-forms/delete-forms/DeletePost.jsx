import { useEffect, useContext } from "react";
import { toast } from 'react-toastify';

import { AuthContext } from "../../../../../store/auth-context.jsx";
import useSendRequest from '../../../../../hooks/useSendRequest.jsx';
import { requestUrl } from "../../../../../url";
import { deleteForms } from "../data-forms-classes.js";
import { handleToastAndClose } from "../../../../../utils/handleToastAndClose.js";

const deletePostUrl = requestUrl.posts.delete;

export default function DeletePost({ selectedPost, onClose }) {
    const { sendRequest, result, error } = useSendRequest();
    const { user } = useContext(AuthContext);

    const handleDeletePost = async () => {
        const postId = selectedPost.id;

        if (user.role !== 'admin') {
            toast.info('Sorry! You are not an admin!');
            return;
        }

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

    useEffect(() => {
        const cleanupFn = handleToastAndClose(error, result, onClose, toast);

        return cleanupFn;
    }, [result, error, onClose]);

    return (
        <div className={deleteForms.wrapper.wrapper}>
            <h2 className={deleteForms.h2.h2}>Czy na pewno chcesz usunąć post?</h2>
            {selectedPost && <p>{selectedPost.id}</p>}
            {selectedPost && <p>{selectedPost.title}</p>}
            {selectedPost && <p>{selectedPost.post_lead}</p>}
            {error && <p className={deleteForms.messages.error}>{error}</p>}
            <div className={deleteForms.buttonWrapper.buttonWrapper}>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDeletePost}>Tak</button>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={onClose}>Nie</button>
            </div>
        </div>
    )
}