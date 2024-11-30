import { useContext } from "react";
import { DataContext } from "../../../store/data-context";

export default function ManagePosts() {

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const posts = dataCtx.fetchedData.data.posts;

    return (
        <div>
            <ul>
                {!loading && posts && Array.isArray(posts) ? (
                    posts.map((post) => {
                        <li key={post.id}>
                            <h2>{post.title}</h2>

                        </li>
                    })
                ) : (
                    <p>Brak postów</p>
                )}
            </ul>
        </div>
    )
}