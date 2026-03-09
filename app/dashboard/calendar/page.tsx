"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());

    // Generating a simple current month view for mock purposes
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    const assignments = [
        { id: 1, title: "Calculus Problem Set", date: 15, type: "exam", color: "bg-red-500" },
        { id: 2, title: "Biology Lab Report", date: 15, type: "assignment", color: "bg-orange-500" },
        { id: 3, title: "History Essay", date: 18, type: "assignment", color: "bg-teal-500" },
        { id: 4, title: "Physics Quiz", date: 22, type: "exam", color: "bg-red-500" },
    ];

    const upcomingEvents = assignments.filter(a => a.date >= selectedDate);
    const selectedDateEvents = assignments.filter(a => a.date === selectedDate);
    const futureEvents = upcomingEvents.filter(a => a.date !== selectedDate);

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full w-full max-w-7xl mx-auto">
            {/* Main Calendar Section */}
            <section className="flex-1 bg-card border border-border/50 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <CalendarIcon className="w-6 h-6 text-primary" />
                        November 2024
                    </h2>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-border/50 text-zinc-600 dark:text-zinc-400">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-border/50 text-zinc-600 dark:text-zinc-400">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                        <div key={d} className="text-center text-sm font-semibold text-zinc-500 pb-4 uppercase tracking-wider">
                            {d}
                        </div>
                    ))}
                    
                    {/* Blank start days for alignment simulation */}
                    <div className="aspect-square"></div>
                    <div className="aspect-square"></div>

                    {days.map(d => {
                        const hasEvents = assignments.some(a => a.date === d);
                        const isSelected = selectedDate === d;
                        
                        return (
                            <button
                                key={d}
                                onClick={() => setSelectedDate(d)}
                                className={`group relative aspect-square flex flex-col items-center justify-center rounded-2xl text-lg font-medium transition-all ${
                                    isSelected 
                                        ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105 z-10' 
                                        : 'bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-border/50'
                                }`}
                            >
                                <span>{d}</span>
                                {hasEvents && (
                                    <div className={`absolute bottom-2 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-primary-foreground' : 'bg-red-500'}`} />
                                )}
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Side Panel for Events */}
            <section className="w-full lg:w-[380px] flex flex-col gap-6">
                <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Events for Nov {selectedDate}</h3>
                    
                    {selectedDateEvents.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {selectedDateEvents.map(evt => (
                                <div key={evt.id} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-border/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                                    <div className={`w-1.5 h-12 rounded-full ${evt.color}`} />
                                    <div className="flex flex-col gap-1">
                                        <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{evt.title}</h4>
                                        <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                                            <Clock className="w-3.5 h-3.5" />
                                            10:00 AM • {evt.type}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-dashed border-border/50 text-zinc-500 text-sm font-medium">
                            No events scheduled for this day.
                        </div>
                    )}
                </div>

                {futureEvents.length > 0 && (
                    <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">Upcoming Events</h3>
                        <div className="flex flex-col gap-3 opacity-80">
                            {futureEvents.map(evt => (
                                <div key={evt.id} className="flex items-center gap-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-border/50 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:opacity-100 transition-all" onClick={() => setSelectedDate(evt.date)}>
                                    <div className={`w-1 h-8 rounded-full ${evt.color}`} />
                                    <div className="flex flex-col">
                                        <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{evt.title}</h4>
                                        <span className="text-xs text-zinc-500 font-medium">Nov {evt.date} • {evt.type}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
