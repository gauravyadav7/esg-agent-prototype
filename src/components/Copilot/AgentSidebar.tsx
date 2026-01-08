import { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Bot, User } from 'lucide-react';
import clsx from 'clsx';
import { dashboardData } from '../../data/mockData';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
        { id: '1', role: 'assistant', text: "Hello! I'm your ESG Copilot. I'm connected to the **Live Gemini AI**. How can I help you today?" }
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

        try {
            let replyText = "";

            // HYBRID APPROACH:
            // 1. If running locally with VITE_GEMINI_API_KEY, use direct SDK (bypasses need for local backend).
            // 2. Otherwise, assume we are in production (Vercel) and use the serverless function.

            const localKey = import.meta.env.VITE_GEMINI_API_KEY;

            if (localKey) {
                console.log("Using Local Client-Side Gemini Key");
                const genAI = new GoogleGenerativeAI(localKey);
                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

                const prompt = `
                  You are an expert ESG AI analyst for "Clenergize".
                  Dashboard Data: ${JSON.stringify(dashboardData)}
                  User Question: "${content}"
                  
                  Answer concisely based on the data.
                `;

                const result = await model.generateContent(prompt);
                replyText = result.response.text();
            } else {
                console.log("Using Serverless Function /api/chat");
                const res = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: content,
                        contextData: dashboardData
                    })
                });

                if (!res.ok) {
                    throw new Error(`API Error: ${res.statusText}`);
                }
                const data = await res.json();
                replyText = data.reply;
            }

            const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', text: replyText };
            setMessages(prev => [...prev, botMsg]);

        } catch (error: any) {
            console.error("Agent Error Details:", error);

            // Debugging helper: check if key is loaded
            const hasKey = !!import.meta.env.VITE_GEMINI_API_KEY;
            console.log("DEBUG: VITE_GEMINI_API_KEY loaded?", hasKey);

            let debugMsg = "";
            if (!hasKey) {
                debugMsg = "\n\n**DEBUG CAUSE**: `VITE_GEMINI_API_KEY` is missing or undefined. The app fell back to `/api/chat` which failed (expected locally).";
            } else {
                debugMsg = `\n\n**DEBUG ERROR**: ${error.message || JSON.stringify(error)}`;
            }

            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                text: "⚠️ **Connection Error**: " + debugMsg
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
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
                        <p className="text-xs text-gray-500">Live Gemini Enabled</p>
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
                            <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br/>') }} />
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
