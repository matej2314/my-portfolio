import { useContext, useState } from "react"

import { DataContext } from "../../store/data-context"
import Service from "./Service.jsx"

export default function ServicesSection() {

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const data = dataCtx.fetchedData.data;
    const services = data.services

   return (
      <>
         <h2 className="w-full flex justify-center text-2xl my-4">Services</h2>
        <div className="grid grid-cols-2 gap-2 px-4 border-dotted border-b-2 border-[#6f963b] pb-4">
           <Service services={services} loading={loading}/> 
        </div>
    </>
     )
}