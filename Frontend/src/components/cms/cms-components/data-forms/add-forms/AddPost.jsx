import { useRef, useContext } from "react";
import { DataContext } from '../../../../../store/data-context';
import useSendRequest from "../../../../../hooks/useSendRequest";
import { requestUrl } from "../../../../../url";

const addPostUrl = requestUrl.posts.new;

export default function AddPost() {

    const { sendRequest, error, result } = useSendRequest();
    const { refreshData } = useContext(DataContext);

    const postTitle = useRef();
    const postLead = useRef();
    const postContent = useRef();
    const postImgName = useRef;

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
                data: values
            });

        } catch (error) {
            console.log('Nie udało się dodać nowego posta');
        }
    }

    return (
        <div>
            <h2>Add new blog post</h2>
            {result && result.message && <p>{result.message}</p>}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="post-title">Post title:</label>
                <input type="text" name="post-title" id="post-title" ref={postTitle} />
                <label htmlFor="post-lead">Post Lead:</label>
                <input type="text" name="post-lead" id="post-lead" ref={postLead} />
                <label htmlFor="post-content">Post content:</label>
                <textarea name="post-content" id="post-content" ref={postContent} />
                <label htmlFor="post-imageName">Post image name:</label>
                <input type="text" name="post-imageName" id="post-imageName" ref={postImgName} />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}