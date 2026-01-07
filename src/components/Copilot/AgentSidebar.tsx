import { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Bot, User } from 'lucide-react';
import clsx from 'clsx';
import { dashboardData } from '../../data/mockData';

interface AgentSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    text: string;
}

export default function AgentSidebar({ isOpen, onClose }: AgentSidebarProps) {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'assistant', text: "Hello! I'm your ESG Copilot. I've analyzed your current carbon footprint. How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async (text?: string) => {
        const content = text || inputValue;
        if (!content.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', text: content };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate network delay and "thinking"
        setTimeout(() => {
            const responseText = generateResponse(content);
            const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', text: responseText };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const generateResponse = (query: string) => {
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('total') || lowerQuery.includes('emission')) {
            return `Your total emissions are **${dashboardData.totalEmissions} Tons CO₂e**. This is primarily driven by Scope 1 (${dashboardData.scope1} tons), while Scope 2 and 3 are currently zero.`;
        }
        if (lowerQuery.includes('reduce') || lowerQuery.includes('recommendation')) {
            return "Based on your data, **Sodium Bicarbonate** is the largest contributor (40 tons). I recommend switching to a lower-carbon alternative or optimizing the process usage. Would you like me to simulate the impact of a 10% reduction?";
        }
        if (lowerQuery.includes('scope 1')) {
            return "Scope 1 accounts for 100% of your current emissions footprint. Major contributors include Sodium Bicarbonate and Row-jet Kerosene.";
        }
        if (lowerQuery.includes('sodium')) {
            return "**Sodium Bicarbonate** contributes 40 Tons CO₂e, which is approximately 84.5% of your total emissions.";
        }

        return "I can help you analyze your carbon footprint data. Try asking about 'Total Emissions', 'Scope 1 Breakdown', or 'Reduction Strategies'.";
    };

    const suggestions = [
        "What is my total emission?",
        "How can I reduce emissions?",
        "Show me Scope 1 breakdown"
    ];

    return (
        <div className={clsx(
            "fixed inset-y-0 right-0 w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col font-sans border-l border-gray-200",
            isOpen ? "translate-x-0" : "translate-x-full"
        )}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-brand-green/10 to-transparent">
                <div className="flex items-center gap-2">
                    <div className="bg-brand-green p-1.5 rounded-lg">
                        <Sparkles className="text-white w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800">ESG Copilot</h2>
                        <p className="text-xs text-gray-500">AI-powered insights</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={clsx("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                        <div className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                            msg.role === 'assistant' ? "bg-white border border-gray-200" : "bg-brand-blue"
                        )}>
                            {msg.role === 'assistant' ? <Bot size={16} className="text-brand-green" /> : <User size={16} className="text-white" />}
                        </div>
                        <div className={clsx(
                            "p-3 rounded-2xl text-sm max-w-[80%] shadow-sm",
                            msg.role === 'assistant'
                                ? "bg-white text-gray-700 rounded-tl-none border border-gray-100"
                                : "bg-brand-blue text-white rounded-tr-none"
                        )}>
                            <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                            <Bot size={16} className="text-brand-green" />
                        </div>
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Suggestions (only if few messages) */}
            {messages.length < 3 && !isTyping && (
                <div className="px-4 py-2 bg-gray-50 flex flex-wrap gap-2">
                    {suggestions.map(s => (
                        <button
                            key={s}
                            onClick={() => handleSendMessage(s)}
                            className="text-xs bg-white border border-brand-green/30 text-brand-darkGreen px-3 py-1.5 rounded-full hover:bg-green-50 transition-colors"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
                <div className="relative">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask about your emissions..."
                        className="w-full bg-gray-100 text-sm rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                    />
                    <button
                        onClick={() => handleSendMessage()}
                        disabled={!inputValue.trim() || isTyping}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-brand-green text-white rounded-lg hover:bg-brand-darkGreen disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
