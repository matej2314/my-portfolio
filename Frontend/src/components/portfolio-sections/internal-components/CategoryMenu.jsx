import { sectionsClasses } from "../portSections-classes"

export default function CategoryMenu({ handleCategoryClick }) {

    return (
<ul className={sectionsClasses.buttonsList.buttonsList}>
                <li><button onClick={() => handleCategoryClick("WebDev")} className={sectionsClasses.categoryButton.categoryButton}>WebDev</button></li>
                <li><button onClick={() => handleCategoryClick("DevOps")} className={sectionsClasses.categoryButton.categoryButton}>DevOps</button></li>
                <li><button onClick={() => handleCategoryClick("SEO")} className={sectionsClasses.categoryButton.categoryButton}>SEO</button></li>
                <li><button onClick={() => handleCategoryClick(null)} className={sectionsClasses.categoryButton.categoryButton}>All</button></li>
            </ul>
    )
}