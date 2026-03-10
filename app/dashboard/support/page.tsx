"use client";

import { useState } from "react";
import { Mail, MessageCircle, Phone, LifeBuoy, Send, Loader2, CheckCircle2 } from "lucide-react";

export default function SupportPage() {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    return (
        <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto min-h-full">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                    <LifeBuoy className="w-8 h-8 text-primary" />
                    Help & Support
                </h1>
                <p className="text-[var(--on-surface-variant)] text-lg">We're here to help you succeed. Get in touch with our team.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">

                {/* Contact Options */}
                <div className="flex flex-col gap-4 md:col-span-1">
                    <div className="bg-card border border-border/50 p-6 rounded-3xl shadow-sm flex items-start gap-4 transition-all hover:bg-surface/50 cursor-pointer">
                        <div className="p-3 bg-primary/10 rounded-2xl flex-shrink-0">
                            <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-foreground">Email Support</span>
                            <span className="text-sm text-[var(--on-surface-variant)] leading-snug mt-1">support@happybook.com</span>
                        </div>
                    </div>

                    <div className="bg-card border border-border/50 p-6 rounded-3xl shadow-sm flex items-start gap-4 transition-all hover:bg-surface/50 cursor-pointer">
                        <div className="p-3 bg-blue-500/10 rounded-2xl flex-shrink-0">
                            <MessageCircle className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-foreground">Live Chat</span>
                            <span className="text-sm text-[var(--on-surface-variant)] leading-snug mt-1">Available 9am - 5pm EST<br />(Premium Members Only)</span>
                        </div>
                    </div>

                    <div className="bg-card border border-border/50 p-6 rounded-3xl shadow-sm flex items-start gap-4 transition-all hover:bg-surface/50 cursor-pointer">
                        <div className="p-3 bg-green-500/10 rounded-2xl flex-shrink-0">
                            <Phone className="w-6 h-6 text-green-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-foreground">Phone Support</span>
                            <span className="text-sm text-[var(--on-surface-variant)] leading-snug mt-1">1-800-HAPPY-BK</span>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="md:col-span-2">
                    <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm relative overflow-hidden h-full">
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-in fade-in duration-500 relative z-10 h-full">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-xl font-bold text-foreground">Send a request</h3>
                                    <p className="text-sm text-[var(--on-surface-variant)]">Need to change your email or having technical issues? Drop us a line.</p>
                                </div>

                                <div className="flex flex-col gap-2 mt-2">
                                    <label className="text-sm font-bold text-foreground">Subject</label>
                                    <select
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none"
                                        required
                                    >
                                        <option value="" disabled>Select a topic...</option>
                                        <option value="email_change">Request Email Change</option>
                                        <option value="billing">Billing Inquiry</option>
                                        <option value="bug">Report a Bug</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2 flex-grow">
                                    <label className="text-sm font-bold text-foreground">Message</label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Please describe your issue in detail..."
                                        className="bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none flex-grow min-h-[150px]"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-primary text-primary-foreground py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 mt-4 hover:brightness-110 transition-all active:scale-95 disabled:opacity-70 shadow-lg shadow-primary/20"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <><Send className="w-5 h-5" /> Send Request</>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full gap-4 text-center animate-in zoom-in-95 duration-500">
                                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center shadow-inner mb-2">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground">Request Sent!</h3>
                                <p className="text-[var(--on-surface-variant)] text-sm max-w-sm">
                                    Our support team will review your ticket and get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-6 font-bold text-primary hover:underline"
                                >
                                    Submit another request
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
