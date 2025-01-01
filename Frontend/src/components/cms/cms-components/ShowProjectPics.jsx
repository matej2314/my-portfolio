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
            className={cmsComponents.showProjectPics.wrapper}
        >
            <h2>Pictures for project {name}:</h2>
            <div>
                <h2
                    className={cmsComponents.showProjectPics.h2}
                >Main files:
                </h2>
                <ul
                    className={cmsComponents.showProjectPics.ul}
                >
                    {picturesList?.mainFiles && Array.isArray(picturesList.mainFiles) && !isLoading ? (
                        picturesList.mainFiles.map((picture, index) => (
                            <li
                                className={cmsComponents.showProjectPics.li}
                                key={index}
                            >
                                <span className={cmsComponents.showProjectPics.span}>
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
                <h2 className={cmsComponents.showProjectPics.h2}>Gallery files:</h2>
                <ul
                    className={cmsComponents.showProjectPics.h2}
                >
                    {picturesList?.galleryFiles && Array.isArray(picturesList.galleryFiles) && !isLoading ? (
                        picturesList.galleryFiles.map((picture, index) => (
                            <li
                                className={cmsComponents.showProjectPics.li}
                                key={index}
                            >
                                <span className={cmsComponents.showProjectPics.span}>
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