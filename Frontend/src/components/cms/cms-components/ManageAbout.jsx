import { useContext, useState } from "react"
import { DataContext } from "../../../store/data-context"
import { cmsComponents } from "./cms-componenst-styles"



export default function ManageAbout() {
    const { fetchedData, refreshData, isLoading } = useContext(DataContext);
    const about = fetchedData.data.about;


    return (
        <div className={cmsComponents.wrapper.wrapper}>
            <ul className={cmsComponents.ul.ul}>
                {!isLoading && about && Array.isArray(about) ? (
                    about.map((text) => {
                        <li className={cmsComponents.li.li}>
                            <span className={cmsComponents.span.span}>{text.id}</span>
                            <span className={cmsComponents.span.span}>{text.aboutText}</span>
                        </li>
                    })
                ) : (
                    <p className={cmsComponents.managePosts.noPostsLi}>Brak opisów.</p>
                )}
            </ul>
        </div>
    )
}