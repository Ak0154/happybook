"use client";

import { Bell, Shield, KeyRound, Mail, Smartphone } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Account Settings</h1>
                <p className="text-[var(--on-surface-variant)] mt-2">Manage your profile details and security preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Navigation Sidebar */}
                <div className="flex flex-col gap-2">
                    {["Profile Details", "Security", "Integrations", "Data Export", "Danger Zone"].map((tab, i) => (
                        <button
                            key={tab}
                            className={`text-left px-4 py-3 rounded-xl font-medium text-sm transition-colors ${i === 0
                                    ? 'bg-surface text-foreground font-semibold shadow-sm'
                                    : 'text-[var(--on-surface-variant)] hover:text-foreground hover:bg-surface/50'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="md:col-span-2 flex flex-col gap-6">

                    <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-foreground">Personal Information</h3>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[var(--on-surface-variant)]">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue="Student User"
                                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[var(--on-surface-variant)]">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                                    <input
                                        type="email"
                                        defaultValue="student@example.com"
                                        disabled
                                        className="w-full bg-background border border-border/50 rounded-xl pl-10 pr-4 py-3 text-sm text-foreground opacity-70 cursor-not-allowed"
                                    />
                                </div>
                                <p className="text-xs text-[var(--on-surface-variant)] mt-1">Contact support to change your email address.</p>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity">
                                Save Changes
                            </button>
                        </div>
                    </div>

                    <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                            <Shield className="w-5 h-5 text-primary" /> Security
                        </h3>

                        <div className="flex items-center justify-between py-4 border-b border-border/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-surface rounded-lg">
                                    <KeyRound className="w-5 h-5 opacity-70" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-foreground">Password</h4>
                                    <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">Last changed 3 months ago</p>
                                </div>
                            </div>
                            <button className="text-sm font-bold text-primary">Update</button>
                        </div>

                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-surface rounded-lg">
                                    <Smartphone className="w-5 h-5 opacity-70" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-foreground">Two-Factor Authentication</h4>
                                    <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">Add an extra layer of security</p>
                                </div>
                            </div>
                            <button className="text-sm font-medium bg-surface border border-border px-4 py-1.5 rounded-lg hover:brightness-110">Enable</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
