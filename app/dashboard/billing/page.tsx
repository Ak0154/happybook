"use client";

import { useState } from "react";
import { CreditCard, Download, Receipt, Plus, Loader2, CheckCircle2 } from "lucide-react";

export default function BillingPage() {
    const [invoices] = useState([
        { id: "INV-2026-03-01", date: "Mar 1, 2026", amount: "$9.99", status: "Paid" },
        { id: "INV-2026-02-01", date: "Feb 1, 2026", amount: "$9.99", status: "Paid" },
        { id: "INV-2026-01-01", date: "Jan 1, 2026", amount: "$0.00", status: "Paid" },
    ]);

    const [showAddCard, setShowAddCard] = useState(false);
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [hasCard, setHasCard] = useState(false);

    const [downloadingInv, setDownloadingInv] = useState<string | null>(null);

    const handleAddCard = (e: React.FormEvent) => {
        e.preventDefault();
        setIsAddingCard(true);
        setTimeout(() => {
            setIsAddingCard(false);
            setHasCard(true);
            setShowAddCard(false);
        }, 1500);
    };

    const handleDownload = (invId: string) => {
        setDownloadingInv(invId);

        // Simulate generation and download
        setTimeout(() => {
            const element = document.createElement("a");
            const file = new Blob([`Happy Book Invoice\n\nID: ${invId}\nStatus: PAID`], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = `${invId}.txt`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            setDownloadingInv(null);
        }, 1000);
    };

    return (
        <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto transition-all">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Billing Overview</h1>
                    <p className="text-[var(--on-surface-variant)] mt-2">Manage your subscription, payment methods, and invoices.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Plan */}
                <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10"></div>
                    <div>
                        <h3 className="text-lg font-bold text-foreground mb-1">Current Plan</h3>
                        <p className="text-sm text-[var(--on-surface-variant)]">You are currently on the free tier.</p>
                    </div>

                    <div className="py-6 border-y border-border/50">
                        <div className="text-3xl font-bold text-foreground flex items-center gap-2">Student Plan</div>
                        <div className="text-sm font-medium text-green-500 mt-2 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Active</div>
                    </div>

                    <button
                        onClick={() => window.location.href = '/dashboard/pro'}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-2.5 rounded-xl font-semibold shadow-sm transition-all shadow-primary/20 transform hover:-translate-y-0.5"
                    >
                        Upgrade to Pro
                    </button>
                </div>

                {/* Payment Methods */}
                <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm transition-all duration-300">
                    <div>
                        <h3 className="text-lg font-bold text-foreground mb-1">Payment Methods</h3>
                        <p className="text-sm text-[var(--on-surface-variant)]">Add a card to streamline upgrades.</p>
                    </div>

                    {!showAddCard && !hasCard && (
                        <>
                            <div className="flex-1 flex flex-col items-center justify-center py-6 border-y border-border/50 border-dashed text-[var(--on-surface-variant)] animate-in fade-in zoom-in duration-300">
                                <CreditCard className="w-10 h-10 mb-3 opacity-20" />
                                <span className="text-sm">No payment method added.</span>
                            </div>
                            <button onClick={() => setShowAddCard(true)} className="bg-surface text-foreground border border-border w-full py-2.5 rounded-xl font-semibold hover:bg-card hover:border-foreground/20 transition-all flex items-center justify-center gap-2">
                                <Plus className="w-4 h-4" /> Add Payment Method
                            </button>
                        </>
                    )}

                    {showAddCard && (
                        <form onSubmit={handleAddCard} className="flex-1 flex flex-col gap-4 animate-in slide-in-from-bottom-4 fade-in duration-300">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-[var(--on-surface-variant)]">Card Number</label>
                                <input type="text" placeholder="0000 0000 0000 0000" className="bg-surface border border-border px-3 py-2 rounded-lg text-sm outline-none focus:border-primary/50 font-mono tracking-widest" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-[var(--on-surface-variant)]">Expiry</label>
                                    <input type="text" placeholder="MM/YY" className="bg-surface border border-border px-3 py-2 rounded-lg text-sm outline-none focus:border-primary/50" required />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-[var(--on-surface-variant)]">CVC</label>
                                    <input type="text" placeholder="123" className="bg-surface border border-border px-3 py-2 rounded-lg text-sm outline-none focus:border-primary/50" required />
                                </div>
                            </div>
                            <div className="flex gap-2 mt-auto">
                                <button type="button" onClick={() => setShowAddCard(false)} className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-surface w-1/3 transition-colors">Cancel</button>
                                <button type="submit" disabled={isAddingCard} className="flex-1 bg-foreground text-background py-2 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 flex items-center justify-center disabled:opacity-50 transition-all">
                                    {isAddingCard ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Card"}
                                </button>
                            </div>
                        </form>
                    )}

                    {hasCard && !showAddCard && (
                        <div className="flex-1 flex flex-col justify-between py-2 animate-in zoom-in-95 duration-500">
                            <div className="bg-gradient-to-tr from-zinc-900 to-zinc-800 p-5 rounded-2xl shadow-xl border border-zinc-700/50 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                                <div className="flex justify-between items-start mb-6">
                                    <CreditCard className="w-6 h-6 opacity-80" />
                                    <div className="text-xs font-bold tracking-widest opacity-50">VISA</div>
                                </div>
                                <div className="text-lg font-mono tracking-[0.2em] mb-2 opacity-90">**** **** **** 4242</div>
                                <div className="flex justify-between items-end text-xs opacity-70">
                                    <span>Exp: 12/28</span>
                                </div>
                            </div>
                            <button onClick={() => setHasCard(false)} className="text-xs font-medium text-red-500 hover:underline text-center w-full pt-4">Remove Card</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Invoice History */}
            <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-foreground">
                    <Receipt className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold">Billing History</h3>
                </div>

                <div className="flex flex-col">
                    {invoices.map((invoice, i) => (
                        <div key={invoice.id} className={`flex items-center justify-between py-4 ${i !== invoices.length - 1 ? 'border-b border-border/50' : ''} hover:bg-surface/30 px-2 -mx-2 rounded-xl transition-colors`}>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-foreground text-sm">{invoice.id}</span>
                                <span className="text-xs text-[var(--on-surface-variant)] font-medium">{invoice.date}</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-end gap-1">
                                    <span className="font-semibold text-foreground text-sm">{invoice.amount}</span>
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-green-500">{invoice.status}</span>
                                </div>
                                <button
                                    onClick={() => handleDownload(invoice.id)}
                                    disabled={downloadingInv === invoice.id}
                                    className="p-2.5 bg-surface hover:bg-border/50 rounded-lg text-foreground transition-all disabled:opacity-50"
                                    title="Download Invoice"
                                >
                                    {downloadingInv === invoice.id ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <Download className="w-4 h-4 opacity-70" />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
