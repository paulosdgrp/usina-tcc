import React from 'react';

export interface DateTime {
    month: string;
    day: string;
    hour: string;
}

interface DateTimePickerProps {
    handleChange: (dateTime: DateTime) => void;
    dateTime: DateTime;
    isDay: boolean;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
    handleChange,
    dateTime,
    isDay,
}) => {
    const { month, day, hour } = dateTime;

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleChange({ ...dateTime, month: event.target.value });
    };

    const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleChange({ ...dateTime, day: event.target.value });
    };

    const handleHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleChange({ ...dateTime, hour: event.target.value });
    };
    const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];

    return (
        <div className='flex flex-row items-center justify-center space-x-4'>
            <div
                className={`flex flex-col items-center pr-4 ${
                    isDay ? 'border-black' : 'border-white'
                }`}
            >
                <label
                    htmlFor='day'
                    className={`font-bold ${
                        isDay ? 'text-black' : 'text-white'
                    } mb-3`}
                >
                    Dia
                </label>
                <select
                    id='day'
                    className={`px-2 py-1 border border-gray-900 rounded-lg appearance-none font-bold transition-all duration-200 ${
                        isDay ? 'text-black bg-white' : 'text-white bg-blue-900'
                    }`}
                    value={day}
                    onChange={handleDayChange}
                >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <option
                            key={day}
                            value={day}
                            className={`${isDay ? 'bg-white' : 'bg-blue-900'}`}
                        >
                            {day.toString().padStart(2, '0')}
                        </option>
                    ))}
                </select>
            </div>
            <div
                className={`flex flex-col items-start pr-4 ${
                    isDay ? 'border-black' : 'border-white'
                }`}
            >
                <label
                    htmlFor='month'
                    className={`font-bold ${
                        isDay ? 'text-black' : 'text-white'
                    } mb-3`}
                >
                    Mês
                </label>
                <select
                    id='month'
                    className={`px-2 py-1 border border-gray-900 rounded-lg appearance-none font-bold transition-all duration-200 ${
                        isDay ? 'text-black bg-white' : 'text-white bg-blue-900'
                    }`}
                    value={month}
                    onChange={handleMonthChange}
                >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (month) => (
                            <option
                                key={month}
                                value={month}
                                className={`${
                                    isDay ? 'bg-white' : 'bg-blue-900'
                                }`}
                            >
                                {months[month - 1]}
                            </option>
                        )
                    )}
                </select>
            </div>
            <div className='flex flex-col items-center'>
                <label
                    htmlFor='hour'
                    className={`font-bold ${
                        isDay ? 'text-black' : 'text-white'
                    } mb-3`}
                >
                    Hora
                </label>
                <select
                    id='hour'
                    className={`px-2 py-1 border border-gray-900 rounded-lg appearance-none font-bold transition-all duration-200 ${
                        isDay ? 'text-black bg-white' : 'text-white bg-blue-900'
                    }`} 
                    value={hour}
                    onChange={handleHourChange}
                >
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <option
                            key={hour}
                            value={hour}
                            className={`${isDay ? 'bg-white' : 'bg-blue-900'}`}
                        >
                            {hour.toString().padStart(2, '0')}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DateTimePicker;
