import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { useMediaQuery } from 'react-responsive';

const BarChart = ({ data }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const margin = { top: 30, right: isMobile ? -15 : 0, bottom: 0, left: isMobile ? 17 : 25 };

    const width = isMobile ? 300 : 650;
    const height = isMobile ? 250 : 400;

    const xMax = width - margin.right - margin.left;
    const yMax = height - margin.top - margin.bottom;

    const sortedData = [...data].sort((a, b) => new Date(a.label) - new Date(b.label));

    const xScale = scaleBand({
        domain: sortedData.map(d => d.label),
        range: [0, xMax],
        padding: isMobile ? 0.5 : 0.4,
    });

    const yScale = scaleLinear({
        domain: [0, Math.max(...sortedData.map(d => d.value))],
        range: [yMax, 0],
    });

    return (
        <svg width={width} height={height}>
            <g>
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
            <AxisBottom
                scale={xScale}
                top={yMax}
                tickLabelProps={{
                    fontSize: isMobile ? 6 : 13,
                    fill: '#84cc16',
                    textAnchor: 'middle',
                }}
            />
            <AxisLeft
                scale={yScale}
                tickFormat={value => value}
                numTicks={10}
                top={0}
                left={margin.left}
                tickLabelProps={{
                    fontSize: isMobile ? 10 : 14,
                    fill: '#fff',
                    textAnchor: 'middle',
                    dx: -3,
                }}
            />
        </svg>
    );
};

export default BarChart;
