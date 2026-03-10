"use client";

import { Bell, CheckCircle2, MessageSquare, AlertTriangle, Calendar as CalendarIcon, Filter } from "lucide-react";

export default function NotificationsPage() {
    const notifications = [
        {
            id: 1,
            title: "New AI Tutor Features Available",
            message: "We just rolled out advanced document summarization in the tutor chat!",
            time: "2 hours ago",
            type: "system",
            icon: <Bell className="w-5 h-5 text-primary" />,
            unread: true
        },
        {
            id: 2,
            title: "History Essay Due Soon",
            message: "Reminder: Your History Essay is due tomorrow at 11:59 PM.",
            time: "5 hours ago",
            type: "reminder",
            icon: <CalendarIcon className="w-5 h-5 text-orange-500" />,
            unread: true
        },
        {
            id: 3,
            title: "Calculus Problem Set Graded",
            message: "Your AI Tutor has finished reviewing your calculus problem set logic.",
            time: "Yesterday",
            type: "academic",
            icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
            unread: false
        },
        {
            id: 4,
            title: "Subscription Renewal Notice",
            message: "Your current free student plan will remain active throughout the semester.",
            time: "Last week",
            type: "billing",
            icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
            unread: false
        }
    ];

    return (
        <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto h-full">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Notifications</h1>
                    <p className="text-[var(--on-surface-variant)] mt-2">Stay up to date with your coursework and system alerts.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-xl text-sm font-semibold hover:brightness-110 transition-all">
                        <Filter className="w-4 h-4 opacity-70" /> Options
                    </button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 shadow-sm transition-opacity">
                        Mark all as read
                    </button>
                </div>
            </div>

            <div className="bg-card border border-border/50 rounded-3xl shadow-sm flex flex-col overflow-hidden">
                {notifications.map((note, idx) => (
                    <div
                        key={note.id}
                        className={`flex items-start gap-4 p-6 ${idx !== notifications.length - 1 ? 'border-b border-border/50' : ''} ${note.unread ? 'bg-surface/30' : 'opacity-80'}`}
                    >
                        <div className={`p-3 rounded-xl mt-1 ${note.unread ? 'bg-background shadow-sm border border-border/50' : 'bg-surface'}`}>
                            {note.icon}
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex justify-between items-center mb-1.5">
                                <h4 className="font-bold text-foreground text-[16px]">{note.title}</h4>
                                <span className="text-xs font-semibold text-[var(--on-surface-variant)] whitespace-nowrap ml-4">
                                    {note.time}
                                </span>
                            </div>
                            <p className="text-sm text-[var(--on-surface-variant)] leading-relaxed max-w-2xl">
                                {note.message}
                            </p>
                        </div>

                        {note.unread && (
                            <div className="w-2.5 h-2.5 rounded-full bg-primary mt-3 ml-2 shrink-0 shadow-sm shadow-primary/20"></div>
                        )}
                    </div>
                ))}

                {notifications.length === 0 && (
                    <div className="p-16 flex flex-col items-center justify-center text-[var(--on-surface-variant)]">
                        <MessageSquare className="w-12 h-12 opacity-20 mb-4" />
                        <p className="font-medium">You're all caught up!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
