import { useContext, useState } from "react"
import { DataContext } from "../../../store/data-context"
import { cmsComponents } from "./cms-componenst-styles"



export default function ManageAbout() {
    const { fetchedData, refreshData, isLoading } = useContext(DataContext);
    const about = fetchedData.data.about;


    return (
        <div className="w-full h-full bg-neutral-600/30 flex justify-center items-center">
            <ul className="w-1/2 h-1/2 bg-blabk">
                {!isLoading && about && Array.isArray(about) ? (
                    about.map((text) => {
                        <li className={cmsComponents.li.li}>
                            <span className={cmsComponents.span.span}>{text.id}</span>
                            <span className={cmsComponents.span.span}>{text.aboutText}</span>
                        </li>
                    })
                ) : (
                    <p className="w-fit h-fit text-2xl text-white">Brak opisów.</p>
                )}
            </ul>
        </div>
    )
}