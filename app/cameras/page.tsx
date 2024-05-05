export default function Cameras() {
    return (
        <main className='sky-bg flex min-h-screen flex-col items-center gap-2 p-8 sm:px-16 sm:py-6 bg-slate-200'>
            <p className='font-bold'>Câmeras</p>
            <div className='w-full bg-white rounded-lg drop-shadow-md gap-8 sm:gap-0 shadow-black p-8 grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-3'>
                {Array.from({ length: 12 }).map((_, index) => (
                    <div
                        key={index}
                        className='flex flex-col justify-center align-center items-center'
                    >
                        <div className='bg-black w-[300px] h-[150px] sm:w-[350px] sm:h-[200px] rounded-lg'></div>
                        <p>camera {index + 1}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
