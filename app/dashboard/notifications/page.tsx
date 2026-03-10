"use client";

import { useState } from "react";
import { Bell, CheckCircle2, MessageSquare, AlertTriangle, Calendar as CalendarIcon, Trash2, CheckSquare } from "lucide-react";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([
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
    ]);

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    const removeNotification = (id: number) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto h-full">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Notifications</h1>
                    <p className="text-[var(--on-surface-variant)] mt-2">Stay up to date with your coursework and system alerts.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={markAllRead}
                        className="px-4 py-2 flex items-center gap-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 shadow-sm transition-all active:scale-95"
                    >
                        <CheckSquare className="w-4 h-4" /> Mark all as read
                    </button>
                </div>
            </div>

            <div className="bg-card border border-border/50 rounded-3xl shadow-sm flex flex-col overflow-hidden relative min-h-[400px]">
                {notifications.map((note, idx) => (
                    <div
                        key={note.id}
                        className={`group flex items-start gap-4 p-6 transition-all duration-500 ease-in-out ${idx !== notifications.length - 1 ? 'border-b border-border/50' : ''} ${note.unread ? 'bg-surface/40' : 'bg-transparent hover:bg-surface/20'}`}
                    >
                        <div className={`p-3 rounded-xl mt-1 transition-colors ${note.unread ? 'bg-background shadow-sm border border-border/50 shadow-primary/5' : 'bg-surface'}`}>
                            {note.icon}
                        </div>

                        <div className="flex-1 flex flex-col justify-center pr-8">
                            <div className="flex justify-between items-center mb-1.5">
                                <h4 className={`font-bold text-[16px] transition-colors ${note.unread ? 'text-foreground' : 'text-foreground/80'}`}>{note.title}</h4>
                                <span className="text-xs font-semibold text-[var(--on-surface-variant)] whitespace-nowrap ml-4">
                                    {note.time}
                                </span>
                            </div>
                            <p className={`text-sm leading-relaxed max-w-2xl transition-colors ${note.unread ? 'text-[var(--on-surface-variant)]' : 'text-[var(--on-surface-variant)]/70'}`}>
                                {note.message}
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-4 mt-2 justify-center shrink-0 w-8">
                            {note.unread && (
                                <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm shadow-primary/30 transition-all"></div>
                            )}
                            <button
                                onClick={() => removeNotification(note.id)}
                                className="opacity-0 group-hover:opacity-100 p-2 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                title="Delete Notification"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {notifications.length === 0 && (
                    <div className="absolute inset-0 p-16 flex flex-col items-center justify-center text-[var(--on-surface-variant)] animate-in fade-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6 shadow-inner">
                            <MessageSquare className="w-10 h-10 opacity-30" />
                        </div>
                        <p className="font-bold text-lg text-foreground mb-1">You're all caught up!</p>
                        <p className="font-medium text-sm opacity-70">No new notifications to display right now.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
