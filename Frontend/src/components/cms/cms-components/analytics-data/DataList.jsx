const DataList = ({ title, array }) => {
    return (
        <div className="w-full h-fit flex flex-col justify-center items-center bg-zinc-500/60 border-2 border-black gap-2 pb-3 rounded-md px-2">
            <h2 className="w-full h-fit flex justify-center text-zinc-100 py-1 rounded-t-md">{title}</h2>
            {Array.isArray(array) && array.length > 0 ? (
                <ul className="w-full flex flex-col items-center justify-center  text-zinc-300 gap-1 py-1 px-4 list-decimal">
                    {array.slice(0, 10).map((item, index) => (
                        <li className=" w-fit text-center" key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="w-full h-full text-center">Brak danych</p>
            )}
        </div>
    );
};

export default DataList;