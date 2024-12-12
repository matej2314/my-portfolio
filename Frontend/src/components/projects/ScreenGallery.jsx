import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import useSendRequest from '../../hooks/useSendRequest';
import { galleryUrl, imgUrl } from "../../url";

export default function ScreenGallery({ id }) {
    const { sendRequest, result, isLoading, error } = useSendRequest();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchScreens = async () => {
            if (!id) {
                console.log('Brak id');
                return;
            };

            try {
                await sendRequest({
                    url: galleryUrl,
                    data: { folder: id },
                });
            } catch (error) {
                console.log('Nie udało się wysłać żądania');
            }
        }
        fetchScreens();
    }, [id]);

    if (error) {
        return <div>Wystąpił błąd: {error}</div>
    };

    if (!result || !result.photos || result.photos.length === 0) {
        return <p>Brak zdjęć do wyświetlenia</p>;
    }

    const photos = result.photos;

    const nextPhoto = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const prevPhoto = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1) % photos.length);
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    }


    return (
        <div className="relative w-full flex flex-col justify-center items-center ">
            <motion.div
                className="w-full max-w-10/12 h-auto flex justify-center items-center"
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <img

                    src={`${imgUrl}/${photos[currentIndex]}`}
                    alt="test"
                />
            </motion.div>
            <div className="absolute top-1/2 w-full flex flex-row justify-between -translate-y-1/2">
                <button
                    onClick={currentIndex > 0 && prevPhoto}
                    className=" bg-black/50 text-white text-md border-0 p-3 cursor-pointer rounded-[50%] hover:bg-black/80"
                >
                    &#10094;
                </button>
                <button
                    onClick={nextPhoto}
                    className="bg-black/50 text-white text-md border-0 p-3 cursor-pointer rounded-[50%] hover:bg-black/80"
                >
                    &#10095;
                </button>
            </div>
            <div className="flex flex-row justify-center mt-3">
                {photos.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-2 h-2 mx-1 bg-lime-400 rounded-full cursor-pointer ${currentIndex === index ? 'bg-lime-700' : ''}`}
                    >

                    </span>
                ))}
            </div>
        </div>
    )

}