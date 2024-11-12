import { Link } from "react-router-dom";


export default function LeftSidebar() {
    const codeSign = "</>";
    return (
        <div id="left-sidebar" className="h-content w-fit ml-4 mt-3 flex flex-col justify-between">
                <div className="bg-blue-800 w-4/5 rounded-lg mt-2 flex justify-center items-center text-5xl font-bold pb-6 pt-2"><span className="text-black opacity-55 translate-y-1">{codeSign}</span></div>
                <menu className="w-4/5 h-full px-6 bg-neutral-600/30 flex flex-col justify-stretch mt-3 rounded-lg pt-28">
                    <nav>
                        <ul className="flex flex-col items-center gap-5 text-gray-300 text-xl">
                            <li><Link className="hover:text-2xl" to="/">Home</Link></li>
                            <li><button>Portfolio</button></li>
                            <li><Link className="hover:text-2xl" to="/contact">Contact</Link></li>
                            <li><button>Blog</button></li>
                            <li><button>Download CV</button></li>
                        </ul>
                    </nav>
                </menu>
            </div>
    )
}