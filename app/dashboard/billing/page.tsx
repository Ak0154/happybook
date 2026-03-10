"use client";

import { useState } from "react";
import { CreditCard, Download, Receipt } from "lucide-react";

export default function BillingPage() {
    const [invoices] = useState([
        { id: "INV-2026-03-01", date: "Mar 1, 2026", amount: "$0.00", status: "Paid" },
        { id: "INV-2026-02-01", date: "Feb 1, 2026", amount: "$0.00", status: "Paid" },
        { id: "INV-2026-01-01", date: "Jan 1, 2026", amount: "$0.00", status: "Paid" },
    ]);

    return (
        <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Billing Overview</h1>
                    <p className="text-[var(--on-surface-variant)] mt-2">Manage your subscription, payment methods, and invoices.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Plan */}
                <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
                    <div>
                        <h3 className="text-lg font-bold text-foreground mb-1">Current Plan</h3>
                        <p className="text-sm text-[var(--on-surface-variant)]">You are currently on the free tier.</p>
                    </div>

                    <div className="py-6 border-y border-border/50">
                        <div className="text-3xl font-bold text-foreground">Student Plan</div>
                        <div className="text-sm font-medium text-green-500 mt-2">Active</div>
                    </div>

                    <button className="bg-primary text-primary-foreground w-full py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                        Upgrade to Pro
                    </button>
                </div>

                {/* Payment Methods */}
                <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
                    <div>
                        <h3 className="text-lg font-bold text-foreground mb-1">Payment Methods</h3>
                        <p className="text-sm text-[var(--on-surface-variant)]">Add a card to streamline upgrades.</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center py-6 border-y border-border/50 border-dashed text-[var(--on-surface-variant)]">
                        <CreditCard className="w-10 h-10 mb-3 opacity-20" />
                        <span className="text-sm">No payment method added.</span>
                    </div>

                    <button className="bg-surface text-foreground border border-border w-full py-2.5 rounded-xl font-semibold hover:bg-card transition-colors">
                        Add Payment Method
                    </button>
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
                        <div key={invoice.id} className={`flex items-center justify-between py-4 ${i !== invoices.length - 1 ? 'border-b border-border/50' : ''}`}>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-foreground text-sm">{invoice.id}</span>
                                <span className="text-xs text-[var(--on-surface-variant)] font-medium">{invoice.date}</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-end gap-1">
                                    <span className="font-semibold text-foreground text-sm">{invoice.amount}</span>
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-green-500">{invoice.status}</span>
                                </div>
                                <button className="p-2 bg-surface hover:brightness-110 rounded-lg text-foreground transition-all">
                                    <Download className="w-4 h-4 opacity-70" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
