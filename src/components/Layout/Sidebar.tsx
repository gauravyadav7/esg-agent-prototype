import { Plus } from 'lucide-react';

export default function Sidebar() {
    const trees = ['tree1', 'tree2', 'tree3', 'Tree 4', 'Tree 5', 'Tree6', 'tree7', 'tree8'];

    return (
        <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col font-sans">
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                    {/* Placeholder for Logo */}
                    <div className="w-6 h-6 bg-brand-green rounded-full"></div>
                    <span className="font-bold text-lg">Clenergize</span>
                </div>
                <div className="bg-green-50 p-3 rounded-md mb-2">
                    <h3 className="font-bold text-sm">tree</h3>
                    <p className="text-xs text-gray-500">Parent Company</p>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto">
                <ul>
                    {trees.map((tree, i) => (
                        <li key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 text-sm text-gray-700">
                            <span>{tree}</span>
                            {[1, 2, 6].includes(i) && <Plus size={14} className="text-gray-400" />}
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 mt-auto">
                <div className="text-green-600 font-bold text-xl">Clenergize <span className="text-yellow-400 text-xs align-top">ESG+</span></div>
                <div className="text-right text-xs text-green-500 font-bold">v3.0</div>
            </div>
        </div>
    );
}
