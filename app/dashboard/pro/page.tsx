"use client";

import { Sparkles, CheckCircle2, Zap } from "lucide-react";

export default function ProPage() {
    return (
        <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto items-center mt-10">
            <div className="flex flex-col items-center text-center gap-4 max-w-2xl">
                <div className="p-4 rounded-full bg-primary/10 mb-4 ring-8 ring-primary/5">
                    <Sparkles className="w-12 h-12 text-primary" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                    Upgrade to <span className="text-primary">Happy Book Pro</span>
                </h1>
                <p className="text-lg text-[var(--on-surface-variant)] mt-2">
                    Unlock unlimited AI Tutor access, enhanced study tools, and premium features designed to supercharge your academic journey.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-6">
                {/* Free Tier */}
                <div className="bg-card border border-border/50 rounded-3xl p-8 flex flex-col gap-6 opacity-80">
                    <div>
                        <h3 className="text-2xl font-bold text-foreground">Student Plan</h3>
                        <p className="text-[var(--on-surface-variant)] mt-2">Everything you need to get started.</p>
                    </div>
                    <div className="text-4xl font-extrabold text-foreground">
                        $0<span className="text-lg text-foreground/50 font-medium">/month</span>
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        {["Basic Calendar Tracking", "Standard Flashcards", "10 AI Tutor messages per day"].map(feature => (
                            <div key={feature} className="flex items-center gap-3 text-sm font-medium text-[var(--on-surface)]">
                                <CheckCircle2 className="w-5 h-5 text-green-500 opacity-50" />
                                {feature}
                            </div>
                        ))}
                    </div>
                    <button className="mt-auto w-full py-3 px-6 rounded-xl border border-border/50 font-semibold hover:bg-surface transition-colors cursor-not-allowed text-foreground">
                        Current Plan
                    </button>
                </div>

                {/* Pro Tier */}
                <div className="bg-surface relative border-2 border-primary rounded-3xl p-8 flex flex-col gap-6 shadow-2xl shadow-primary/10 overflow-hidden transform md:-translate-y-4">
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                        Popular
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                            Pro Plan <Sparkles className="w-5 h-5" />
                        </h3>
                        <p className="text-[var(--on-surface-variant)] mt-2">For serious students who want an edge.</p>
                    </div>
                    <div className="text-4xl font-extrabold text-foreground">
                        $9.99<span className="text-lg text-foreground/50 font-medium">/month</span>
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        {[
                            "Unlimited AI Tutor access",
                            "Advanced essay grading & feedback",
                            "Automated document summarization",
                            "Priority support"
                        ].map(feature => (
                            <div key={feature} className="flex items-center gap-3 text-sm font-medium text-[var(--on-surface)]">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                {feature}
                            </div>
                        ))}
                    </div>
                    <button className="mt-auto w-full py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                        <Zap className="w-4 h-4" /> Upgrade Now
                    </button>
                </div>
            </div>
        </div>
    );
}
