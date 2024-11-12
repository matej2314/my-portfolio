import Footer from "./Footer"
import portfolioImage from '../assets/portfolio-header-image.png';

export default function Portfolio() {
    
    return (
        <>
            <div className="w-full bg-gradient-to-t from-bg-neutral-600/30 via-transparent to-transparent"><img className="h-80 w-full opacity-60 object-cover blur-[2px]" src={portfolioImage} />
            </div>
            <section id="services" className="w-full flex flex-col items-stretch font-sans pb-4 border-dotted border-b-2 border-blue-800/30 px-4">
                <h2 className=" w-full flex justify-center mt-4 text-2xl">Services</h2>
                <div id="services-details" className="w-full grid grid-cols-2 gap-4 mt-4">
                <div id="service1" className=" w-full flex flex-col items-center justify-start pt-2 pb-3 px-4 bg-gray-500/15 rounded">
                    <h3 className="text-lg w-full flex justify-center mx-auto"><span className="text-blue-800 text-2xl">#</span>Service 1</h3>
                    <p className="w-full flex flex-wrap mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi nulla dicta dignissimos tenetur facere sequi!</p>
                </div>
                <div id="service2" className="w-full flex flex-col items-center justify-start pt-2 pb-3 px-4 bg-gray-500/15 rounded">
                    <h3 className="text-lg"><span className="text-blue-800 text-2xl mx-auto">#</span>Service 2</h3>
                    <p className="w-full flex flex-wrap mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga recusandae at ducimus odit dolor cum?</p>
                    </div>
                <div id="service2" className="w-full flex flex-col items-center justify-start pt-2 pb-3 px-4 bg-gray-500/15 rounded">
                    <h3 className="text-lg"><span className="text-blue-800 text-2xl mx-auto">#</span>Service 3</h3>
                    <p className="w-full flex flex-wrap justify-between mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga recusandae at ducimus odit dolor cum?</p>
                    </div>
                </div>
            </section>
            <section id="languages" className=" w-full flex-col justify-between items-center mt-4 pb-4 border-dotted border-b-2 border-blue-800/30 px-4">
                <h2 className="w-full flex justify-center text-2xl mb-4 font-sans">Languages</h2>
                <ul className="w-full grid grid-cols-2 text-xl ml-2 gap-4">
                    <li className="w-full flex justify-around pb-2">Polish <span className="border-dotted border-b-2 border-blue-800/90">Native</span></li>
                    <li className="w-full flex justify-around  pb-2">English <span className="border-dotted border-b-2 border-blue-800/90">B1/B2</span></li>
                    <li className="w-full flex justify-around  pt-1">Russian <span className="border-dotted border-b-2 border-blue-800/90">A2</span></li>
                </ul>
            </section>
                <Footer />
                </> )
}