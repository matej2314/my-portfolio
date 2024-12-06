import { motion } from 'framer-motion'

import { sectionsClasses } from "../portSections-classes"

export default function Service({ services, loading }) {
    return (
        <>
            {!loading && services && Array.isArray(services) ? (
                services.map((service) => (
                    <motion.div
                        key={service.id}
                        id="service1"
                        className={sectionsClasses.greybox.greybox}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ amount: 0.4, once: false }}
                    >
                        <h3 className={sectionsClasses.h3.h3}><span className={sectionsClasses.service.span}>#</span>{service.title}</h3>
                        <p className={sectionsClasses.service.paragraph}>{service.description}</p>
                    </motion.div>
                ))
            ) : (
                <p>Brak usług do wyświetlenia.</p>
            )}
        </>
    )
}
