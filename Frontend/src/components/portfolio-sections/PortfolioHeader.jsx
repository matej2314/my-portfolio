import portfolioImage from '../../assets/portfolio-header-image.png';
import portfolioPhoto from '../../assets/portfolio-photo.jpg';


export default function PortfolioHeader() {

    return (
        <div id="portfolio-header" className="w-full flex justify-center">
                    <div className="w-full h-56 bg-gradient-to-t from-bg-neutral-600/30 via-transparent to-transparent relative">
                        <img
                            id="portfolio-header-bgImage"
                            className="h-56 w-full opacity-60 object-cover blur-[2px]"
                            src={portfolioImage}
                            alt="portfolio header background image"
                        />
                        <img
                            id="portfolio-photo"
                            className="w-24 h-24 z-10 relative bottom-[62%] justify-self-center items-center justify-center rounded-full border-4 border-slate-300 -translate-y-2/3 hover:scale-110"
                            src={portfolioPhoto}
                            alt="my personal photo"
                        />
                        <h2 className="absolute top-[57%] left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold z-20">
                            Mateusz Śliwowski
                        </h2>
                        <h3 className="absolute top-[70%] left-[40%] text-white text-sm z-20 hover:text-[#b8c785]">
                       Webdev. DevOps. SEO.
                        </h3>
                    </div>
                </div>
    )
}