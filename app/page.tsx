'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import SolSvg from './sol.svg';
import UsinaSvg from './usina.svg';

import Link from 'next/link';
import './style.css';
import DateTimePicker, {
    DateTime,
} from './temperature/components/datetime-picker';
import { Slider } from '@/components/ui/slider';
import { getCookie, setCookie } from 'cookies-next';
export default function Home() {
    const [gb, setGb] = useState(0);
    const [gr, setGr] = useState(0);
    const [gd, setGd] = useState(0);
    const [p, setP] = useState(0);
    const [t2m, setT2m] = useState(0);
    const [wms, setWms] = useState(0);
    const [isDay, setIsDay] = useState(true);
    const [backgroundColor, setBackgroundColor] = useState('#a4e5ff');
    const [firstStripe, setFirstStripe] = useState('bg-sky-200');
    const [secondStripe, setSecondStripe] = useState('bg-sky-300');

    useEffect(() => {
        if (!isDay) {
            const sun = document.getElementById('sol_svg__sun');
            const moon = document.getElementById('sol_svg__moon');
            const star1 = document.getElementById('sol_svg__star-1');
            const star2 = document.getElementById('sol_svg__star-2');

            sun!.style.opacity = '0';
            moon!.style.opacity = '1';
            star1!.style.opacity = '1';
            star2!.style.opacity = '1';
        } else {
            const sun = document.getElementById('sol_svg__sun');
            const moon = document.getElementById('sol_svg__moon');
            const star1 = document.getElementById('sol_svg__star-1');
            const star2 = document.getElementById('sol_svg__star-2');

            sun!.style.opacity = '1';
            moon!.style.opacity = '0';
            star1!.style.opacity = '0';
            star2!.style.opacity = '0';
        }
    }, [isDay]);

    const [dateTime, setDateTime] = useState<DateTime>({
        month: (new Date().getMonth() + 1).toString(),
        day: (new Date().getDate() + 1).toString(),
        hour: new Date().getHours().toString(),
    });

    useEffect(() => {
        handleChange(dateTime);
    }, []);

    const handleChange = async (dateTime: DateTime) => {
        setDateTime(dateTime);

        const { day, month, hour } = dateTime;

        const response = await axios.get('https://usina-tcc.vercel.app/temperature', {
            params: {
                day: day,
                month: month,
                hour: +hour,
            },
        });

        setIsDay(+hour >= 5 && +hour < 18);
        if (+hour === 5 || +hour === 17) {
            setBackgroundColor('#ffd392');
            setFirstStripe('bg-orange-200');
            setSecondStripe('bg-orange-300');
        }

        if (+hour >= 6 && +hour < 17) {
            setBackgroundColor('#a4e5ff');
            setFirstStripe('bg-sky-200');
            setSecondStripe('bg-sky-300');
        }

        if (+hour < 5 || +hour >= 18) {
            setBackgroundColor('#002944');
            setFirstStripe('bg-sky-900');
            setSecondStripe('bg-sky-800');
        }

        setGb(response.data.gb);
        setGd(response.data.gd);
        setGr(response.data.gr);
        setP(response.data.p);
        setT2m(response.data.t2m);
        setWms(response.data.ws10m);

        setMinSlider(Math.floor(response.data.t2m) + 1);
    };

    const [temperatura, setTemperatura] = useState(33);
    const [perda, setPerda] = useState(0);
    const [geracao, setGeracao] = useState(0);
    const [minSlider, setMinSlider] = useState(0);

    function mudarTemperatura([temperatura]: number[]) {
        setTemperatura(temperatura);

        const percaEnergetica = (temperatura - t2m) * 0.3;
        setPerda(percaEnergetica);

        const geracaoEnergetica =
            (gb / 1000) * 1300 * (1 - percaEnergetica / 100);
        setGeracao(geracaoEnergetica);
    }

    useEffect(() => {
        mudarTemperatura([33]);
        setCookie('usina-tcc-t2m', t2m.toString());
    }, [t2m]);

    useEffect(() => {
        setCookie('usina-tcc-temperatura', temperatura.toString(), {
            maxAge: 60 * 60 * 24 * 30,
        });
        console.log('biscoito porra', getCookie('usina-tcc-temperatura'));
    }, [temperatura]);

    return (
        <main
            className='sky-bg flex min-h-screen flex-col items-center gap-10 p-4 sm:px-16 sm:py-24'
            style={{
                backgroundColor: backgroundColor,
            }}
        >
            <DateTimePicker
                handleChange={handleChange}
                dateTime={dateTime}
                isDay={isDay}
            />
            <div className='relative'>
                <SolSvg className='sun-svg' />
                <UsinaSvg className='usina-svg' />
            </div>
            <div
                className='flex flex-col sm:flex-row w-full'
                style={{
                    color: isDay ? 'black' : 'white',
                }}
            >
                <div className='w-full flex flex-col gap-0'>
                    <div
                        className={`flex flex-row items-center justify-between p-2 ${firstStripe}`}
                    >
                        <p className='font-bold'>Irradiação Direta (W/m2)</p>{' '}
                        <p>{gb}</p>
                    </div>
                    <div
                        className={`flex flex-row items-center justify-between p-2 ${secondStripe}`}
                    >
                        <p className='font-bold'>Irradiação Difusa (W/m2)</p>{' '}
                        <p> {gd}</p>
                    </div>
                    <div
                        className={`flex flex-row items-center justify-between p-2 ${firstStripe}`}
                    >
                        <p className='font-bold'>Irradiação Refletida (W/m2)</p>{' '}
                        <p>{gr}</p>
                    </div>
                    <div
                        className={`flex flex-row items-center justify-between p-2 ${secondStripe}`}
                    >
                        <p className='font-bold'>Potência (Wp)</p>
                        <p>{p}</p>
                    </div>
                    <div
                        className={`flex flex-row items-center justify-between p-2 ${firstStripe}`}
                    >
                        <p className='font-bold'>Velocidade do Vento (m/s)</p>
                        <p>{wms}</p>
                    </div>
                    <div
                        className={`flex flex-row items-center justify-between p-2 ${secondStripe}`}
                    >
                        <p className='font-bold'>Temperatura (C)</p>
                        <p>{t2m}</p>
                    </div>
                </div>
                <div className='w-full flex flex-col'>
                    <div
                        className={`flex flex-row items-center justify-between p-2 ${firstStripe}`}
                    >
                        <p className='font-bold'>Potencia dos Modulos (kWp)</p>
                        <p>1300</p>
                    </div>
                    <div
                        className={`flex flex-row items-center justify-between p-2 ${secondStripe}`}
                    >
                        <p className='font-bold'>Potência AC (MWac)</p>
                        <p>1</p>
                    </div>
                    <div
                        className={`flex flex-row items-center justify-between p-2 ${firstStripe}`}
                    >
                        <p className='font-bold'>Numero de modulos</p>
                        <p>1856</p>
                    </div>
                    <div
                        className={`flex flex-row items-center justify-between p-2 ${secondStripe}`}
                    >
                        <p className='font-bold'>Inversores (kW)</p>
                        <p>4 de 250</p>
                    </div>
                    <div
                        className={`flex flex-row items-center justify-between p-2 ${firstStripe}`}
                    >
                        <p className='font-bold'>
                            Limitação de potência no ponto de injeção (kWac)
                        </p>
                        <p> 1010</p>
                    </div>
                    <div
                        className={`flex flex-row items-center justify-between p-2 ${secondStripe}`}
                    >
                        <p className='font-bold'>Oversizing</p>
                        <p>1,3</p>
                    </div>
                </div>
            </div>
            <div
                className='flex flex-col sm:flex-row w-full gap-8'
                style={{
                    color: isDay ? 'black' : 'white',
                }}
            >
                <div className='w-full flex flex-col gap-0'>
                    <p>Simulação</p>
                    <div
                        className={`flex flex-row items-center justify-between p-2 ${secondStripe} gap-8`}
                    >
                        <p className='font-bold'>Perda de Eficiencia (%)</p>
                        <p>{perda.toFixed(3)}</p>
                    </div>
                    <div
                        className={`flex flex-row items-center justify-between p-2 ${firstStripe} gap-8`}
                    >
                        <p className='font-bold'>Geração de Energia (kW/h)</p>
                        <p>{geracao.toFixed(3)}</p>
                    </div>
                    <Slider
                        className='mt-4'
                        defaultValue={[33]}
                        max={100}
                        min={minSlider}
                        step={1}
                        onValueChange={(newValue) => mudarTemperatura(newValue)}
                    />
                    <p className='mt-2'>
                        Temperatura da placa:{' '}
                        <span className='font-bold'>{temperatura}</span>
                    </p>
                </div>
            </div>
            <Link
                className='px-12 py-4 bg-primary rounded-lg active:bg-blue-800 text-white transition-all duration-200'
                href='/corredores'
            >
                ver detalhes da usina
            </Link>
        </main>
    );
}
