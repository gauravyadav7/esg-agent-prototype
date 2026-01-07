import { useState } from 'react';
import { Lock } from 'lucide-react';

interface LoginProps {
    onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Hardcoded "password" for the prototype
        if (password === 'demo123') {
            onLogin();
        } else {
            setError(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-100">
                <div className="flex justify-center mb-6">
                    <div className="p-3 bg-brand-green/10 rounded-full">
                        <Lock className="w-8 h-8 text-brand-green" />
                    </div>
                </div>
                
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Clenergize ESG+</h2>
                <p className="text-gray-500 text-center text-sm mb-8">Enter access code to view prototype</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(false); }}
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors"
                            autoFocus
                        />
                         {error && <p className="text-red-500 text-xs mt-2 ml-1">Incorrect password. Try 'demo123'</p>}
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-brand-green hover:bg-brand-darkGreen text-white font-medium py-3 rounded-lg transition-colors shadow-sm"
                    >
                        Access Dashboard
                    </button>
                    
                    <p className="text-center text-xs text-gray-400 mt-4">
                        Protected Prototype • v3.0
                    </p>
                </form>
            </div>
        </div>
    );
}
