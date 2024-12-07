import { useContext, useState } from "react"
import { DataContext } from "../../../store/data-context"
import { cmsComponents } from "./cms-componenst-styles"



export default function ManageAbout() {
    const { fetchedData, refreshData, isLoading } = useContext(DataContext);
    const about = fetchedData.data.about;


    return (
        <div>
            <ul>
                {!isLoading && about && Array.isArray(about) ? (
                    about.map((text) => {
                        <li>
                            <span>{text.id}</span>
                            <span>{text.aboutText}</span>
                        </li>
                    })
                ) : (
                    <p>Brak opisów.</p>
                )}
            </ul>
        </div>
    )
}