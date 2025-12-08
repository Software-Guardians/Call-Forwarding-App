import React from 'react';
import { SettingsHeader } from '../components/settings/SettingsHeader';

interface SettingsProps {
    onNavigate: (view: 'dashboard' | 'contacts' | 'settings') => void;
}

export const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-white font-display min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-black relative">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-grid-pattern bg-[length:40px_40px] opacity-20"></div>
            <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-[radial-gradient(circle_at_15%_50%,_rgba(188,19,254,0.06),_transparent_40%),_radial-gradient(circle_at_85%_30%,_rgba(13,231,242,0.06),_transparent_40%)]"></div>

            <div className="relative z-10 flex flex-col h-full grow">
                <SettingsHeader onNavigate={onNavigate} />

                <main className="flex-1 w-full max-w-[1200px] mx-auto p-6 md:p-10 flex flex-col gap-8">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/5">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter" style={{ textShadow: "0 0 20px rgba(13,231,242,0.1)" }}>
                                SETTINGS
                            </h1>
                            <p className="text-gray-400 font-mono text-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-primary">terminal</span>
                                CONSOLE_ID: 884-XJ // MODE: SECURE_EDIT
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 rounded bg-surface-dark border border-white/10 hover:border-white/30 text-xs font-mono text-gray-300 transition-colors">RESET DEFAULTS</button>
                            <button className="px-4 py-2 rounded bg-primary text-background-dark font-bold text-xs tracking-wider hover:bg-white hover:shadow-neon transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">save</span> SAVE CHANGES
                            </button>
                        </div>
                    </div>

                    <div className="space-y-10">
                        {/* Bluetooth Section */}
                        <section>
                            <div className="flex items-baseline justify-between mb-4 pb-2 border-b border-white/10">
                                <h2 className="text-xl font-bold tracking-wider text-white uppercase flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-2xl">bluetooth</span>
                                    Bluetooth
                                </h2>
                            </div>
                            <div className="bg-surface-dark/50 rounded-lg p-6 border border-white/10">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div>
                                        <h3 className="font-semibold text-white">Connected Devices</h3>
                                        <p className="text-sm text-gray-400">Manage paired devices or scan for new ones.</p>
                                    </div>
                                    <button className="group relative overflow-hidden rounded bg-primary/10 border border-primary/40 px-6 py-2.5 text-sm font-bold text-primary tracking-widest hover:bg-primary hover:text-black transition-all duration-300 shadow-neon">
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined text-lg">search</span>
                                            Re-scan
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Theme Section */}
                        <section>
                            <div className="flex items-baseline justify-between mb-4 pb-2 border-b border-white/10">
                                <h2 className="text-xl font-bold tracking-wider text-white uppercase flex items-center gap-3">
                                    <span className="material-symbols-outlined text-secondary text-2xl">palette</span>
                                    Theme
                                </h2>
                            </div>
                            <div className="bg-surface-dark/50 rounded-lg p-6 border border-white/10">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div>
                                        <h3 className="font-semibold text-white">Appearance</h3>
                                        <p className="text-sm text-gray-400">Switch between light and dark system themes.</p>
                                    </div>
                                    {/* Custom Toggle */}
                                    <div className="relative inline-block w-14 align-middle select-none transition duration-200 ease-in">
                                        <input defaultChecked type="checkbox" name="toggle" id="theme-toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-surface-dark appearance-none cursor-pointer transition-all duration-300 top-0" />
                                        <label htmlFor="theme-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-800 cursor-pointer border border-white/10"></label>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Audio Section */}
                        <section>
                            <div className="flex items-baseline justify-between mb-4 pb-2 border-b border-white/10">
                                <h2 className="text-xl font-bold tracking-wider text-white uppercase flex items-center gap-3">
                                    <span className="material-symbols-outlined text-emerald-400 text-2xl">graphic_eq</span>
                                    Audio
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-surface-dark/50 rounded-lg p-6 border border-white/10">
                                    <label className="block text-sm font-semibold text-gray-200 mb-2 uppercase tracking-wider">Input Device</label>
                                    <div className="relative">
                                        <select className="block w-full rounded bg-surface-dark border border-white/10 text-white py-2 pl-3 pr-10 text-sm focus:border-primary focus:ring-1 focus:ring-primary font-mono tracking-tight appearance-none">
                                            <option>Microphone Array (Realtek Audio)</option>
                                            <option>Headset Mic (Pixel 8 Pro)</option>
                                            <option>External USB Mic</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                                            <span className="material-symbols-outlined text-lg">arrow_drop_down</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-surface-dark/50 rounded-lg p-6 border border-white/10">
                                    <label className="block text-sm font-semibold text-gray-200 mb-2 uppercase tracking-wider">Output Device</label>
                                    <div className="relative">
                                        <select className="block w-full rounded bg-surface-dark border border-white/10 text-white py-2 pl-3 pr-10 text-sm focus:border-primary focus:ring-1 focus:ring-primary font-mono tracking-tight appearance-none">
                                            <option>Speakers (Realtek Audio)</option>
                                            <option>Headphones (Logitech G733)</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                                            <span className="material-symbols-outlined text-lg">arrow_drop_down</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>

                <footer className="border-t border-white/5 bg-background-dark py-4 mt-auto">
                    <div className="max-w-[1200px] mx-auto px-10 flex justify-between items-center text-[10px] font-mono text-gray-600">
                        <div className="flex gap-4">
                            <span>AURA LINK SYSTEM © 2024</span>
                            <span>BUILD: 2405.11.A</span>
                        </div>
                        <div className="flex gap-4 items-center">
                            <span className="flex items-center gap-1"><span className="block w-1.5 h-1.5 rounded-full bg-emerald-500"></span> SERVER: STABLE</span>
                            <span>LATENCY: 12ms</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};
