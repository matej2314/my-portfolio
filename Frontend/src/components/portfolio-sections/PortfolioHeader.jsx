import portfolioImage from '../../assets/portfolio-header-image.png';
import portfolioPhoto from '../../assets/portfolio-photo.jpg';
import SocialIcons from '../icons/SocialIcons';
import { sectionsClasses } from './portSections-classes';


export default function PortfolioHeader() {

    return (
        <div id="portfolio-header" className={sectionsClasses.portfolioHeader.wrapper}>
            <div className={sectionsClasses.portfolioHeader.innerWrapper}>
                <img
                    id="portfolio-header-bgImage"
                    className={sectionsClasses.portfolioHeader.bgImage}
                    src={portfolioImage}
                    alt="portfolio header background image"
                />
                <div className={sectionsClasses.portfolioHeader.photoTextWrapper}>
                    <img
                        id="portfolio-photo"
                        className={sectionsClasses.portfolioHeader.portfolioPhoto}
                        src={portfolioPhoto}
                        alt="my personal photo"
                    />
                    <h2 className={sectionsClasses.portfolioHeader.h2}>
                        Mateusz Śliwowski
                    </h2>
                    <h3 className={sectionsClasses.portfolioHeader.h3}>
                        Webdev. DevOps. SEO.
                    </h3>
                    <SocialIcons mailSize={30} iconsSize={30} />
                </div>
            </div>
        </div>
    )
}