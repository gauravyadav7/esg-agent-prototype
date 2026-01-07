import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface EmissionsDonutProps {
    value: number;
}

export default function EmissionsDonut({ value }: EmissionsDonutProps) {
    const data = [
        { name: 'Scope 1', value: 80, color: '#FFEB3B' }, // Yellow
        { name: 'Scope 2', value: 10, color: '#00C853' }, // Green
        { name: 'Scope 3', value: 10, color: '#2196F3' }, // Blue
    ];

    // The simplified donut in the screenshot seems to be mainly one color or segment for "Scope 1" since Scope 2/3 are 0 in the mock data, 
    // but logically it should be a breakdown. The screenshot shows a multi-colored ring.
    // I will mock the visual appearance of the ring.

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-80 flex flex-col">
            <h3 className="font-bold text-gray-700 mb-4">Total Emissions</h3>
            <div className="flex-1 min-h-0 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            startAngle={90}
                            endAngle={-270}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        {/* Center Label */}
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-gray-800">{value}</span>
                    <span className="text-xs text-gray-500">Tons CO₂e</span>
                </div>
            </div>
        </div>
    );
}
