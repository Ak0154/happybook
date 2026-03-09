"use client";

import { Progress } from "@/components/animate-ui/components/radix/progress";
import { Plus, MoreVertical, BookOpen } from "lucide-react";

const subjects = [
    { id: 1, name: "Mathematics", progress: 75, nextLesson: "Integration Rules", icon: "📐" },
    { id: 2, name: "Physics", progress: 45, nextLesson: "Quantum Mechanics", icon: "⚛️" },
    { id: 3, name: "Chemistry", progress: 60, nextLesson: "Organic Compounds", icon: "🧪" },
    { id: 4, name: "History", progress: 30, nextLesson: "World War II", icon: "📜" },
    { id: 5, name: "Literature", progress: 90, nextLesson: "Shakespeare's Sonnets", icon: "📖" },
];

export default function SubjectsPage() {
    return (
        <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">My Subjects</h1>
                  <p className="text-zinc-500 text-sm mt-1">Manage your active coursework and track your progress.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium shadow-sm hover:opacity-90 transition-opacity">
                    <Plus className="w-4 h-4" />
                    Enrol New
                </button>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {subjects.map((sub) => (
                    <article key={sub.id} className="group flex flex-col gap-6 bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 dark:bg-zinc-900/50 dark:backdrop-blur-xl">
                        <div className="flex justify-between items-start">
                            <div className="w-14 h-14 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-2xl shadow-inner">
                                {sub.icon}
                            </div>
                            <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-2 -mr-2 -mt-2">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{sub.name}</h3>
                            <p className="text-sm text-zinc-500 font-medium flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" />
                                Next: {sub.nextLesson}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 mt-auto">
                            <div className="flex justify-between items-center text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                <span>Progress</span>
                                <span>{sub.progress}%</span>
                            </div>
                            <Progress value={sub.progress} className="h-2" />
                        </div>

                        <button className="w-full mt-2 py-2.5 rounded-xl border border-border bg-transparent text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                            Continue Learning
                        </button>
                    </article>
                ))}
            </div>
        </div>
    );
}
