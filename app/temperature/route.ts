export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import database from './data.json';
type SearchParams = {
    day: string;
    hour: string;
    month: string;
};

export function GET(request: NextRequest) {
    const day = request.nextUrl.searchParams.get('day');
    const month = request.nextUrl.searchParams.get('month');
    const hour = request.nextUrl.searchParams.get('hour');

    const arr = [...database.outputs.hourly];

    const retorno = arr.find((h) => {
        const time = `2020${format(month!)}${format(day!)}:${format(hour!)}05`;
        return h.time === time;
    });

    if (!retorno) {
        return Response.json({ message: 'Não achou.' });
    }
    return Response.json({
        time: retorno.time,
        p: retorno.P,
        gb: retorno['Gb(i)'],
        gd: retorno['Gd(i)'],
        gr: retorno['Gr(i)'],
        h_sun: retorno.H_sun,
        t2m: retorno.T2m,
        ws10m: retorno.WS10m,
    });
}

function format(n: string) {
    return n.length === 1 ? `0${n}` : n;
}
