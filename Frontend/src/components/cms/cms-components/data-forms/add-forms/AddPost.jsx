import { useRef } from "react";
import useSendRequest from "../../../../../hooks/useSendRequest";
import { requestUrl } from "../../../../../url";
import { addForms } from "../data-forms-classes";

const addPostUrl = requestUrl.posts.new;

export default function AddPost() {

    const { sendRequest, error, result } = useSendRequest();

    const postTitle = useRef();
    const postLead = useRef();
    const postContent = useRef();
    const postImgName = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            console.log('Nie udało się dodać nowego posta');
        }
    }

    return (
        <div className={addForms.addPost.wrapper}>
            <h2 className={addForms.h2.h2}>Add new blog post</h2>
            {result && result.message && <p>{result.message}</p>}
            {error && <p>{error}</p>}
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