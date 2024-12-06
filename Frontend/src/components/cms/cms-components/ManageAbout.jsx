import { useContext, useState } from "react"
import { DataContext } from "../../../store/data-context"
import { cmsComponents } from "./cms-componenst-styles"



export default function ManageAbout() {
    const { refreshData } = useContext(DataContext);


    return (
        <p>Manage about me description</p>
    )
}