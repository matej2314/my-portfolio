import { useContext } from "react";
import { DataContext } from "../../../store/data-context";

export default function ManagePosts() {

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const posts = dataCtx.fetchedData.data.posts;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <ul className="w-full h-fit flex flex-col justify-center items-center">
                {!loading && posts.length > 0 && Array.isArray(posts) ? (
                    posts.map((post) => {
                        return (
                            <li key={post.id}>
                                <h2>{post.title}</h2>
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