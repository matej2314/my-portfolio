import { useContext, useState } from "react"

import { DataContext } from "../../store/data-context"
import Service from "./internal-components/Service.jsx";
import { sectionsClasses } from "./portSections-classes.js";

export default function ServicesSection() {

   const dataCtx = useContext(DataContext);
   const loading = dataCtx.isLoading;
   const data = dataCtx.fetchedData.data;
   const services = data.services

   return (
      <>
         <div className="mt-4">
            <div className={sectionsClasses.h2.titleWrapper}>
               <h2 className={sectionsClasses.h2.h2}>Services</h2>
            </div>
            <div className={sectionsClasses.servicesSection.servicesWrapper}>
               <Service services={services} loading={loading} />
            </div>
         </div>
      </>
   )
}