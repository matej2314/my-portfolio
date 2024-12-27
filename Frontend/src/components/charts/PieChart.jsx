import { Pie } from '@visx/shape';

const PieChart = ({ width, height, data, innerRadius = 0, outerRadius = Math.min(width, height) / 2 }) => {

    const centerX = width / 2;
    const centerY = height / 2;

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${centerX}, ${centerY})`}>
                <Pie
                    data={data}
                    pieValue={d => d.value}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    cornerRadius={3}
                    padAngle={0.02}
                >
                    {pie => pie.arcs.map(arc => (
                        <g
                            key={`arc-${arc.data.label}`}
                        >
                            <path d={pie.path(arc)} fill={arc.data.color} />
                            <text
                                transform={`translate(${pie.path.centroid(arc)})`}
                                textAnchor='middle'
                                fill='#e1e1e3'
                                fontSize={14}
                            >
                                {arc.data.label}
                            </text>
                        </g>
                    ))}
                </Pie>
            </g>
        </svg>
    )
};

export default PieChart;