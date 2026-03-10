"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, Shield, KeyRound, Mail, Smartphone, Loader2, Check, AlertCircle, X, ExternalLink } from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("Profile Details");
    const [name, setName] = useState("Student User");
    const [email, setEmail] = useState("student@example.com");

    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    useEffect(() => {
        // Load state from local storage
        const stored = localStorage.getItem('happybook-user');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.name) setName(parsed.name);
            if (parsed.email) setEmail(parsed.email);
        }
    }, []);

    const handleSaveProfile = () => {
        setIsSaving(true);
        setTimeout(() => {
            // Save global user state mock
            const existing = JSON.parse(localStorage.getItem('happybook-user') || '{}');
            localStorage.setItem('happybook-user', JSON.stringify({ ...existing, name: name.trim() || 'Student User', email: email }));
            window.dispatchEvent(new Event('user-updated'));

            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1200);
    };

    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdatingPassword(true);
        setTimeout(() => {
            setIsUpdatingPassword(false);
            setShowPasswordModal(false);
        }, 1500);
    };

    return (
        <>
            <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto transition-all duration-300">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Account Settings</h1>
                    <p className="text-[var(--on-surface-variant)] mt-2">Manage your profile details and security preferences.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Navigation Sidebar */}
                    <div className="flex flex-col gap-2">
                        {["Profile Details", "Security", "Integrations", "Data Export", "Danger Zone"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-left px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm ${activeTab === tab
                                        ? 'bg-surface text-foreground font-semibold border-border translate-x-1 border'
                                        : 'text-[var(--on-surface-variant)] hover:text-foreground hover:bg-surface border border-transparent'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="md:col-span-2 flex flex-col gap-6 relative min-h-[400px]">

                        {activeTab === "Profile Details" && (
                            <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 animate-in slide-in-from-right-4 fade-in duration-300">
                                <h3 className="text-lg font-bold text-foreground">Personal Information</h3>

                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-[var(--on-surface-variant)]">Full Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-[var(--on-surface-variant)]">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                                            <input
                                                type="email"
                                                value={email}
                                                disabled
                                                className="w-full bg-background border border-border/50 rounded-xl pl-10 pr-4 py-3 text-sm text-foreground opacity-70 cursor-not-allowed font-medium"
                                            />
                                        </div>
                                        <p className="text-xs text-[var(--on-surface-variant)] mt-1 flex items-center gap-1.5">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            Contact <Link href="/dashboard/support" className="text-primary hover:underline font-semibold mx-1">support</Link> to change your email address.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end items-center gap-4">
                                    {showSuccess && <span className="text-sm text-green-500 font-bold flex items-center gap-1.5 animate-in fade-in zoom-in duration-300"><Check className="w-4 h-4 stroke-[3]" /> Saved!</span>}
                                    <button
                                        onClick={handleSaveProfile}
                                        disabled={isSaving}
                                        className="bg-foreground text-background px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-all disabled:opacity-70 flex items-center justify-center gap-2 min-w-[140px]"
                                    >
                                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "Security" && (
                            <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 animate-in slide-in-from-right-4 fade-in duration-300">
                                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-primary" /> Security Options
                                </h3>

                                <div className="flex items-center justify-between py-4 border-b border-border/50">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-surface rounded-lg">
                                            <KeyRound className="w-5 h-5 text-zinc-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm text-foreground">Password</h4>
                                            <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">Last changed 3 months ago</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowPasswordModal(true)}
                                        className="text-sm font-bold bg-surface border border-border px-4 py-1.5 rounded-lg hover:brightness-110 flex items-center gap-2 text-foreground"
                                    >
                                        Update
                                    </button>
                                </div>

                                <div className="flex items-center justify-between py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-surface rounded-lg">
                                            <Smartphone className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                                                Two-Factor Auth
                                                {twoFactorEnabled && <span className="bg-green-500/10 text-green-500 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Active</span>}
                                            </h4>
                                            <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">Add an extra layer of security</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                        className={`text-sm font-bold border px-4 py-1.5 rounded-lg transition-all duration-300 ${twoFactorEnabled ? 'bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20' : 'bg-primary text-primary-foreground border-primary hover:opacity-90'}`}
                                    >
                                        {twoFactorEnabled ? 'Disable' : 'Enable'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Mock states for other tabs */}
                        {!["Profile Details", "Security"].includes(activeTab) && (
                            <div className="bg-card border border-border/50 border-dashed rounded-3xl p-16 shadow-sm flex items-center justify-center animate-in fade-in duration-300">
                                <p className="text-[var(--on-surface-variant)] text-sm font-medium">This section is currently under construction.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* Password Modal Overlay */}
            {showPasswordModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-card border border-border w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-border">
                            <h2 className="text-xl font-bold tracking-tight text-foreground">Update Password</h2>
                            <button onClick={() => setShowPasswordModal(false)} className="p-2 bg-surface rounded-xl hover:bg-border transition-colors">
                                <X className="w-4 h-4 text-[var(--on-surface-variant)]" />
                            </button>
                        </div>
                        <form onSubmit={handlePasswordUpdate} className="p-6 flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-[var(--on-surface-variant)]">Current Password</label>
                                <input type="password" required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-[var(--on-surface-variant)]">New Password</label>
                                <input type="password" required minLength={8} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-[var(--on-surface-variant)]">Confirm New Password</label>
                                <input type="password" required minLength={8} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground" />
                            </div>

                            <div className="mt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setShowPasswordModal(false)} className="px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-surface border border-transparent transition-colors text-foreground">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isUpdatingPassword} className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:opacity-90 transition-all min-w-[140px] flex items-center justify-center disabled:opacity-70">
                                    {isUpdatingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : "Set Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
