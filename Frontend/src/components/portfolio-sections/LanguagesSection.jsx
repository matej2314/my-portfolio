import {langs} from '../../../langs.js';


export default function LanguagesSection() {

    return (
        <section id="languages" className=" w-full flex-col justify-between items-center mt-4 pb-4 border-dotted border-b-2 border-[#6f963b]">
        <h2 className="w-full flex justify-center text-2xl mb-4 font-sans">Languages</h2>
            <ul className="w-full grid grid-cols-2 text-xl gap-4">
                {langs.map((lang) => {
                   return  <li key={lang.id} className="w-full flex justify-around pb-2">{lang.lang}<span className="border-dotted border-b-2 border-[#6f963b]">{lang.lvl}</span></li>
                })
                   }
                    
                
        </ul>
    </section>
    )
}