import { Link } from "react-router-dom";
import Menu from "./Menu";


export default function LeftSidebar() {
    const codeSign = "<msliwowski.net>";
    return (
        <div id="left-sidebar" className="h-content w-fit ml-4 mt-3 flex flex-col justify-between">
                <Link to="/contact" className="bg-blue-800 w-10/12 rounded-lg mt-2 flex justify-center items-center py-5 px-4 text-black hover:bg-blue-950 hover:text-slate-200"><span className="font-bold font-sans tracking-wider">{codeSign}</span></Link>
               <Menu />
            </div>
    )
}