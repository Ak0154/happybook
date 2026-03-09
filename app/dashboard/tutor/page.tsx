"use client";

import { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AiTutorPage() {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hello! I'm your AI Tutor. I can help you with math, essay writing, or explaining complex concepts. What are you working on today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMsg = { role: 'user', text: input.trim() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Mock AI response delay
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: "That's an interesting question! Let's break it down step by step. First, consider the core concepts related to your inquiry. What do you think the first step should be?"
            }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] w-full max-w-5xl mx-auto rounded-3xl border border-border/50 bg-card overflow-hidden shadow-sm">
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                        <Avatar className="w-10 h-10 border border-border/50 shadow-sm mt-1">
                            {msg.role === 'assistant' ? (
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    <Bot className="w-5 h-5" />
                                </AvatarFallback>
                            ) : (
                                <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                                    <User className="w-5 h-5" />
                                </AvatarFallback>
                            )}
                        </Avatar>
                        
                        <div className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                            msg.role === 'assistant' 
                                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-sm border border-border/50' 
                                : 'bg-primary text-primary-foreground rounded-tr-sm'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                
                {isTyping && (
                    <div className="flex gap-4 max-w-[85%] self-start mt-2">
                        <Avatar className="w-10 h-10 border border-border/50 shadow-sm">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                <Bot className="w-5 h-5" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="px-5 py-4 rounded-2xl rounded-tl-sm bg-zinc-100 dark:bg-zinc-800 flex items-center gap-1.5 border border-border/50 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"></span>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-border/50">
                <form onSubmit={handleSend} className="relative flex items-center w-full max-w-4xl mx-auto">
                    <input
                        type="text"
                        placeholder="Message AI Tutor..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isTyping}
                        className="w-full pl-6 pr-14 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-zinc-900 dark:text-zinc-100 disabled:opacity-50"
                    />
                    <button 
                        type="submit" 
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2.5 p-2 bg-primary text-primary-foreground rounded-xl shadow-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
                <p className="text-center text-xs text-zinc-500 mt-3 font-medium">
                    AI Tutor can make mistakes. Consider verifying important academic facts.
                </p>
            </div>
        </div>
    );
}
