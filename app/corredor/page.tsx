'use client';
import { useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { SolarPanelHorizontal } from '../temperature/components/solar-panel';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { ItemListaModalProps, montarTabela } from './montarTabela';

export default function Corredor() {
    const random = (max: number, min: number): number =>
        Math.floor(Math.random() * (max - min + 1) + min);

    const searchParams = useSearchParams();
    const corridorNumber = Number(searchParams.get('numero')!);
    const [selectedModule, setSelectedModule] = useState<number | null>(null);
    
    const t2m = parseInt(getCookie('usina-tcc-t2m')?.toString() || '0');
    
    const handleModuleClick = (index: number) => {
        setSelectedModule(index);
    };
    
    const handleModuleClose = () => {
        setSelectedModule(null);
    };
    
    const temperaturaAtualPlacaRuim = parseInt(
        getCookie('usina-tcc-temperatura')?.toString() || '0'
    );
    const temperaturaAtualPlacaBoa = random(44, t2m + 1);

    const eficienciaPlacaRuim = 22.5 - (temperaturaAtualPlacaRuim - 25) * 0.3;
    
    const correnteAtualPlacaRuim = +(
        18.49 *
        (1 + (25 - temperaturaAtualPlacaRuim) * (0.05 / 100))
    ).toFixed(2);

    const correnteAtualPlacaBoa = +(
        17.51 *
        (1 + (25 - temperaturaAtualPlacaBoa) * (0.05 / 100))
    ).toFixed(2);

    const tensaoAtual = random(15, 1);
    const potenciaAtual = tensaoAtual * correnteAtualPlacaRuim;
    
    const ehPlacaZoada = selectedModule === 3 && corridorNumber === 3;
    useEffect(() => {
        console.log(
            'biscoito porra - detalhe da usina',
            temperaturaAtualPlacaRuim,
            t2m,
            eficienciaPlacaRuim
        );
    }, [temperaturaAtualPlacaRuim, t2m, eficienciaPlacaRuim]);

    const listaItems = montarTabela({
        correnteAtualPlacaRuim,
        correnteAtualPlacaBoa,
        eficienciaPlacaRuim,
        ehPlacaZoada,
        temperaturaAtualPlacaBoa,
        temperaturaAtualPlacaRuim,
        tensaoAtual,
        potenciaAtual,
    });

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
                <Modal showChamado={ehPlacaZoada} onClose={handleModuleClose}>
                    <div className='w-full'>
                        <p className='font-extrabold text-lg'>
                            Módulo {selectedModule + 1}
                        </p>
                    </div>
                    <div className='flex flex-col gap-2 w-full mt-8'>
                        {listaItems.map((item, index) => (
                            <ItemListaModal
                                key={index}
                                titulo={item.titulo}
                                valorPlacaBoa={item.valorPlacaBoa}
                                valorPlacaRuim={item.valorPlacaRuim}
                                exibirCor={item.exibirCor}
                                ehPlacaZoada={item.ehPlacaZoada}
                            />
                        ))}
                    </div>
                </Modal>
            )}
        </main>
    );
}

const ItemListaModal = ({
    titulo,
    valorPlacaBoa,
    valorPlacaRuim,
    exibirCor,
    ehPlacaZoada,
}: ItemListaModalProps) => {
    const cor = ehPlacaZoada ? 'text-red-500' : 'text-green-500';

    return (
        <div
            className={`flex flex-row justify-between w-full ${
                exibirCor ? cor : 'text-black'
            }`}
        >
            <p className='font-extrabold'>{titulo}</p>
            <p>{ehPlacaZoada ? valorPlacaRuim : valorPlacaBoa}</p>
        </div>
    );
};

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
