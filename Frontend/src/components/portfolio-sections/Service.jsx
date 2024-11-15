export default function Service({ services, loading }) {
    return (
        <>
            {!loading && services && Array.isArray(services) && services.length > 0 ? (
                services.map((service) => (
                    <div id="service1" className="w-full flex flex-col items-center justify-start pt-2 pb-3 px-4 bg-gray-500/15 rounded" key={service.id}>
                        <h3 className="text-lg w-full flex justify-center mx-auto"><span className="text-[#6f963b] text-2xl">#</span>{service.title}</h3>
                        <p className="w-full flex flex-wrap mt-2">{service.description}</p>
                    </div>
                ))
            ) : (
                <p>Brak usług do wyświetlenia.</p>
            )}
        </>
    )
}
