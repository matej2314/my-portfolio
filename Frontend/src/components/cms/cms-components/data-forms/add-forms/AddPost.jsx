import { useRef, useEffect, useContext } from "react";
import { toast } from 'react-toastify';

import { AuthContext } from '../../../../../store/auth-context';
import useSendRequest from "../../../../../hooks/useSendRequest";
import { requestUrl } from "../../../../../url";
import { addForms } from "../data-forms-classes";
import { handleToastAndClose } from "../../../../../utils/handleToastAndClose";

const addPostUrl = requestUrl.posts.new;

export default function AddPost({ onClose }) {

    const { sendRequest, error, result } = useSendRequest();
    const { user } = useContext(AuthContext);

    const postTitle = useRef();
    const postLead = useRef();
    const postContent = useRef();
    const postImgName = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.role !== 'admin') {
            toast.info('Sorry! You are not an admin!');
            return;
        }

        const values = {
            postTitle: postTitle.current.value,
            postLead: postLead.current.value,
            postContent: postContent.current.value,
            postImage: postImgName.current.value,
        };

        try {
            await sendRequest({
                url: addPostUrl,
                data: values,
            });

        } catch (error) {
            console.log('Failed to add new blog post.');
        }
    }

    useEffect(() => {
        const cleanupFn = handleToastAndClose(error, result, onClose, toast);

        return cleanupFn;
    }, [result, error, onClose]);

    return (
        <div className={addForms.addPost.wrapper}>
            <h2 className={addForms.h2.h2}>Add new blog post</h2>
            <h3 className="text-sm">( to go back, press "Manage" button )</h3>
            {error && <p className={addForms.message.error}>{error}</p>}
            <form className={addForms.addPost.form} onSubmit={handleSubmit}>
                <label className={addForms.label.label} htmlFor="post-title">Post title:</label>
                <input className={addForms.input.input} type="text" name="post-title" id="post-title" ref={postTitle} />
                <label className={addForms.label.label} htmlFor="post-lead">Post Lead:</label>
                <input className={addForms.input.input} type="text" name="post-lead" id="post-lead" ref={postLead} />
                <label className={addForms.label.label} htmlFor="post-content">Post content:</label>
                <textarea className={addForms.input.input} name="post-content" id="post-content" ref={postContent} />
                <label className={addForms.label.label} htmlFor="post-imageName">Post image name:</label>
                <input className={addForms.input.input} type="text" name="post-imageName" id="post-imageName" ref={postImgName} />
                <button className={addForms.btnSave.btnSave} type="submit">Save</button>
            </form>
        </div>
    )
}