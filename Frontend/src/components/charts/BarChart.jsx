import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';

const BarChart = ({ width, height, data }) => {
    const margin = { top: 30, right: 0, bottom: 0, left: 25 };
    const xMax = width - margin.right - margin.left;
    const yMax = height - margin.top - margin.bottom;

    const sortedData = [...data].sort((a, b) => new Date(a.label) - new Date(b.label));

    const xScale = scaleBand({
        domain: sortedData.map(d => d.label),
        range: [0, xMax],
        padding: 0.3,
    });

    const yScale = scaleLinear({
        domain: [0, Math.max(...sortedData.map(d => d.value)) * 1.1],
        range: [yMax, 0],
    });

    return (
        <svg width={width} height={height}>
            <g>
                {/* Renderowanie słupków */}
                {sortedData.map((d, i) => {
                    const x = xScale(d.label);
                    const y = yScale(d.value);
                    const heightBar = yMax - y;

                    return (
                        <Bar
                            key={`bar-${i}`}
                            x={x}
                            y={y}
                            height={heightBar}
                            width={xScale.bandwidth()}
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
                    fontSize: 14,
                    fill: '#84cc16',
                    textAnchor: 'middle',
                }}
            />

            {/* Oś Y: wyświetlanie wartości na lewej stronie wykresu */}
            <AxisLeft
                scale={yScale}
                tickFormat={value => value}
                numTicks={10}
                top={0}
                left={margin.left}
                tickLabelProps={{
                    fontSize: 14,
                    fill: '#fff',
                    textAnchor: 'middle',
                    dx: -5,
                }}
            />

        </svg>
    );
};

export default BarChart;
