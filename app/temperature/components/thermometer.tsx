import React, { useState } from 'react';

interface ThermometerProps {
    temperature: number;
}

export const Thermometer: React.FC<ThermometerProps> = ({ temperature }) => {
    const percentage = Math.max(0, Math.min(100, (temperature / 40) * 100)); // Limita o valor entre 0 e 100

    return (
        <div className='absolute top-[-50px] left-[-20px] sm:left-[-325px] w-8 h-72 bg-gray-200 rounded-full overflow-hidden border-gray-600 border-6'>
            <div
                className='absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-blue-400 via-red-400 to-red-500'
                style={{ height: `${percentage}%`, transition: 'height 0.5s' }}
            />
            <div className='absolute w-full -rotate-90 text-center bottom-0 mb-4'>
                <span className='text-gray-50 font-bold text-sm'>
                    {temperature}°C
                </span>
            </div>
        </div>
    );
};

interface SliderProps {
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({ min, max, step, onChange }) => {
    const [value, setValue] = useState(min);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <div>
            <input
                type='range'
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
            />
            <span>{value}°C</span>
        </div>
    );
};
