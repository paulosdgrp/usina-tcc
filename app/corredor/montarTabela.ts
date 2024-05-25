const random = (max: number, min: number): number =>
    Math.floor(Math.random() * (max - min + 1) + min);

interface DadosTabela {
    temperaturaAtualPlacaBoa: number;
    temperaturaAtualPlacaRuim: number;
    potenciaAtual: number;
    tensaoAtual: number;
    correnteAtualPlacaRuim: number;
    correnteAtualPlacaBoa: number;
    eficienciaPlacaRuim: number;
    ehPlacaZoada: boolean;
}

export interface ItemListaModalProps {
    titulo: string;
    valorPlacaBoa: string;
    valorPlacaRuim: string;
    exibirCor?: boolean;
    ehPlacaZoada: boolean;
}

export const montarTabela = ({
    ...dados
}: DadosTabela): ItemListaModalProps[] => {
    if (dados.temperaturaAtualPlacaRuim > 85) {
        dados.potenciaAtual = 0;
        dados.tensaoAtual = 0;
        dados.correnteAtualPlacaRuim = 0;
        dados.eficienciaPlacaRuim = 0;
    }

    return [
        {
            titulo: 'Marca',
            ehPlacaZoada: dados.ehPlacaZoada,
            valorPlacaBoa: 'Canadian Solar',
            valorPlacaRuim: 'Canadian Solar',
            exibirCor: false,
        },
        {
            titulo: 'Tecnologia',
            ehPlacaZoada: dados.ehPlacaZoada,
            valorPlacaBoa: 'Topcon Bifacial',
            valorPlacaRuim: 'Canadian Solar',
            exibirCor: false,
        },
        {
            titulo: 'Temperatura Atual',
            ehPlacaZoada: dados.ehPlacaZoada,
            valorPlacaBoa: `${dados.temperaturaAtualPlacaBoa}°C`,
            valorPlacaRuim: `${dados.temperaturaAtualPlacaRuim}°C`,
            exibirCor: false,
        },
        {
            titulo: 'Potência Máxima',
            ehPlacaZoada: dados.ehPlacaZoada,
            valorPlacaBoa: '700W',
            valorPlacaRuim: '700W',
            exibirCor: false,
        },
        {
            titulo: 'Potência Atual',
            ehPlacaZoada: dados.ehPlacaZoada,
            valorPlacaBoa: `${random(700, 600)}W`,
            valorPlacaRuim: `${dados.potenciaAtual.toFixed(2)}W`,
            exibirCor: true,
        },
        {
            titulo: 'Tensão Máxima',
            ehPlacaZoada: dados.ehPlacaZoada,
            valorPlacaBoa: '40V',
            valorPlacaRuim: '40V',
            exibirCor: false,
        },
        {
            titulo: 'Tensão Atual',
            ehPlacaZoada: dados.ehPlacaZoada,
            valorPlacaBoa: `${random(40, 35)}V`,
            valorPlacaRuim: `${dados.tensaoAtual}V`,
            exibirCor: true,
        },
        {
            titulo: 'Corrente Máxima',
            ehPlacaZoada: dados.ehPlacaZoada,
            valorPlacaBoa: '17.51A',
            valorPlacaRuim: '17.51A',
            exibirCor: false,
        },
        {
            titulo: 'Corrente Atual Placa',
            ehPlacaZoada: dados.ehPlacaZoada,
            valorPlacaBoa: `${dados.correnteAtualPlacaBoa}A`,
            valorPlacaRuim: `${dados.correnteAtualPlacaRuim}A`,
            exibirCor: true,
        },
        {
            titulo: 'Tensão de circuito aberto',
            ehPlacaZoada: dados.ehPlacaZoada,
            valorPlacaBoa: '47.9V',
            valorPlacaRuim: '47.9V',
            exibirCor: false,
        },
        {
            titulo: 'Corrente de curto circuito',
            ehPlacaZoada: dados.ehPlacaZoada,
            valorPlacaBoa: '18.49A',
            valorPlacaRuim: '18.49A',
            exibirCor: false,
        },
        {
            titulo: 'Eficiencia do Modulo',
            ehPlacaZoada: dados.ehPlacaZoada,
            valorPlacaBoa: '22.5%',
            valorPlacaRuim: '22.5%',
            exibirCor: false,
        },
        {
            titulo: 'Eficiencia Atual',
            ehPlacaZoada: dados.ehPlacaZoada,
            valorPlacaBoa: `${random(22, 20)}.5%`,
            valorPlacaRuim: dados.eficienciaPlacaRuim.toFixed(1) + '%',
            exibirCor: true,
        },
        {
            titulo: 'Degradação Anual',
            ehPlacaZoada: dados.ehPlacaZoada,
            valorPlacaBoa: '0.40%',
            valorPlacaRuim: '0.40%',
            exibirCor: false,
        },
        {
            titulo: 'Dimensões',
            ehPlacaZoada: dados.ehPlacaZoada,
            valorPlacaBoa: '2384x1393x33mm',
            valorPlacaRuim: '2384x1393x33mm',
            exibirCor: false,
        },
        {
            titulo: 'Temperatura de Operação',
            ehPlacaZoada: dados.ehPlacaZoada,
            valorPlacaBoa: '-40°C ~~ +85°C',
            valorPlacaRuim: '-40°C ~~ +85°C',
            exibirCor: false,
        },
    ];
};
