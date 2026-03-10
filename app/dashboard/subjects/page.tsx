"use client";

import { useState, useEffect } from 'react';
import { Progress } from "@/components/animate-ui/components/radix/progress";
import { Plus, MoreVertical, BookOpen, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const initialSubjects = [
    { id: 1, name: "Mathematics", progress: 75, nextLesson: "Integration Rules", icon: "📐" },
    { id: 2, name: "Physics", progress: 45, nextLesson: "Quantum Mechanics", icon: "⚛️" },
    { id: 3, name: "Chemistry", progress: 60, nextLesson: "Organic Compounds", icon: "🧪" },
    { id: 4, name: "History", progress: 30, nextLesson: "World War II", icon: "📜" },
    { id: 5, name: "Literature", progress: 90, nextLesson: "Shakespeare's Sonnets", icon: "📖" },
];

export default function SubjectsPage() {
    const [subjects, setSubjects] = useState(initialSubjects);
    const [isOpen, setIsOpen] = useState(false);
    const [newSubName, setNewSubName] = useState("");
    const [newSubIcon, setNewSubIcon] = useState("📚");

    useEffect(() => {
        const stored = localStorage.getItem("happybook_subjects");
        if (stored) {
            setSubjects(JSON.parse(stored));
        } else {
            localStorage.setItem("happybook_subjects", JSON.stringify(initialSubjects));
        }
    }, []);

    const handleAddSubject = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSubName.trim()) return;

        const newSubject = {
            id: Date.now(),
            name: newSubName,
            progress: 0,
            nextLesson: "Getting Started",
            icon: newSubIcon || "📚"
        };

        const updated = [...subjects, newSubject];
        setSubjects(updated);
        localStorage.setItem("happybook_subjects", JSON.stringify(updated));
        
        setNewSubName("");
        setNewSubIcon("📚");
        setIsOpen(false);
    };

    const handleDeleteSubject = (id: number) => {
        const updated = subjects.filter(sub => sub.id !== id);
        setSubjects(updated);
        localStorage.setItem("happybook_subjects", JSON.stringify(updated));
    }

    return (
        <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">My Subjects</h1>
                  <p className="text-zinc-500 text-sm mt-1">Manage your active coursework and track your progress.</p>
                </div>
                
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium shadow-sm hover:opacity-90 transition-opacity">
                            <Plus className="w-4 h-4" />
                            Enrol New
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Enroll in a new subject</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddSubject} className="flex flex-col gap-4 mt-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Subject Name</label>
                                <input 
                                    type="text" 
                                    value={newSubName}
                                    onChange={(e) => setNewSubName(e.target.value)}
                                    placeholder="e.g. Computer Science"
                                    className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Emoji Icon (Optional)</label>
                                <input 
                                    type="text" 
                                    value={newSubIcon}
                                    onChange={(e) => setNewSubIcon(e.target.value)}
                                    placeholder="e.g. 💻"
                                    className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                            <button type="submit" className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium shadow-sm hover:opacity-90 transition-opacity mt-2">
                                Create Subject
                            </button>
                        </form>
                    </DialogContent>
                </Dialog>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {subjects.map((sub) => (
                    <article key={sub.id} className="group relative flex flex-col gap-6 bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 dark:bg-zinc-900/50 dark:backdrop-blur-xl">
                        <div className="flex justify-between items-start">
                            <div className="w-14 h-14 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-2xl shadow-inner">
                                {sub.icon}
                            </div>
                            <button 
                                onClick={() => handleDeleteSubject(sub.id)}
                                className="text-zinc-400 hover:text-red-500 transition-colors p-2 -mr-2 -mt-2 opacity-0 group-hover:opacity-100"
                                aria-label="Delete subject"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{sub.name}</h3>
                            <p className="text-sm text-zinc-500 font-medium flex items-center gap-1.5 break-all line-clamp-1">
                                <BookOpen className="w-3.5 h-3.5 shrink-0" />
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
            {subjects.length === 0 && (
                <div className="flex flex-col items-center justify-center p-12 mt-12 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-3xl text-zinc-500">
                    <BookOpen className="w-12 h-12 mb-4 opacity-50" />
                    <h2 className="text-xl font-medium mb-1">No subjects yet</h2>
                    <p className="text-sm">Enroll in a new subject to start tracking your progress.</p>
                </div>
            )}
        </div>
    );
}
