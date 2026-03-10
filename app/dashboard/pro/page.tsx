"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, Zap, Loader2, ArrowRight } from "lucide-react";

export default function ProPage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleUpgrade = () => {
        setIsProcessing(true);
        // Simulate payment intent / sweet alert style popup internally
        setTimeout(() => {
            setIsProcessing(false);
            setIsSubscribed(true);

            // Update global user state mock
            localStorage.setItem('happybook-pro', 'true');
            window.dispatchEvent(new Event('user-updated'));
        }, 2000);
    };

    if (isSubscribed) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] gap-6 text-center animate-in zoom-in-95 duration-700">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                    <div className="w-24 h-24 bg-primary text-primary-foreground rounded-3xl shadow-2xl flex items-center justify-center -rotate-6 transform hover:rotate-0 transition-transform duration-500 relative z-10">
                        <Sparkles className="w-12 h-12" />
                    </div>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mt-4">
                    Welcome to <span className="text-primary">Pro</span>
                </h1>
                <p className="text-lg text-[var(--on-surface-variant)] max-w-xl mx-auto">
                    Your account has been successfully upgraded! You now have unlimited access to all AI Tutor features and priority services.
                </p>
                <button
                    onClick={() => window.location.href = '/dashboard'}
                    className="mt-4 bg-surface border border-border px-8 py-3 rounded-xl font-bold text-foreground hover:bg-card hover:-translate-y-1 transition-all flex items-center gap-2 shadow-sm"
                >
                    Return to Workspace <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto items-center mt-10 transition-all">
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
                <div className="bg-card border border-border/50 rounded-3xl p-8 flex flex-col gap-6 opacity-80 transition-opacity hover:opacity-100">
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
                    <button disabled className="mt-auto w-full py-3 px-6 rounded-xl border border-border/50 font-semibold cursor-not-allowed text-[var(--on-surface-variant)] bg-surface/50">
                        Current Plan
                    </button>
                </div>

                {/* Pro Tier */}
                <div className="bg-surface relative border-2 border-primary rounded-3xl p-8 flex flex-col gap-6 shadow-2xl shadow-primary/10 overflow-hidden transform md:-translate-y-4 hover:-translate-y-6 transition-transform duration-300">
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
                    <button
                        onClick={handleUpgrade}
                        disabled={isProcessing}
                        className="relative mt-auto w-full py-3.5 px-6 rounded-xl bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-80"
                    >
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Zap className="w-5 h-5 fill-current" /> Upgrade Now</>}
                    </button>
                </div>
            </div>
        </div>
    );
}
