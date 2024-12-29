import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';

const BarChart = ({ width, height, data }) => {
    const margin = { top: 30, right: 0, bottom: 0, left: 25 }; // Zwiększamy lewy margines, aby było miejsce na etykiety osi Y
    const xMax = width - margin.right - margin.left;
    const yMax = height - margin.top - margin.bottom;

    const sortedData = [...data].sort((a, b) => new Date(a.label) - new Date(b.label));

    // Skala X: pasująca do etykiet (dat) na osi poziomej
    const xScale = scaleBand({
        domain: sortedData.map(d => d.label),  // Pobieranie etykiet (dat) jako domeny
        range: [0, xMax],
        padding: 0.3,  // Odstęp między słupkami
    });

    // Skala Y: mapująca wartości na wysokość słupków na osi pionowej
    const yScale = scaleLinear({
        domain: [0, Math.max(...sortedData.map(d => d.value)) * 1.1],  // Skala oparta na największej wartości
        range: [yMax, 0],  // Przekształcamy wartości na zakres od dołu do góry
        nice: true,
    });

    return (
        <svg width={width} height={height}>
            <g>
                {/* Renderowanie słupków */}
                {sortedData.map((d, i) => {
                    const x = xScale(d.label);  // Ustalamy pozycję słupka na osi X
                    const y = yScale(d.value);  // Ustalamy pozycję słupka na osi Y
                    const heightBar = yMax - y;  // Wysokość słupka

                    return (
                        <Bar
                            key={`bar-${i}`}
                            x={x}  // Pozycja słupka na osi X
                            y={y}  // Pozycja słupka na osi Y
                            height={heightBar}  // Wysokość słupka
                            width={xScale.bandwidth()}  // Szerokość słupka
                            fill="#0dbd22"
                        />
                    );
                })}
            </g>

            {/* Oś X: wyświetlanie etykiet (dat) na dole wykresu */}
            <AxisBottom
                scale={xScale}
                top={yMax}
                tickLabelProps={{
                    fontSize: 14, // Zmiana rozmiaru czcionki
                    fill: '#84cc16', // Zmiana koloru czcionki na niebieski
                    textAnchor: 'middle', // Wyrównanie tekstu
                }}
            />

            {/* Oś Y: wyświetlanie wartości na lewej stronie wykresu */}
            <AxisLeft
                scale={yScale}
                tickFormat={value => value}  // Zaokrąglenie wartości na osi Y
                numTicks={10}
                top={0}  // Ustawienie osi od samej góry
                left={margin.left}  // Wyrównanie do lewego marginesu
                tickLabelProps={{
                    fontSize: 14,  // Rozmiar czcionki
                    fill: '#fff',  // Kolor czcionki
                    textAnchor: 'middle',  // Wyrównanie etykiet do środka
                    dx: -5,
                }}
            />

        </svg>
    );
};

export default BarChart;
