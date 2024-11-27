import { motion } from 'framer-motion';


import portfolioImage from '../../assets/portfolio-header-image.png';
import portfolioPhoto from '../../assets/portfolio-photo.jpg';
import SocialIcons from '../icons/SocialIcons';
import { sectionsClasses } from './portSections-classes';


export default function PortfolioHeader() {

    const contentVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 }
    }


    return (
        <div id="portfolio-header" className={sectionsClasses.portfolioHeader.wrapper}>
            <div className={sectionsClasses.portfolioHeader.innerWrapper}>
                <img
                    id="portfolio-header-bgImage"
                    className={sectionsClasses.portfolioHeader.bgImage}
                    src={portfolioImage}
                    alt="portfolio header background image"
                />
                <div
                    id="photoTextWrapper"
                    className={sectionsClasses.portfolioHeader.photoTextWrapper}
                >
                    <motion.img
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.2 }}
                        exit={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", duration: 1.6, damping: 10 }}
                        id="portfolio-photo"
                        className={sectionsClasses.portfolioHeader.portfolioPhoto}
                        src={portfolioPhoto}
                        alt="my personal photo"
                    />
                    <motion.h2
                        variants={contentVariants}
                        initial="initial"
                        animate="animate"
                        transition={{ type: "spring", duration: 1.6, damping: 10, delay: 0.2 }}
                        className={sectionsClasses.portfolioHeader.h2}
                    >
                        Mateusz Śliwowski
                    </motion.h2>
                    <motion.h3
                        variants={contentVariants}
                        initial="initial"
                        animate="animate"
                        transition={{ type: "spring", duration: 1.6, damping: 10, delay: 0.2 }}
                        className={sectionsClasses.portfolioHeader.h3}
                    >
                        Webdev. DevOps. SEO.
                    </motion.h3>
                    <SocialIcons mailSize={30} iconsSize={30} />
                </div>
            </div>
        </div>
    )
}