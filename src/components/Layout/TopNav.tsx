import { Bell, HelpCircle, MessageSquare } from 'lucide-react';

interface TopNavProps {
    onChatToggle: () => void;
}

export default function TopNav({ onChatToggle }: TopNavProps) {
    return (
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <div className="flex gap-8 text-sm font-medium text-gray-600">
                <span className="cursor-pointer hover:text-brand-green">Company Details</span>
                <span className="cursor-pointer text-brand-blue border-b-2 border-brand-blue pb-5 mt-5">Carbon Footprint</span>
                <span className="cursor-pointer hover:text-brand-green">Gap Analysis</span>
                <span className="cursor-pointer hover:text-brand-green">Benchmarking</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xs">
                    A
                </div>
                <HelpCircle className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                <MessageSquare
                    className="w-5 h-5 text-gray-400 cursor-pointer hover:text-brand-blue transition-colors"
                    onClick={onChatToggle}
                />
                <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
        </div>
    );
}
