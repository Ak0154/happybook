"use client";

import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Plus, MessageSquare, MoreHorizontal, Settings, Clock, Check } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";

const Typewriter = ({ text, onComplete }: { text: string, onComplete: () => void }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text.charAt(index));
                setIndex(prev => prev + 1);
            }, 10 + Math.random() * 20); // random speed for natural feel
            return () => clearTimeout(timer);
        } else {
            onComplete();
        }
    }, [index, text, onComplete]);

    return (
        <span>
            {displayedText}
            {index < text.length && <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-primary animate-pulse" />}
        </span>
    );
};

export default function AiTutorPage() {
    const defaultMessage = { role: 'assistant', text: "Hello! I'm your AI Tutor. I can help you with math, essay writing, or explaining complex concepts. What are you working on today?" };
    const [messages, setMessages] = useState<{ role: string, text: string, isNew?: boolean }[]>([defaultMessage]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Mock History
    const [history, setHistory] = useState([
        { id: 1, title: "Calculus Derivatives", date: "Today" },
        { id: 2, title: "History Essay Draft", date: "Yesterday" },
        { id: 3, title: "Biology Concepts", date: "Past 7 Days" },
        { id: 4, title: "Physics Formulas", date: "Past 7 Days" },
    ]);
    const [activeChat, setActiveChat] = useState("current");

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        const stored = localStorage.getItem("happybook_tutor_chat");
        if (stored) {
            setMessages(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Keep scrolling to bottom while heavily generating long text
    useEffect(() => {
        const interval = setInterval(() => {
            if (isGenerating || isTyping) {
                scrollToBottom();
            }
        }, 100);
        return () => clearInterval(interval);
    }, [isGenerating, isTyping]);

    const saveMessages = (newMessages: { role: string, text: string, isNew?: boolean }[]) => {
        setMessages(newMessages);
        const toSave = newMessages.map(m => ({ role: m.role, text: m.text }));
        localStorage.setItem("happybook_tutor_chat", JSON.stringify(toSave));
    };

    const handleNewChat = () => {
        if (messages.length > 1) {
            // Unshift current chat to history (mock)
            setHistory([{ id: Date.now(), title: messages[1].text.substring(0, 25) + '...', date: "Just now" }, ...history]);
        }
        setMessages([defaultMessage]);
        localStorage.removeItem("happybook_tutor_chat");
        setActiveChat("current");
    };

    const loadHistoryChat = (title: string, id: number | string) => {
        setActiveChat(id.toString());
        setMessages([
            { role: 'assistant', text: `Loaded history for: ${title}. How can I assist you further with this topic?` },
            { role: 'user', text: `Let's resume talking about ${title}` },
            { role: 'assistant', text: `Sure! I recall we were discussing the core principles. Shall we continue?` }
        ]);
    };

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isTyping || isGenerating) return;

        const userText = input.trim();
        const userMsg = { role: 'user', text: userText };
        const updatedMessages = [...messages, userMsg];
        saveMessages(updatedMessages);
        setInput('');
        setIsTyping(true);

        const mockResponses = [
            "That's an interesting question! Let's break it down step by step.",
            "I can definitely help with that. First, consider the core concepts related to your inquiry.",
            "Good observation. In a real-world scenario, this often implies that you should look for the underlying pattern.",
            "I'm here to help! A great way to approach this is to write down what we already know.",
            `Let's think about "${userText}". Does that sound like a concept you've encountered in your recent lessons?`
        ];

        // Mock AI response delay
        setTimeout(() => {
            const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
            saveMessages([...updatedMessages, { role: 'assistant', text: randomResponse, isNew: true }]);
            setIsTyping(false);
            setIsGenerating(true);
        }, 800);
    };

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-140px)] w-full max-w-7xl mx-auto rounded-3xl border border-border/50 bg-card overflow-hidden shadow-sm">

            {/* History Sidebar */}
            <div className="w-full md:w-72 bg-surface/50 border-r border-border/50 p-4 flex flex-col gap-4 shrink-0 transition-all">
                <button
                    onClick={handleNewChat}
                    className="w-full py-3 px-4 bg-background border border-border/80 hover:bg-surface rounded-xl flex items-center justify-between text-sm font-bold shadow-sm transition-all text-foreground hover:shadow-md active:scale-[0.98]"
                >
                    <span className="flex items-center gap-2"><Plus className="w-4 h-4" /> New Chat</span>
                    <MessageSquare className="w-4 h-4 opacity-50" />
                </button>

                <div className="flex-1 overflow-y-auto pr-1 -mr-1 flex flex-col gap-6 mt-2">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--on-surface-variant)] px-2 mb-1">Recent Chats</span>
                        {history.map(item => (
                            <button
                                key={item.id}
                                onClick={() => loadHistoryChat(item.title, item.id)}
                                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 group ${activeChat === item.id.toString() ? 'bg-primary/10 text-primary font-bold' : 'text-foreground hover:bg-surface font-medium'}`}
                            >
                                <MessageSquare className={`w-4 h-4 shrink-0 ${activeChat === item.id.toString() ? 'text-primary' : 'opacity-40'}`} />
                                <span className="truncate flex-1">{item.title}</span>
                                <MoreHorizontal className="w-4 h-4 opacity-0 group-hover:opacity-40 transition-opacity shrink-0" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-border/50 mt-auto flex flex-col gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="flex items-center gap-3 text-sm font-semibold text-[var(--on-surface-variant)] hover:text-foreground p-2 rounded-lg hover:bg-surface transition-colors w-full text-left">
                                <Settings className="w-4 h-4" /> Tutor Settings
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>AI Tutor Preferences</DialogTitle>
                                <DialogDescription>Customize your learning experience.</DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-4 mt-2">
                                <div className="flex justify-between items-center group">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-foreground">Detailed Answers</span>
                                        <span className="text-xs text-[var(--on-surface-variant)]">AI will provide step-by-step logic.</span>
                                    </div>
                                    <button className="w-10 h-6 bg-green-500 rounded-full relative shadow-inner"><span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></span></button>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-foreground">Tone: Professional</span>
                                        <span className="text-xs text-[var(--on-surface-variant)]">Switch to Casual or Academic.</span>
                                    </div>
                                    <button className="w-10 h-6 bg-surface border border-border rounded-full relative"><span className="absolute left-1 top-1 w-4 h-4 bg-[var(--on-surface-variant)] rounded-full transition-all"></span></button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="flex items-center gap-3 text-sm font-semibold text-[var(--on-surface-variant)] hover:text-foreground p-2 rounded-lg hover:bg-surface transition-colors w-full text-left">
                                <Clock className="w-4 h-4" /> Manage History
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-red-500">Clear Search History</DialogTitle>
                            </DialogHeader>
                            <div className="py-4 text-foreground/80 text-sm">
                                Are you sure you want to delete all AI Tutor past conversations? This action cannot be undone.
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button className="px-4 py-2 border-border text-foreground border rounded-lg hover:bg-surface font-semibold text-sm">Cancel</button>
                                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-bold text-sm">Clear All Data</button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-background relative">
                <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6 scroll-smooth">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex gap-4 max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                            <Avatar className="w-10 h-10 border border-border/50 shadow-sm mt-1 shrink-0">
                                {msg.role === 'assistant' ? (
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        <Bot className="w-5 h-5" />
                                    </AvatarFallback>
                                ) : (
                                    <AvatarFallback className="bg-surface text-foreground font-bold">
                                        U
                                    </AvatarFallback>
                                )}
                            </Avatar>

                            <div className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.role === 'assistant'
                                ? 'bg-card text-foreground rounded-tl-sm border border-border/50 shadow-sm flex flex-col gap-2'
                                : 'bg-primary text-primary-foreground rounded-tr-sm'
                                }`}>
                                {msg.role === 'assistant' && msg.isNew ? (
                                    <Typewriter text={msg.text} onComplete={() => setIsGenerating(false)} />
                                ) : (
                                    msg.text
                                )}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-4 max-w-[85%] self-start mt-2 animate-in fade-in duration-300">
                            <Avatar className="w-10 h-10 border border-border/50 shadow-sm shrink-0">
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    <Bot className="w-5 h-5" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="px-5 py-4 rounded-2xl rounded-tl-sm bg-card flex items-center gap-1.5 border border-border/50 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-primary opacity-60 animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 rounded-full bg-primary opacity-60 animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 rounded-full bg-primary opacity-60 animate-bounce"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-4" />
                </div>

                <div className="p-4 md:px-8 md:pb-8 md:pt-4 bg-gradient-to-t from-background via-background to-transparent relative z-10 w-full">
                    <form onSubmit={handleSend} className="relative flex items-center w-full max-w-4xl mx-auto shadow-sm rounded-2xl">
                        <input
                            type="text"
                            placeholder="Message AI Tutor..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isTyping || isGenerating}
                            className="bg-card w-full pl-6 pr-16 py-4 rounded-2xl border-2 border-border/50 focus:border-primary/50 focus:outline-none transition-colors text-base text-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-none"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping || isGenerating}
                            className="absolute right-3 p-2.5 rounded-xl bg-primary text-primary-foreground shadow-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:hover:opacity-40 active:scale-90"
                        >
                            <Send className="w-4 h-4 ml-0.5" />
                        </button>
                    </form>
                    <p className="text-center text-[11px] text-[var(--on-surface-variant)] mt-3 font-medium">AI Tutor can make mistakes. Consider checking important information.</p>
                </div>
            </div>
        </div>
    );
}
