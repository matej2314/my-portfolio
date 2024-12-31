import { Pie } from '@visx/shape';
import { useMediaQuery } from 'react-responsive';

const PieChart = ({ data, innerRadius = 0, outerRadius = 200 }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    const width = isMobile ? 350 : 400;
    const height = isMobile ? 350 : 400;

    const centerX = width / 2;
    const centerY = height / 2;

    const adjustedOuterRadius = isMobile ? width / 2 - 20 : outerRadius;
    const adjustedInnerRadius = isMobile ? 30 : innerRadius;

    const renderLegend = () => {
        const maxItems = 3
        const limitedData = data.slice(0, maxItems);

        return (
            <g transform={`translate(30, ${height + 20})`}>
                {limitedData.map((d, i) => (
                    <g key={`legend-${i}`} transform={`translate(${i * 120}, 0)`}>
                        <rect width={15} height={15} fill={d.color} />
                        <text x={20} y={12} fontSize={isMobile ? 12 : 14} fill="#e1e1e3">
                            {d.label} : {d.value}
                        </text>
                    </g>
                ))}
            </g>
        );
    };

    return (
        // with space for legend
        <svg width={width} height={height + 50}>
            <g transform={`translate(${centerX}, ${centerY})`}>
                <Pie
                    data={data}
                    pieValue={d => d.value}
                    innerRadius={adjustedInnerRadius}
                    outerRadius={adjustedOuterRadius}
                    cornerRadius={3}
                    padAngle={0.02}
                >
                    {pie => pie.arcs.map(arc => (
                        <g key={`arc-${arc.data.label}`}>
                            <path d={pie.path(arc)} fill={arc.data.color} />
                            <text
                                transform={`translate(${pie.path.centroid(arc)})`}
                                textAnchor='middle'
                                fill='#e1e1e3'
                                fontSize={isMobile ? 10 : 14}
                            >
                                {/* {!isMobile && arc.data.label} */}
                            </text>
                        </g>
                    ))}
                </Pie>
            </g>
            {renderLegend()}
        </svg>
    );
};

export default PieChart;
