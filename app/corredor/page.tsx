'use client';
import { useSearchParams } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { SolarPanelHorizontal } from '../temperature/components/solar-panel';

export default function Corredor() {
    const searchParams = useSearchParams();
    const corridorNumber = Number(searchParams.get('numero')!);
    const [selectedModule, setSelectedModule] = useState<number | null>(null);

    const handleModuleClick = (index: number) => {
        setSelectedModule(index);
    };

    const handleModuleClose = () => {
        setSelectedModule(null);
    };

    return (
        <main className='sky-bg flex min-h-screen flex-col items-center gap-2 p-4 sm:px-16 sm:py-24'>
            <p>String {corridorNumber}</p>
            {Array.from({ length: 16 }).map((_, index) => (
                <div
                    className='w-full flex flex-row gap-8 justify-center items-center'
                    key={index}
                >
                    <div
                        className='transition-all duration-200 border-black cursor-pointer hover:border-blue-700 p-2 rounded-lg'
                        onClick={() => handleModuleClick(index)}
                    >
                        <SolarPanelHorizontal
                            problema={index === 3 && corridorNumber === 3}
                        />
                    </div>
                </div>
            ))}
            {selectedModule !== null && (
                <Modal onClose={handleModuleClose}>
                    <div className='w-full'>
                        <p className='font-extrabold text-lg'>
                            Módulo {selectedModule + 1}
                        </p>
                    </div>
                    <div className='flex flex-col gap-2 w-full mt-8'>
                        <div className='flex flex-row justify-between w-full'>
                            <p className='font-extrabold'>Marca</p>
                            <p>Canadian Solar</p>
                        </div>
                        <div className='flex flex-row justify-between w-full'>
                            <p className='font-extrabold'>Tecnologia</p>
                            <p>Topcon Bifacial</p>
                        </div>
                        <div
                            className={`flex flex-row justify-between w-full ${
                                selectedModule === 3
                                    ? 'text-black'
                                    : 'text-black'
                            }`}
                        >
                            <p className='font-extrabold'>Potência</p>
                            <p>{selectedModule === 3 ? '700wp' : '700Wp'}</p>
                        </div>
                        <div className='flex flex-row justify-between w-full'>
                            <p className='font-extrabold'>
                                Tensão máxima placa
                            </p>
                            <p>40V</p>
                        </div>
                        <div
                            className={`flex flex-row justify-between w-full ${
                                selectedModule === 3
                                    ? 'text-red-500'
                                    : 'text-black'
                            }`}
                        >
                            <p className='font-extrabold'>Tensão atual placa</p>
                            <p>
                                {selectedModule === 3
                                    ? `${Math.floor(Math.random() * (20 + 1))}V`
                                    : '40V'}
                            </p>
                        </div>
                        <div className='flex flex-row justify-between w-full'>
                            <p className='font-extrabold'>
                                Corrente Máxima Placa
                            </p>
                            <p>17.51A</p>
                        </div>
                        <div
                            className={`flex flex-row justify-between w-full ${
                                selectedModule === 3
                                    ? 'text-red-500'
                                    : 'text-black'
                            }`}
                        >
                            <p className='font-extrabold'>
                                Corrente Atual Placa
                            </p>
                            <p>{selectedModule === 3 ? `40.57A` : '17.51A'}</p>
                        </div>
                        <div className='flex flex-row justify-between w-full'>
                            <p className='font-extrabold'>Voc</p>
                            <p>47,9V</p>
                        </div>
                        <div className='flex flex-row justify-between w-full'>
                            <p className='font-extrabold'>Isc</p>
                            <p>18.49A</p>
                        </div>
                        <div className='flex flex-row justify-between w-full'>
                            <p className='font-extrabold'>
                                Eficiencia do Modulo
                            </p>
                            <p>22.5%</p>
                        </div>{' '}
                        <div
                            className={`flex flex-row justify-between w-full ${
                                selectedModule === 3
                                    ? 'text-red-500'
                                    : 'text-black'
                            }`}
                        >
                            <p className='font-extrabold'>
                                Eficiencia Atual do Modul
                            </p>
                            <p>{selectedModule === 3 ? `10.0%` : '22.5%'}</p>
                        </div>
                        <div className='flex flex-row justify-between w-full'>
                            <p className='font-extrabold'>Degradação Anual</p>
                            <p>0,40%</p>
                        </div>
                        <div className='flex flex-row justify-between w-full'>
                            <p className='font-extrabold'>Dimensões</p>
                            <p>2384x1393x33mm</p>
                        </div>
                    </div>
                </Modal>
            )}
        </main>
    );
}

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
}
const Modal = ({ children, onClose }: ModalProps) => {
    return (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
            <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0'>
                <div className='fixed inset-0 transition-opacity'>
                    <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                </div>
                <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
                &#8203;
                <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                    <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                        <div className='sm:flex sm:items-start'>
                            <div className='mt-3 text-center sm:mt-0 sm:text-left w-full'>
                                <div className='mt-2 w-full'>{children}</div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                        <button
                            onClick={onClose}
                            type='button'
                            className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
