'use client';
import { useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { SolarPanelHorizontal } from '../temperature/components/solar-panel';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { getCookie } from 'cookies-next';

export default function Corredor() {
    const searchParams = useSearchParams();
    const corridorNumber = Number(searchParams.get('numero')!);
    const [selectedModule, setSelectedModule] = useState<number | null>(null);
    const temperaturaAtual = parseInt(
        getCookie('usina-tcc-temperatura')?.toString() || '0'
    );
    const handleModuleClick = (index: number) => {
        setSelectedModule(index);
    };

    const handleModuleClose = () => {
        setSelectedModule(null);
    };

    useEffect(() => {
        console.log('biscoito porra - detalhe da usina', temperaturaAtual);
    }, [temperaturaAtual]);

    const random = (max: number, min: number): number =>
        Math.floor(Math.random() * (max - min + 1) + min);

    const correnteAtual = +(17.51*(1+(25 - temperaturaAtual) * (0.05/100))).toFixed(2);
    const tensaoAtual = random(15, 1);
    return (
        <main className='sky-bg flex min-h-screen flex-col items-center gap-2 p-8 sm:px-16 sm:py-24 bg-slate-200'>
            <p className='font-bold'>String {corridorNumber}</p>
            {Array.from({ length: 16 }).map((_, index) => (
                <div
                    className='w-full flex flex-row gap-8 justify-center items-center'
                    key={index}
                >
                    <div
                        className='bg-slate-50 drop-shadow-md shadow-black transition-all duration-200 border-black cursor-pointer hover:border-blue-700 p-1 rounded-lg'
                        onClick={() => handleModuleClick(index)}
                    >
                        <SolarPanelHorizontal
                            problema={index === 3 && corridorNumber === 3}
                        />
                    </div>
                </div>
            ))}
            {selectedModule !== null && (
                <Modal
                    showChamado={selectedModule === 3 && corridorNumber === 3}
                    onClose={handleModuleClose}
                >
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
                        <div className='flex flex-row justify-between w-full'>
                            <p className='font-extrabold'>Temperatura Atual</p>
                            <p>{temperaturaAtual}°C</p>
                        </div>
                        <div
                            className={`flex flex-row justify-between w-full ${
                                selectedModule === 3 && corridorNumber === 3
                                    ? 'text-black'
                                    : 'text-black'
                            }`}
                        >
                            <p className='font-extrabold'>Potência Máxima</p>
                            <p>
                                {selectedModule === 3 && corridorNumber === 3
                                    ? '700wp'
                                    : '700Wp'}
                            </p>
                        </div>
                        <div
                            className={`flex flex-row justify-between w-full ${
                                selectedModule === 3 && corridorNumber === 3
                                    ? 'text-red-500'
                                    : 'text-green-500'
                            }`}
                        >
                            <p className='font-extrabold'>Potência Atual</p>
                            <p>
                                {selectedModule === 3 && corridorNumber === 3
                                    ? `${(tensaoAtual * correnteAtual).toFixed(2)}W`
                                    : `${random(700, 600)}W`}
                            </p>
                        </div>
                        <div className='flex flex-row justify-between w-full'>
                            <p className='font-extrabold'>Tensão Máxima</p>
                            <p>40V</p>
                        </div>
                        <div
                            className={`flex flex-row justify-between w-full ${
                                selectedModule === 3 && corridorNumber === 3
                                    ? 'text-red-500'
                                    : 'text-green-500'
                            }`}
                        >
                            <p className='font-extrabold'>Tensão Atual</p>
                            <p>
                                {selectedModule === 3 && corridorNumber === 3
                                    ? `${tensaoAtual}V`
                                    : `${random(40, 35)}V`}
                            </p>
                        </div>
                        <div className='flex flex-row justify-between w-full'>
                            <p className='font-extrabold'>Corrente Máxima</p>
                            <p>17.51A</p>
                        </div>
                        <div
                            className={`flex flex-row justify-between w-full ${
                                selectedModule === 3 && corridorNumber === 3
                                    ? 'text-red-500'
                                    : 'text-green-500'
                            }`}
                        >
                            <p className='font-extrabold'>
                                Corrente Atual Placa
                            </p>
                            <p>
                                {selectedModule === 3 && corridorNumber === 3
                                    ? `${correnteAtual}A`
                                    : '17.51A'}
                            </p>
                        </div>
                        <div className='flex flex-row justify-between w-full'>
                            <p className='font-extrabold'>Tensão de circuito aberto</p>
                            <p>47,9V</p>
                        </div>
                        <div className='flex flex-row justify-between w-full'>
                            <p className='font-extrabold'>Corrente de curto circuito</p>
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
                                selectedModule === 3 && corridorNumber === 3
                                    ? 'text-red-500'
                                    : 'text-green-500'
                            }`}
                        >
                            <p className='font-extrabold'>Eficiencia Atual</p>
                            <p>
                                {selectedModule === 3 && corridorNumber === 3
                                    ? `${(22.5 - ((temperaturaAtual - 25) * 0.3)).toFixed(1)}%`
                                    : `${random(22, 20)}.5%`}
                            </p>
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
    showChamado: boolean;
}
const Modal = ({ children, onClose, showChamado }: ModalProps) => {
    const { toast } = useToast();
    return (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
            <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0'>
                <div className='fixed inset-0 transition-opacity'>
                    <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                </div>
                <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
                &#8203;
                <div className='relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[calc(100%-20px)] sm:max-w-lg sm:w-full'>
                    <button
                        onClick={onClose}
                        type='button'
                        className='absolute right-1 inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-transparent text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 sm:ml-3 sm:w-auto sm:text-sm'
                    >
                        x
                    </button>
                    <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                        <div className='sm:flex sm:items-start'>
                            <div className='mt-3 text-center sm:mt-0 sm:text-left w-full'>
                                <div className='mt-2 w-full'>{children}</div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray-50 px-4 py-3 sm:px-6 flex-row w-full flex justify-between'>
                        {showChamado ? (
                            <button
                                onClick={() => {
                                    toast({
                                        title: 'Chamado enviado para o engenheiro.',
                                        description:
                                            'Alerta sobrecarga módulo 4',
                                        variant: 'destructive',
                                    });
                                }}
                                type='button'
                                className='mr-auto text-sm inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 sm:ml-3 sm:w-auto sm:text-sm'
                            >
                                Abrir Chamado
                            </button>
                        ) : (
                            <></>
                        )}
                        <Link
                            href='/cameras'
                            className='text-sm inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 sm:ml-3 sm:w-auto sm:text-sm'
                        >
                            Abrir Câmeras
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
