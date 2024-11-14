import { useContext, useState } from "react"

import { DataContext } from "../../store/data-context"
import Service from "./Service.jsx"

export default function ServicesSection() {

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const data = dataCtx.fetchedData.data;
    const services = dataCtx.fetchedData.data.services

    return (
    <Service services={services} loading={loading}/> 
     )
}