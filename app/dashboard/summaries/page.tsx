"use client";

import { useState } from "react";
import { BookOpen, Search, Copy, Download, Share2, MoreVertical, Plus } from "lucide-react";

export default function SummariesPage() {
    const [summaries] = useState([
        { id: 1, title: "Causes of WW2", subject: "History", length: "1.2k words", updated: "2 days ago" },
        { id: 2, title: "Cellular Respiration", subject: "Biology", length: "800 words", updated: "Last week" },
        { id: 3, title: "Hamlet: Act 1 Overview", subject: "Literature", length: "1.5k words", updated: "Last week" },
        { id: 4, title: "Newton's Laws of Motion", subject: "Physics", length: "950 words", updated: "2 weeks ago" }
    ]);

    return (
        <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto h-full px-4 md:px-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Summaries</h1>
                    <p className="text-[var(--on-surface-variant)] mt-2">Access all your AI-generated document summaries.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50 text-foreground" />
                        <input type="text" placeholder="Search summaries..." className="bg-surface border border-border rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 text-foreground" />
                    </div>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2">
                        <Plus className="w-4 h-4" /> New Summary
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {summaries.map(doc => (
                    <div key={doc.id} className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-surface rounded-xl">
                                <BookOpen className="w-5 h-5 text-primary" />
                            </div>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-surface rounded-lg">
                                <MoreVertical className="w-4 h-4 text-foreground/50" />
                            </button>
                        </div>
                        <h3 className="font-bold text-foreground text-lg leading-tight mb-1 line-clamp-2">{doc.title}</h3>
                        <p className="text-sm font-semibold text-primary/80 mb-4">{doc.subject}</p>

                        <div className="flex items-center justify-between text-xs text-[var(--on-surface-variant)] font-medium mt-auto pt-4 border-t border-border/50">
                            <span>{doc.length}</span>
                            <span>{doc.updated}</span>
                        </div>

                        <div className="flex gap-2 mt-4 pt-4 border-t border-border/10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-surface hover:brightness-110 rounded-lg text-xs font-semibold text-foreground transition-all">
                                <Copy className="w-3.5 h-3.5" /> Copy
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-surface hover:brightness-110 rounded-lg text-xs font-semibold text-foreground transition-all">
                                <Download className="w-3.5 h-3.5" /> Export
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
