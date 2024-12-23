import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useSendRequest from '../../../hooks/useSendRequest';
import { requestUrl, imgUrl } from '../../../url';
import { cmsComponents } from './cms-componenst-styles';
import { toast } from 'react-toastify';

const projectsImgsUrl = requestUrl.projects.photos;

export default function ShowProjectPics({ id, name }) {
    const { sendRequest, result, error, isLoading } = useSendRequest();
    const [picturesList, setPicturesList] = useState([]);

    useEffect(() => {
        const handlePicturesList = async (id) => {
            const response = await sendRequest({
                url: projectsImgsUrl,
                data: { projectId: id },
            });

            if (!response) {
                console.log(response.message);
            };
            setPicturesList(response.images);
        };
        handlePicturesList(id);
    }, [id]);


    return (
        <div
            className="w-[35rem] h-fit flex flex-col justify-start items-center text-lg text-white gap-3 bg-neutral-600/30 pt-3 pb-6 rounded-md shadow-lg shadow-black/80 border-t-2 border-black"
        >
            <h2>Pictures for project {name}:</h2>
            <div>
                <h2
                    className='w-full h-fit flex justify-center items-center mb-4'
                >Main files:
                </h2>
                <ul
                    className="w-[34rem] h-fit flex flex-col justify-center items-center text-md text-white border-2 border-zinc-400/85 gap-4 rounded-md"
                >
                    {picturesList?.mainFiles && Array.isArray(picturesList.mainFiles) && !isLoading ? (
                        picturesList.mainFiles.map((picture, index) => (
                            <li
                                className="w-full h-full flex flex-row items-center justify-center text-zinc-300 text-md gap-4 border-b-2 border-black p-2"
                                key={index}
                            >
                                <span className='w-full h-full flex justify-center items-center'>
                                    {picture}
                                </span>
                                <button
                                    className={cmsComponents.actionBtn.actionBtn}
                                >
                                    <Link
                                        to={`${imgUrl}/${id.toString()}/main/${picture}`}
                                    >
                                        Preview
                                    </Link>
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>Brak głównych zdjęć projektu</p>
                    )}
                </ul>
            </div>
            <div>
                <h2 className='w-full h-fit flex justify-center items-center mb-4'>Gallery files:</h2>
                <ul
                    className="w-[34rem] h-fit flex flex-col justify-center items-center text-md text-white border-2 border-zinc-400/85 gap-4 rounded-md"
                >
                    {picturesList?.galleryFiles && Array.isArray(picturesList.galleryFiles) && !isLoading ? (
                        picturesList.galleryFiles.map((picture, index) => (
                            <li
                                className="w-full h-full flex flex-row items-center justify-center text-zinc-300 gap-4 border-b-2 border-black p-2"
                                key={index}
                            >
                                <span className='w-full h-full flex justify-center items-center'>
                                    {picture}
                                </span>
                                <button
                                    className={cmsComponents.actionBtn.actionBtn}
                                >
                                    <Link
                                        to={`${imgUrl}/${id.toString()}/gallery/${picture}`}
                                    >
                                        Zobacz zdjęcie.
                                    </Link>
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>Brak zdjęć galerii projektu</p>
                    )}
                </ul>
            </div>
        </div>
    )
}