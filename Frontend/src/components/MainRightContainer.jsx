import Portfolio from "./Portfolio"
import { compClasses } from "./components-classes"

export default function MainRightContainer() {
  return (
    <div id="main-right-container" className={compClasses.mainRightContainer.mainContainer}>
      <Portfolio isNested={true} />
    </div>
  )
}