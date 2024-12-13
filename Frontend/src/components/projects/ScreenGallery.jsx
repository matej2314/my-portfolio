import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import useSendRequest from '../../hooks/useSendRequest';
import { galleryUrl, imgUrl } from "../../url";
import { useMediaQuery } from 'react-responsive';

export default function ScreenGallery({ id }) {
    const { sendRequest, result, isLoading, error } = useSendRequest();
    const [currentIndex, setCurrentIndex] = useState(0);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 769px) and (max-width: 1024px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

    useEffect(() => {
        const fetchScreens = async () => {
            if (!id) {
                console.log('Brak id');
                return;
            }

            try {
                await sendRequest({
                    url: galleryUrl,
                    data: { folder: id },
                });
            } catch (error) {
                console.log('Nie udało się wysłać żądania');
            }
        };
        fetchScreens();
    }, [id]);

    if (error) {
        return <div>Wystąpił błąd: {error}</div>;
    }

    if (!result || !result.photos || result.photos.length === 0) {
        return <p>Brak zdjęć do wyświetlenia</p>;
    }

    const photos = result.photos;

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    const getImageForScreen = (photo) => {
        if (isMobile) {
            // Dla małych ekranów, wybieramy wersję -320.png
            if (photo.includes('-320.png')) return photo;
            return photo.replace(/-960.png|-640.png/, '-320.png');
        } else if (isTablet) {
            // Dla tabletów, wybieramy wersję -640.png
            if (photo.includes('-640.png')) return photo;
            return photo.replace(/-960.png|-320.png/, '-640.png');
        } else if (isDesktop) {
            // Dla desktopów, wybieramy wersję -960.png
            if (photo.includes('-960.png')) return photo;
            return photo.replace(/-320.png|-640.png/, '-960.png');
        }
        return photo;
    };

    const filteredPhotos = photos.filter((photo) => {
        const adjustedImage = getImageForScreen(photo);
        return adjustedImage === photo;
    });

    if (filteredPhotos.length === 0) {
        return <p>Brak odpowiednich zdjęć do wyświetlenia dla tej rozdzielczości.</p>;
    }

    const nextPhoto = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredPhotos.length);
    };

    const prevPhoto = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? filteredPhotos.length - 1 : prevIndex - 1
        );
    };

    const currentPhoto = filteredPhotos[currentIndex];

    const imageUrl = `${imgUrl}/${id}/${getImageForScreen(currentPhoto)}`;

    return (
        <div className="relative w-full md:max-w-full bg-black flex flex-col px-5 justify-center items-center">
            <motion.div
                className="w-full flex justify-center items-center"
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <img
                    className="w-full max-w-full"
                    src={imageUrl}
                    alt={`Gallery image ${currentIndex + 1}`}
                />
            </motion.div>

            <div className="absolute top-1/2 w-full flex flex-row justify-between -translate-y-1/2">
                <motion.button
                    onClick={() => currentIndex > 0 && prevPhoto()}
                    onTouchStart={() => currentIndex > 0 && prevPhoto()}
                    className="bg-black/50 text-white text-md border-0 p-3 cursor-pointer rounded-[50%] hover:bg-black/80"
                >
                    &#10094;
                </motion.button>
                <motion.button
                    onClick={() => nextPhoto()}
                    onTouchStart={() => nextPhoto()}
                    className="bg-black/50 text-white text-md border-0 p-3 cursor-pointer rounded-[50%] hover:bg-black/80"
                >
                    &#10095;
                </motion.button>
            </div>

            <div className="flex flex-row justify-center mt-3">
                {filteredPhotos.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-2 h-2 mx-1 bg-lime-400 rounded-full cursor-pointer ${currentIndex === index ? 'bg-lime-700' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}
