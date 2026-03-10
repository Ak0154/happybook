"use client";

import { useState } from "react";
import { Copy, Plus, Play, MoreVertical, LayoutGrid } from "lucide-react";

export default function FlashcardsPage() {
    const [sets] = useState([
        { id: 1, title: "Calculus Limits & Derivatives", cards: 45, master: 30 },
        { id: 2, title: "French Vocabulary Ch. 4", cards: 120, master: 85 },
        { id: 3, title: "Biology: Nervous System", cards: 24, master: 0 },
    ]);

    return (
        <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto h-full px-4 md:px-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Flashcards</h1>
                    <p className="text-[var(--on-surface-variant)] mt-2">Review your saved study sets and master new concepts.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-sm">
                        <Plus className="w-4 h-4" /> Create Deck
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sets.map(deck => (
                    <div key={deck.id} className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <LayoutGrid className="w-5 h-5 text-primary" />
                            </div>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-surface rounded-lg">
                                <MoreVertical className="w-4 h-4 text-foreground/50" />
                            </button>
                        </div>

                        <h3 className="font-bold text-foreground text-xl leading-tight mb-4 flex-1">{deck.title}</h3>

                        <div className="flex gap-4 mb-6">
                            <div className="flex flex-col">
                                <span className="text-xs text-[var(--on-surface-variant)] font-bold uppercase tracking-wider mb-1">Total Cards</span>
                                <span className="text-foreground font-semibold">{deck.cards}</span>
                            </div>
                            <div className="w-px bg-border/50"></div>
                            <div className="flex flex-col">
                                <span className="text-xs text-[var(--on-surface-variant)] font-bold uppercase tracking-wider mb-1">Mastered</span>
                                <span className="text-green-500 font-semibold">{deck.master}</span>
                            </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 py-3 bg-surface hover:brightness-110 rounded-xl text-sm font-bold text-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                            <Play className="w-4 h-4 fill-current" /> Study Deck
                        </button>
                    </div>
                ))}

                {/* Blank State Add Deck */}
                <button className="bg-transparent border-2 border-dashed border-border/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-surface/30 hover:border-border transition-all min-h-[250px] opacity-70 hover:opacity-100 group">
                    <div className="p-4 bg-surface rounded-full group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6 text-foreground" />
                    </div>
                    <span className="font-medium text-foreground">Import or Create Deck</span>
                </button>
            </div>
        </div>
    );
}
