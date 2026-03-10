"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Search } from 'lucide-react';

export default function CalendarPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());
    const [searchTerm, setSearchTerm] = useState('');

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const prevMonth = () => {
        setCurrentMonth(new Date(year, month - 1, 1));
        setSelectedDate(1);
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(year, month + 1, 1));
        setSelectedDate(1);
    };

    const assignments = [
        { id: 1, title: "Calculus Problem Set", date: 15, type: "exam", color: "bg-red-500" },
        { id: 2, title: "Biology Lab Report", date: 15, type: "assignment", color: "bg-orange-500" },
        { id: 3, title: "History Essay", date: 18, type: "assignment", color: "bg-teal-500" },
        { id: 4, title: "Physics Quiz", date: 22, type: "exam", color: "bg-red-500" },
    ];

    const filteredAssignments = assignments.filter(a => 
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const upcomingEvents = filteredAssignments.filter(a => a.date >= selectedDate);
    const selectedDateEvents = filteredAssignments.filter(a => a.date === selectedDate);
    const futureEvents = upcomingEvents.filter(a => a.date !== selectedDate);

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full w-full max-w-7xl mx-auto">
            {/* Main Calendar Section */}
            <section className="flex-1 bg-card border border-border/50 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <CalendarIcon className="w-6 h-6 text-primary" />
                        {monthName}
                    </h2>
                    <div className="flex gap-2">
                        <button onClick={prevMonth} className="p-2 rounded-xl bg-surface hover:brightness-95 transition-colors border border-border/50 text-foreground">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={nextMonth} className="p-2 rounded-xl bg-surface hover:brightness-95 transition-colors border border-border/50 text-foreground">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                        <div key={d} className="text-center text-sm font-semibold opacity-60 pb-4 uppercase tracking-wider">
                            {d}
                        </div>
                    ))}
                    
                    {blanks.map(b => (
                        <div key={`blank-${b}`} className="aspect-square"></div>
                    ))}

                    {days.map(d => {
                         const hasEvents = filteredAssignments.some(a => a.date === d);
                         const isSelected = selectedDate === d;
                         const isToday = d === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
                         
                         return (
                             <button
                                 key={d}
                                 onClick={() => setSelectedDate(d)}
                                 className={`group relative aspect-square flex flex-col items-center justify-center rounded-2xl text-lg font-medium transition-all ${
                                     isSelected 
                                         ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105 z-10' 
                                         : 'bg-surface hover:brightness-95 text-foreground border border-border/50'
                                 } ${isToday && !isSelected ? 'ring-2 ring-primary/50 text-primary' : ''}`}
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
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50 text-foreground" />
                    <input 
                        type="text" 
                        placeholder="Search events or types..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-card border border-border/50 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground shadow-sm placeholder:opacity-50 text-[15px]"
                    />
                </div>

                <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-foreground mb-2">Events for {currentMonth.toLocaleString('default', { month: 'short' })} {selectedDate}</h3>
                    
                    {selectedDateEvents.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {selectedDateEvents.map(evt => (
                                <div key={evt.id} className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-border/50 transition-colors hover:brightness-95">
                                    <div className={`w-1.5 h-12 rounded-full ${evt.color}`} />
                                    <div className="flex flex-col gap-1">
                                        <h4 className="font-bold text-foreground">{evt.title}</h4>
                                        <span className="flex items-center gap-1.5 text-xs font-semibold opacity-60 uppercase tracking-wide">
                                            <Clock className="w-3.5 h-3.5" />
                                            10:00 AM • {evt.type}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center bg-surface rounded-2xl border border-dashed border-border/50 opacity-60 text-sm font-medium">
                            No events scheduled for this day.
                        </div>
                    )}
                </div>

                {futureEvents.length > 0 && (
                    <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-foreground mb-2">Upcoming Events</h3>
                        <div className="flex flex-col gap-3 opacity-80">
                            {futureEvents.map(evt => (
                                <div key={evt.id} className="flex items-center gap-4 p-3 rounded-xl bg-surface border border-border/50 cursor-pointer hover:brightness-95 hover:opacity-100 transition-all" onClick={() => setSelectedDate(evt.date)}>
                                    <div className={`w-1 h-8 rounded-full ${evt.color}`} />
                                    <div className="flex flex-col">
                                        <h4 className="font-semibold text-sm text-foreground">{evt.title}</h4>
                                        <span className="text-xs opacity-60 font-medium">{currentMonth.toLocaleString('default', { month: 'short' })} {evt.date} • {evt.type}</span>
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
