import { useState } from "react"

import { compClasses } from "./components-classes"
import Projects from "./projects/Projects"
import ProjectsCategories from "./projects/ProjectsCategories"


export default function MainLeftContainer() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    function setProjectCat(category) {
        setSelectedCategory(category);
    };

    return (
        <div id='main-left-container' className={compClasses.mainLeftContainer.mainContainer}>
            <Projects selectedCategory={selectedCategory} />
            <ProjectsCategories setProjectCat={setProjectCat} />
        </div>
    )
}