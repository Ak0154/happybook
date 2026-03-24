"use client";

import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Plus, MessageSquare, MoreHorizontal, Settings, Clock, LayoutDashboard, Flame, Calendar, BookOpen, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/animate-ui/components/radix/progress";

// ChatGPT style typewriter specifically styled for handling mixed Code blocks seamlessly.
const Typewriter = ({ text, onComplete }: { text: string, onComplete: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text.charAt(index));
        setIndex(prev => prev + 1);
      }, 5 + Math.random() * 15);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [index, text, onComplete]);

  // Parse whether text contains a code block (for simple mock rendering)
  const isCode = text.includes("```");

  if (isCode) {
    // Split and style mock code blocks vs pure text
    const parts = text.split("```");
    const rendered = parts.map((part, i) => {
      // Even index is normal text, Odd is code
      if (i % 2 === 0) {
        return <span key={i} className="whitespace-pre-wrap">{displayedText.substring(text.indexOf(part), text.indexOf(part) + part.length)}</span>;
      } else {
        // Determine how much of THIS code block has been typed so far
        const startIdx = text.indexOf(part) - 3; // roughly
        const lengthTyped = Math.max(0, index - startIdx);
        const typedPart = part.substring(0, lengthTyped);

        if (typedPart.length === 0) return null;

        // Extract language (e.g. "tsx\n")
        const langMatch = typedPart.match(/^([a-z]+)\n/);
        const lang = langMatch ? langMatch[1] : "";
        const codeContent = langMatch ? typedPart.substring(lang.length + 1) : typedPart;

        return (
          <div key={i} className="my-4 rounded-xl overflow-hidden border border-border bg-[#0d0d0d] shadow-lg">
            <div className="flex justify-between items-center px-4 py-2 bg-zinc-900 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
              </div>
              <span className="text-xs font-mono text-zinc-400">{lang}</span>
              <span className="text-xs font-bold text-zinc-400 cursor-pointer hover:text-white transition-colors">Copy</span>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="text-[13px] font-mono leading-relaxed text-zinc-300">
                <code>{codeContent}</code>
                {index < text.length && i === parts.length - 1 && <span className="inline-block w-2 h-4 ml-1 align-middle bg-primary animate-pulse" />}
              </pre>
            </div>
          </div>
        );
      }
    });

    return <span>{rendered}</span>;
  }

  return (
    <span className="whitespace-pre-wrap">
      {displayedText}
      {index < text.length && <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-primary animate-pulse" />}
    </span>
  );
};


export default function DashboardPage() {
  const defaultMessage = { role: 'assistant', text: "Hello! I'm your AI Tutor. I can help you with math, essay writing, or generating code snippets. What are you working on today?" };
  const [messages, setMessages] = useState<{ role: string, text: string, isNew?: boolean }[]>([defaultMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock History
  const [history, setHistory] = useState([
    { id: 1, title: "Calculus Derivatives", date: "Today" },
    { id: 2, title: "History Essay Draft", date: "Yesterday" },
    { id: 3, title: "React Component Help", date: "Past 7 Days" },
  ]);
  const [activeChat, setActiveChat] = useState("current");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isGenerating || isTyping) scrollToBottom();
    }, 100);
    return () => clearInterval(interval);
  }, [isGenerating, isTyping]);

  const saveMessages = (newMessages: { role: string, text: string, isNew?: boolean }[]) => {
    setMessages(newMessages);
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

    const isCodeRequest = userText.toLowerCase().includes('code') || userText.toLowerCase().includes('react') || userText.toLowerCase().includes('component');

    const codeResponse = `Sure! Here is a simple React Component using the animated UI blocks as requested:\n\n\`\`\`tsx\n'use client';\n\nimport * as React from 'react';\n\ntype MyComponentProps = {\n  myProps: string;\n} & React.ComponentProps<'div'>;\n\nfunction MyComponent(props: MyComponentProps) {\n  return (\n    <div {...props}>\n      <p>My Component</p>\n    </div>\n  );\n}\n\nexport { MyComponent };\n\`\`\`\n\nYou can copy this straight into your UI folder!`;

    const normalResponse = "That's an interesting question! Let's break it down step by step so you can fully understand the underlying pattern here.";

    setTimeout(() => {
      const reply = isCodeRequest ? codeResponse : normalResponse;
      saveMessages([...updatedMessages, { role: 'assistant', text: reply, isNew: true }]);
      setIsTyping(false);
      setIsGenerating(true);
    }, 800);
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-140px)] w-full max-w-7xl mx-auto rounded-3xl border border-border/50 bg-card overflow-hidden shadow-sm">

      {/* Left Sidebar (History & Dashboard Inject) */}
      <div className="w-full md:w-72 bg-surface/50 border-r border-border/50 p-4 flex flex-col gap-4 shrink-0 transition-all">
        <button
          onClick={() => { setMessages([defaultMessage]); setActiveChat("current"); }}
          className="w-full py-3 px-4 bg-background border border-border/80 hover:bg-surface rounded-xl flex items-center justify-between text-sm font-bold shadow-sm transition-all text-foreground hover:shadow-md active:scale-[0.98]"
        >
          <span className="flex items-center gap-2"><Plus className="w-4 h-4" /> New Chat</span>
          <MessageSquare className="w-4 h-4 opacity-50" />
        </button>

        {/* Dashboard Integration Drawer */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full py-2.5 px-4 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-xl flex items-center gap-3 text-sm font-bold shadow-sm transition-all mt-1">
              <LayoutDashboard className="w-4 h-4" />
              My Dashboard Overview
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] h-[80vh] overflow-y-auto bg-background/95 backdrop-blur-md border border-border border-b-0 rounded-[2rem] p-0 shadow-2xl">
            <div className="p-8 pb-10 flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <Flame className="w-8 h-8 text-primary" /> Hello, Scholar!
                </h1>
                <span className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold shadow-sm">3 Day Streak!</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> Upcoming Assignments
                  </h3>
                  <div className="flex flex-col gap-3">
                    <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">Calculus Problem Set</h4>
                        <p className="text-xs text-red-500 font-medium">Due Today, 11:59PM</p>
                      </div>
                    </div>
                    <div className="p-3 bg-surface border border-border rounded-xl flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-border"></span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">Biology Lab Report</h4>
                        <p className="text-xs text-[var(--on-surface-variant)]">Due Tomorrow, 5:00PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" /> Weekly Focus
                  </h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-bold uppercase opacity-70">
                        <span>Mathematics</span> <span>75%</span>
                      </div>
                      <Progress value={75} className="h-1.5" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-bold uppercase opacity-70">
                        <span>Literature</span> <span>90%</span>
                      </div>
                      <Progress value={90} className="h-1.5" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-bold uppercase opacity-70">
                        <span>Physics</span> <span>45%</span>
                      </div>
                      <Progress value={45} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex-1 overflow-y-auto pr-1 -mr-1 flex flex-col gap-6 mt-2">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--on-surface-variant)] px-2 mb-1">Recent Chats</span>
            {history.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveChat(item.id.toString())}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 group ${activeChat === item.id.toString() ? 'bg-primary/10 text-primary font-bold' : 'text-foreground hover:bg-surface font-medium'}`}
              >
                <MessageSquare className={`w-4 h-4 shrink-0 ${activeChat === item.id.toString() ? 'text-primary' : 'opacity-40'}`} />
                <span className="truncate flex-1">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border/50 mt-auto flex flex-col gap-2">
          <button className="flex items-center gap-3 text-sm font-semibold text-[var(--on-surface-variant)] hover:text-foreground p-2 rounded-lg hover:bg-surface transition-colors w-full text-left">
            <Settings className="w-4 h-4" /> Tutor Settings
          </button>
        </div>
      </div>

      {/* Main Chat Engine */}
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
                  <AvatarFallback className="bg-surface text-foreground font-bold">U</AvatarFallback>
                )}
              </Avatar>

              <div className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.role === 'assistant'
                ? 'bg-card text-foreground rounded-tl-sm border border-border/50 shadow-sm flex flex-col gap-2 relative group w-full'
                : 'bg-primary text-primary-foreground rounded-tr-sm'
                }`}>
                {msg.role === 'assistant' && msg.isNew ? (
                  <Typewriter text={msg.text} onComplete={() => setIsGenerating(false)} />
                ) : msg.role === 'assistant' ? (
                  <Typewriter text={msg.text} onComplete={() => { }} />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 max-w-[85%] self-start mt-2 animate-in fade-in duration-300">
              <Avatar className="w-10 h-10 border border-border/50 shadow-sm shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="w-5 h-5" /></AvatarFallback>
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
              placeholder="Ask me anything, or try requesting some code..."
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
          <p className="text-center text-[11px] text-[var(--on-surface-variant)] mt-3 font-medium">Responses generated by the AI model may contain inaccuracies.</p>
        </div>
      </div>
    </div>
  );
}
