interface SummaryCardProps {
    title: string;
    subTitle: string;
    value: number | string;
    unit: string;
}

export default function SummaryCard({ subTitle, value, unit }: SummaryCardProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between h-24">
            <div>
                <span className="text-2xl font-bold text-gray-800">{value}</span>
                <span className="text-sm text-gray-500 ml-1">{unit}</span>
            </div>
            <div className="text-sm text-gray-500">{subTitle}</div>
        </div>
    );
}
