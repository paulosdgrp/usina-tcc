interface SolarPanelProps {
    problema: boolean;
}

export const SolarPanelVertical = ({ problema }: SolarPanelProps) => {
    return (
        <div
            className={`w-[45px] h-[250px] p-1 bg-gray-200 grid grid-cols-6 grid-rows-8 gap-[1px]`}
        >
            {Array.from({ length: 6 * 8 }).map((_, index) => (
                <div
                    className={`h-full w-full ${
                        problema ? 'bg-red-600' : 'bg-blue-950'
                    } rounded-md grid grid-cols-3 grid-rows-3`}
                    key={index}
                >
                    {Array.from({ length: 3 * 3 }).map((_, idx) => (
                        <div
                            className={`border-gray-600 ${
                                [2, 5, 8].some((x) => x === idx)
                                    ? ''
                                    : 'border-r'
                            }
                            ${
                                [6, 7, 8].some((x) => x === idx)
                                    ? ''
                                    : 'border-b'
                            }
                            `}
                            key={idx}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export const SolarPanelHorizontal = ({ problema }: SolarPanelProps) => {
    return (
        <div className='w-[200px] h-[200px] p-1 bg-gray-200 grid grid-cols-12 grid-rows-8 gap-[1px]'>
            {Array.from({ length: 12 * 8 }).map((_, index) => (
                <div
                    className={`h-full w-full ${
                        problema ? 'bg-red-600' : 'bg-blue-950'
                    } rounded-md grid grid-cols-3 grid-rows-3`}
                    key={index}
                >
                    {Array.from({ length: 3 * 3 }).map((_, idx) => (
                        <div
                            className={`border-gray-600 ${
                                [2, 5, 8].some((x) => x === idx)
                                    ? ''
                                    : 'border-r'
                            }
                            ${
                                [6, 7, 8].some((x) => x === idx)
                                    ? ''
                                    : 'border-b'
                            }
                            `}
                            key={idx}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};
