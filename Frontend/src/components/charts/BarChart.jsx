import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';

const BarChart = ({ width, height, data }) => {
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin - top - margin.bottom;

    const xScale = scaleBand({
        domain: data.map(d => d.label),
        range: [0, xMax],
        padding: 0.2,
    });

    const yScale = scaleLinear({
        domain: [0, Math.max(...data.map(d => d.value))],
        range: [yMax, 0],
    });

    return (
        <svg
            width={width}
            height={height}
        >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                {data.map((d, i) => (
                    <Bar
                        key={`bar-${i}`}
                        x={xScale(d.label)}
                        y={yScale(d.value)}
                        height={yMax - yScale(d.value)}
                        width={xScale.bandwidth()}
                        fill='#007bff'
                    />
                ))}
            </g>
        </svg>
    );
};

export default BarChart;