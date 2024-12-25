import { scaleLinear, scaleTime } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';

const LineGraph = ({ width, height, data }) => {
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const xScale = scaleTime({
        domain: [Math.min(...data.map(d => new Date(d.date))), Math.max(...data.map(d => new Date(d.date)))],
        range: [0, xMax],
    });

    const yScale = scaleLinear({
        domain: [0, Math.max(...data.map(d => d.value))],
        range: [yMax, 0],
    });

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <LinePath
                    data={data}
                    x={d => xScale(new Date(d.date))}
                    y={d => yScale(d.value)}
                    stroke='#007bff'
                    strokeWidth={2}
                />
                <AxisBottom top={yMax} scale={xScale} />
                <AxisLeft scale={yScale} />
            </g>
        </svg>
    )
}