import { Link } from "react-router-dom"

export default function PortfolioFooter() {

    return (
        <>
            <div className="w-full flex flex-col items-center justify-center mb-4 gap-3 text-[#b8c785]">
                <p className="w-full flex justify-center">Thank you very much for your attention!</p>
                <p className="w-full flex justify-center items-center flex-wrap">Check my <Link to="blog" className="mx-1 text-[#6f963b] hover:text-[#b8c785]">blog</Link> and Social Media profiles.</p>
            </div>

        </>
    )
};