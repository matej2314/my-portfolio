import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import useSendRequest from '../../hooks/useSendRequest';
import { galleryUrl, imgUrl } from "../../url";
import { projectsClasses } from "./projectsClasses";
import { useMediaQuery } from 'react-responsive';
import { getImageForScreen } from "../../utils/GetImageForScreen";


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
    } else if (!result || !result.photos || result.photos.length === 0) {
        return <p>Brak zdjęć do wyświetlenia</p>;
    }

    const photos = result.photos;

    const filteredPhotos = photos.filter((photo) => {
        const adjustedImage = getImageForScreen(photo, isMobile, isTablet, isDesktop);
        return adjustedImage === photo;
    });

    if (filteredPhotos.length === 0) {
        return <p>Brak odpowiednich zdjęć do wyświetlenia dla tej rozdzielczości.</p>;
    }

    const nextPhoto = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredPhotos.length);
    };

    const prevPhoto = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? filteredPhotos.length - 1 : prevIndex - 1
        );
    };

    const currentPhoto = filteredPhotos[currentIndex];

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    const handleSwipeLeft = () => {
        prevPhoto();
    };

    const handleSwipeRight = () => {
        nextPhoto();
    };

    const handleDragEnd = (event, info) => {
        if (info.offset.x > 100) {
            handleSwipeRight();
        } else if (info.offset.x < -100) {
            handleSwipeLeft();
        };

    };

    const imageUrl = `${imgUrl}/${id}/${getImageForScreen(currentPhoto, isMobile, isTablet, isDesktop)}`;

    return (
        <div
            className="relative w-11/12 md:max-w-[700px] md:max-h-[30rem] bg-black flex flex-col pt-2 px-5 justify-center items-center rounded-md overflow-hidden"
        >
            <AnimatePresence mode="popLayout">
                <motion.div
                    className="relative w-full md:w-[700px] h-[30rem] flex justify-center items-center overflow-hidden aspect-auto"
                    key={currentIndex}
                    drag="x"
                    dragConstraints={{ left: -200, right: 200 }}
                    onDragEnd={isMobile ? handleDragEnd : null}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100, transition: { delay: 0.2 } }}
                    transition={{
                        duration: 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 30,
                        delay: 0.5,
                        ease: "easeIn",
                        mode: "wait"
                    }}
                >
                    <motion.img
                        key={currentIndex}
                        drag="x"
                        dragConstraints={{ left: -200, right: 200 }}
                        onDragEnd={isMobile ? handleDragEnd : null}
                        initial={{ opacity: 1, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100, transition: { delay: 0.2 } }}
                        transition={{
                            duration: 0.2,
                            type: "spring",
                            stiffness: 150,
                            damping: 35,
                            delay: 0.3,
                            ease: "easeIn",
                            mode: "wait"
                        }}
                        className="w-full h-full object-fill"
                        src={imageUrl}
                        alt={`Gallery image ${currentIndex + 1}`}
                    />
                </motion.div>
            </AnimatePresence>
            <div className="absolute top-1/2 w-full flex flex-row justify-between -translate-y-1/2">
                <motion.button
                    onClick={() => currentIndex > 0 && prevPhoto()}
                    onTouchStart={() => currentIndex > 0 && prevPhoto()}
                    className={projectsClasses.screenGallery.button}
                >
                    &#10094;
                </motion.button>
                <motion.button
                    onClick={() => nextPhoto()}
                    onTouchStart={() => nextPhoto()}
                    className={projectsClasses.screenGallery.button}
                >
                    &#10095;
                </motion.button>
            </div>

            <div className="flex flex-row justify-center mt-3">
                {filteredPhotos.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`${projectsClasses.screenGallery.dot} ${currentIndex === index ? 'bg-lime-700' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}
