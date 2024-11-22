import { useContext } from "react"
import { motion } from "framer-motion";

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
         <motion.div
            className="mt-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
         >
            <div className={sectionsClasses.h2.titleWrapper}>
               <h2 className={sectionsClasses.servicesSection.h2}>Services</h2>
            </div>
            <div className={sectionsClasses.servicesSection.servicesWrapper}>
               <Service services={services} loading={loading} />
            </div>
         </motion.div>
      </>
   )
}