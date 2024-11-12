import Portfolio from "./Portfolio"


export default function MainRightContainer() {
    return (
        <div id="main-right-container" className='bg-neutral-600/30 text-gray-300 w-full h-full rounded-md flex flex-col justify-between overflow-scroll no-scrollbar'>
      <Portfolio  />
    </div>
    )
}