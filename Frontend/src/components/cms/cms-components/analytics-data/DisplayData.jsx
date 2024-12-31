export default function DisplayData({ data, isLoaded, title }) {
    return (
        <div className="w-full h-fit flex flex-col justify-center items-center bg-zinc-500/60 border-2 border-black pb-3 rounded-md gap-2 text-xs md:text-base">
            <h2 className="w-full h-fit flex justify-center text-zinc-100 py-1 rounded-t-md">{title}</h2>
            {isLoaded && <p className="w-full h-full flex justify-center items-center text-zinc-300 text-lg md:text-base">{data}</p>}
        </div>
    )
};