'use client';
import Link from 'next/link';
import { SolarPanelVertical } from '../temperature/components/solar-panel';
import './style.css';

export default function Corredores() {
    return (
        <main className='sky-bg flex min-h-screen flex-col items-center gap-10 p-4 sm:px-16 sm:py-24'>
            {Array.from({ length: 4 }).map((_, index) => (
                <Link href={`/corredor?numero=${index+1}`} className='flex flex-col gap-2 justify-center items-center'>
                    <p>String {index + 1}</p>
                    <div
                        className={`flex flex-row gap-4 p-2 border-2 rounded-lg cursor-pointer ${
                            index === 2 ? 'piscapisca' : 'border-black'
                        } transition-all duration-200`}
                    >
                        {Array.from({ length: 16 }).map((_, idx) => (
                            <SolarPanelVertical
                                problema={idx === 3 && index === 2}
                                key={idx}
                            />
                        ))}
                    </div>
                </Link>
            ))}
        </main>
    );
}
