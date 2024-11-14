export default function LanguagesSection() {

    return (
        <section id="languages" className=" w-full flex-col justify-between items-center mt-4 pb-4 border-dotted border-b-2 border-blue-800/30 px-4">
        <h2 className="w-full flex justify-center text-2xl mb-4 font-sans">Languages</h2>
        <ul className="w-full grid grid-cols-2 text-xl ml-2 gap-4">
            <li className="w-full flex justify-around pb-2">Polish <span className="border-dotted border-b-2 border-blue-800/90">Native</span></li>
            <li className="w-full flex justify-around  pb-2">English <span className="border-dotted border-b-2 border-blue-800/90">B1/B2</span></li>
            <li className="w-full flex justify-around  pt-1">Russian <span className="border-dotted border-b-2 border-blue-800/90">A2</span></li>
        </ul>
    </section>
    )
}