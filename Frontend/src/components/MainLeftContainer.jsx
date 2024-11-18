import { compClasses } from "./components-classes"
import Projects from "./projects/Projects"


export default function MainLeftContainer() {
    return (
        <div id='main-left-container' className={compClasses.mainLeftContainer.mainContainer}>
            <Projects />
        </div>
    )
}