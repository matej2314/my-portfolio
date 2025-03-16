import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import useSendRequest from '../../hooks/useSendRequest';
import { galleryUrl } from "../../url";
import { projectsClasses } from "./projectsClasses";
import { useMediaQuery } from 'react-responsive';
import { mapPhotos } from '../../utils/mapPhotos';

export default function ScreenGallery({ id }) {
    const { sendRequest, result, isLoading, error } = useSendRequest();
    const [currentIndex, setCurrentIndex] = useState(0);
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });
    const isDesktop = useMediaQuery({ minWidth: 1025 });

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
    const mappedPhotos = mapPhotos(photos, id, isMobile, isTablet, isDesktop);

    const nextPhoto = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % mappedPhotos.length);
    };

    const prevPhoto = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? mappedPhotos.length - 1 : prevIndex - 1
        );
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    const handleDragEnd = (event, info) => {
        const dragThreshold = 50;
        const transitionDuration = 0.5;

        if (info.offset.x > dragThreshold) {
            nextPhoto();
        } else if (info.offset.x < -dragThreshold) {
            prevPhoto();
        }

    };


    const currentPhoto = mappedPhotos[currentIndex];

    return (
        <div className="relative md:max-w-[700px] md:max-h-[30rem] bg-black flex flex-col pt-2 px-5 justify-center items-center rounded-md overflow-hidden">
            <AnimatePresence mode="popLayout">
                <motion.div
                    className="relative w-full md:w-[700px] h-[30rem] flex justify-center items-center overflow-hidden aspect-auto"
                    key={currentIndex}
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
                        mode: "wait",
                    }}
                >
                    <motion.img
                        key={currentIndex}
                        drag="x"
                        dragConstraints={{ left: -200, right: 200 }}
                        onDragEnd={handleDragEnd}
                        src={currentPhoto.src}
                        srcSet={currentPhoto.srcSet}
                        sizes="(max-width: 640px) 320px, (max-width: 1024px) 640px, 960px"
                        className="w-full h-full object-fill"
                        alt={`Gallery image ${currentIndex + 1}`}
                    />
                </motion.div>
            </AnimatePresence>
            <div className="absolute top-1/2 w-11/12 md:w-full flex flex-row justify-between -translate-y-1/2">
                <motion.button
                    onClick={prevPhoto}
                    className={projectsClasses.screenGallery.button}
                >
                    &#10094;
                </motion.button>
                <motion.button
                    onClick={nextPhoto}
                    className={projectsClasses.screenGallery.button}
                >
                    &#10095;
                </motion.button>
            </div>
            <div className="flex flex-row justify-center mt-3">
                {mappedPhotos.map((_, index) => (
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



