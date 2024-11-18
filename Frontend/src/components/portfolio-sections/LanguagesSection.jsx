import { langs } from '../../../langs.js';
import { sectionsClasses } from './portSections-classes.js';

export default function LanguagesSection() {

    return (
        <section id="languages" className={sectionsClasses.languages.section}>
            <h2 className={sectionsClasses.h2.h2}>Languages</h2>
            <ul className={sectionsClasses.languages.ul}>
                {langs.map((lang) => {
                    return <li key={lang.id} className={sectionsClasses.li.li}>{lang.lang}<span className={sectionsClasses.languages.span}>{lang.lvl}</span></li>
                })
                }


            </ul>
        </section>
    )
}