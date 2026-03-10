"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, BookOpen, Bot, Plus, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { Progress } from "@/components/animate-ui/components/radix/progress";

export default function DashboardPage() {
  const [userName, setUserName] = useState('Scholar');

  useEffect(() => {
    const email = localStorage.getItem('user_email');
    if (email) {
      setUserName(email.split('@')[0]);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden bg-card rounded-3xl p-8 sm:p-10 shadow-lg text-foreground border border-border/50">
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Hello, {userName}! 👋</h1>
            <p className="opacity-80">Ready to conquer your coursework today?</p>
          </div>
          
          <div className="flex items-center gap-4 bg-surface border border-border/50 px-6 py-4 rounded-2xl shadow-sm">
            <Flame className="w-8 h-8 text-primary opacity-80" />
            <div className="flex flex-col">
              <strong className="text-primary text-lg font-bold leadng-none">3 Day Streak</strong>
              <span className="text-primary opacity-80 text-sm font-medium">Keep it up!</span>
            </div>
          </div>
        </div>
        
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary opacity-20 blur-3xl mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-20 -mb-20 w-48 h-48 rounded-full bg-secondary opacity-30 blur-3xl mix-blend-screen pointer-events-none"></div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Assignments Grid Item */}
        <section className="lg:col-span-2 flex flex-col bg-card border border-border/50 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Upcoming Assignments</h2>
            </div>
            <Link href="/dashboard/calendar" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                See Calendar <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/20 transition-all hover:bg-red-500/10">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 shrink-0">
                📐
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="font-semibold text-foreground">Calculus Problem Set</h3>
                <span className="text-sm text-red-500 font-medium">Due Today, 11:59 PM</span>
              </div>
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 shadow-sm shadow-red-500/20">Urgent</span>
            </div>

            <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-surface border border-border/50 transition-all hover:brightness-95">
              <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center border border-border/50 shrink-0">
                🧬
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="font-semibold text-foreground">Biology Lab Report</h3>
                <span className="text-sm opacity-60 font-medium">Due Tomorrow, 5:00 PM</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Grid Item */}
        <section className="flex flex-col bg-card border border-border/50 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="flex flex-col gap-3 h-full justify-center">
            <button className="flex items-center gap-4 p-4 bg-surface border border-border/50 rounded-2xl hover:brightness-95 transition-all group">
              <div className="bg-secondary w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-opacity-80 transition-colors">
                  <Plus className="w-5 h-5 text-secondary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Add Task</span>
            </button>
            <Link href="/dashboard/tutor" className="flex items-center gap-4 p-4 bg-primary text-primary-foreground rounded-2xl shadow-sm hover:opacity-90 hover:-translate-y-0.5 transition-all group border border-primary/20">
              <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-lg">AI Tutor</span>
            </Link>
          </div>
        </section>
      </div>

      {/* Weekly Focus */}
      <section className="bg-card border border-border/50 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Weekly Focus</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2 p-5 rounded-2xl bg-surface border border-border/50">
                <div className="flex justify-between items-center text-sm font-semibold opacity-60 uppercase">
                    <span>Mathematics</span>
                    <span className="text-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2.5" />
            </div>
            <div className="flex flex-col gap-2 p-5 rounded-2xl bg-surface border border-border/50">
                <div className="flex justify-between items-center text-sm font-semibold opacity-60 uppercase">
                    <span>Literature</span>
                    <span className="text-foreground">90%</span>
                </div>
                <Progress value={90} className="h-2.5" />
            </div>
            <div className="flex flex-col gap-2 p-5 rounded-2xl bg-surface border border-border/50">
                <div className="flex justify-between items-center text-sm font-semibold opacity-60 uppercase">
                    <span>Chemistry</span>
                    <span className="text-foreground">60%</span>
                </div>
                <Progress value={60} className="h-2.5" />
            </div>
            <div className="flex flex-col gap-2 p-5 rounded-2xl bg-surface border border-border/50">
                <div className="flex justify-between items-center text-sm font-semibold opacity-60 uppercase">
                    <span>Physics</span>
                    <span className="text-foreground">45%</span>
                </div>
                <Progress value={45} className="h-2.5" />
            </div>
        </div>
      </section>
    </div>
  );
}
