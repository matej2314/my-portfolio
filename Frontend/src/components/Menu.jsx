import { NavLink} from "react-router-dom"

export default function Menu() {
    
    return (
        <menu className="w-4/5 h-full px-6 bg-neutral-600/30 flex flex-col justify-stretch mt-3 rounded-lg pt-28">
        <nav>
            <ul className="flex flex-col items-center gap-5 text-gray-300 text-xl">
                <li><NavLink className="hover:text-2xl hover:text-[#b8c785]" to="/">Home</NavLink></li>
                <li><NavLink className="hover:text-2xl hover:text-[#b8c785]" to="/portfolio">Portfolio</NavLink></li>
                <li><NavLink className="hover:text-2xl hover:text-[#b8c785]" to="/contact">Contact</NavLink></li>
                <li><NavLink className="hover:text-2xl hover:text-[#b8c785]" to="/blog">Blog</NavLink></li>
                <li><button>Download CV</button></li>
            </ul>
        </nav>
    </menu>
    )
}