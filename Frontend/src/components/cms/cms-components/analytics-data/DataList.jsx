const DataList = ({ title, array }) => {
    return (
        <div className="w-full h-fit flex flex-col justify-center items-center bg-slate-300 border-2 border-black gap-2 pb-3 rounded-md">
            <h2 className="w-full h-fit flex justify-center bg-slate-400 py-1 rounded-t-md">{title}</h2>
            {Array.isArray(array) && array.length > 0 ? (
                <ul className="w-full flex flex-col justify-center items-center">
                    {array.slice(0, 10).map((item, index) => (
                        <li className="list-decimal" key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="w-full h-full flex justify-center items-center">Brak danych</p>
            )}
        </div>
    );
};

export default DataList;