import { sectionsClasses } from "../portSections-classes"

export default function Service({ services, loading }) {
    return (
        <>
            {!loading && services && Array.isArray(services) ? (
                services.map((service) => (
                    <div id="service1" className={sectionsClasses.service.serviceWrapper} key={service.id}>
                        <h3 className={sectionsClasses.h3.h3}><span className={sectionsClasses.service.span}>#</span>{service.title}</h3>
                        <p className={sectionsClasses.service.paragraph}>{service.description}</p>
                    </div>
                ))
            ) : (
                <p>Brak usług do wyświetlenia.</p>
            )}
        </>
    )
}