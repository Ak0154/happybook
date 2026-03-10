"use client";

import { useState, useEffect } from "react";
import { Bell, Shield, KeyRound, Mail, Smartphone, Loader2, Check, AlertCircle } from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("Profile Details");
    const [name, setName] = useState("Student User");
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    const handleSaveProfile = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1200);
    };

    const handlePasswordUpdate = () => {
        setIsUpdatingPassword(true);
        setTimeout(() => {
            setIsUpdatingPassword(false);
            alert("Password successfully updated! (Mock)");
        }, 800);
    };

    return (
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
                            className={`text-left px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${activeTab === tab
                                    ? 'bg-surface text-foreground font-semibold shadow-sm border border-border/50 translate-x-1'
                                    : 'text-[var(--on-surface-variant)] hover:text-foreground hover:bg-surface/50'
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
                                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[var(--on-surface-variant)]">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                                        <input
                                            type="email"
                                            value="student@example.com"
                                            disabled
                                            className="w-full bg-background border border-border/50 rounded-xl pl-10 pr-4 py-3 text-sm text-foreground opacity-70 cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="text-xs text-[var(--on-surface-variant)] mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> Contact support to change your email address.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end items-center gap-4">
                                {showSuccess && <span className="text-sm text-green-500 font-medium flex items-center gap-1 animate-in fade-in zoom-in duration-300"><Check className="w-4 h-4" /> Saved!</span>}
                                <button
                                    onClick={handleSaveProfile}
                                    disabled={isSaving}
                                    className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:opacity-90 transition-all disabled:opacity-70 flex items-center gap-2"
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
                                        <KeyRound className="w-5 h-5 opacity-70" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm text-foreground">Password</h4>
                                        <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">Last changed 3 months ago</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handlePasswordUpdate}
                                    className="text-sm font-bold text-primary hover:underline flex items-center gap-2"
                                >
                                    {isUpdatingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update"}
                                </button>
                            </div>

                            <div className="flex items-center justify-between py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-surface rounded-lg">
                                        <Smartphone className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                                            Two-Factor Authentication
                                            {twoFactorEnabled && <span className="bg-green-500/10 text-green-500 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>}
                                        </h4>
                                        <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">Add an extra layer of security</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                    className={`text-sm font-medium border px-4 py-1.5 rounded-lg transition-all duration-300 ${twoFactorEnabled ? 'bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20' : 'bg-surface border-border hover:brightness-110'}`}
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
    );
}
