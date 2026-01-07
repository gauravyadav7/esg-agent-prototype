import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface EmissionsBarChartProps {
    title: string;
    data: { name: string; value: number }[];
    yAxisWidth?: number;
}

export default function EmissionsBarChart({ title, data, yAxisWidth = 100 }: EmissionsBarChartProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-96 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-700">{title}</h3>
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        barSize={20}
                    >
                        <XAxis type="number" hide />
                        <YAxis
                            type="category"
                            dataKey="name"
                            width={yAxisWidth}
                            tick={{ fontSize: 11, fill: '#666' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="value" fill="#42A5F5" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
