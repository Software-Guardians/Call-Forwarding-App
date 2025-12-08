import React from 'react';
import { SettingsHeader } from '../components/settings/SettingsHeader';
import { useTheme } from '../context/ThemeContext';

interface SettingsProps { }

export const Settings: React.FC<SettingsProps> = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="text-slate-800 dark:text-white font-display h-full flex flex-col overflow-x-hidden selection:bg-primary selection:text-black relative">
            <div className="relative z-10 flex flex-col h-full grow">
                <SettingsHeader />

                <main className="flex-1 w-full max-w-[1200px] mx-auto p-6 md:p-10 flex flex-col gap-8">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/5">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter" style={{ textShadow: theme === 'dark' ? "0 0 20px rgba(13,231,242,0.1)" : "none" }}>
                                SETTINGS
                            </h1>
                            <p className="text-slate-500 dark:text-gray-400 font-mono text-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-primary">terminal</span>
                                CONSOLE_ID: 884-XJ // MODE: SECURE_EDIT
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 rounded bg-white dark:bg-surface-dark border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 text-xs font-mono text-gray-500 dark:text-gray-300 transition-colors">RESET DEFAULTS</button>
                            <button className="px-4 py-2 rounded bg-primary text-background-dark font-bold text-xs tracking-wider hover:bg-white hover:shadow-neon transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">save</span> SAVE CHANGES
                            </button>
                        </div>
                    </div>

                    <div className="space-y-10">
                        {/* Bluetooth Section */}
                        <section>
                            <div className="flex items-baseline justify-between mb-4 pb-2 border-b border-gray-300 dark:border-white/10">
                                <h2 className="text-xl font-bold tracking-wider text-slate-800 dark:text-white uppercase flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-2xl drop-shadow-sm">bluetooth</span>
                                    Bluetooth
                                </h2>
                            </div>
                            <div className="bg-slate-900 dark:bg-surface-dark/50 rounded-lg p-6 border border-slate-800 dark:border-white/10 shadow-md dark:shadow-none transition-shadow hover:shadow-lg dark:hover:shadow-none">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div>
                                        <h3 className="font-bold text-white text-lg">Connected Devices</h3>
                                        <p className="text-sm text-gray-400 font-medium">Manage paired devices or scan for new ones.</p>
                                    </div>
                                    <button className="group relative overflow-hidden rounded bg-white dark:bg-primary/10 border border-white/20 dark:border-primary/40 px-6 py-2.5 text-sm font-bold text-slate-900 dark:text-primary tracking-widest hover:bg-gray-100 dark:hover:bg-primary dark:hover:text-black transition-all duration-300 shadow-neon">
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
                            <div className="flex items-baseline justify-between mb-4 pb-2 border-b border-gray-300 dark:border-white/10">
                                <h2 className="text-xl font-bold tracking-wider text-slate-800 dark:text-white uppercase flex items-center gap-3">
                                    <span className="material-symbols-outlined text-secondary text-2xl drop-shadow-sm">palette</span>
                                    Theme
                                </h2>
                            </div>
                            <div className="bg-slate-900 dark:bg-surface-dark/50 rounded-lg p-6 border border-slate-800 dark:border-white/10 shadow-md dark:shadow-none transition-shadow hover:shadow-lg dark:hover:shadow-none">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div>
                                        <h3 className="font-bold text-white text-lg">Appearance</h3>
                                        <p className="text-sm text-gray-400 font-medium">Switch between light and dark system themes.</p>
                                    </div>
                                    {/* Custom Toggle */}
                                    <div className="relative inline-block w-14 align-middle select-none transition duration-200 ease-in">
                                        <input
                                            type="checkbox"
                                            name="toggle"
                                            id="theme-toggle"
                                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-slate-900 dark:border-surface-dark appearance-none cursor-pointer transition-all duration-300 top-0 shadow-sm"
                                            checked={theme === 'dark'}
                                            onChange={toggleTheme}
                                        />
                                        <label htmlFor="theme-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-600 dark:bg-gray-800 cursor-pointer border border-gray-500 dark:border-white/10"></label>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Audio Section */}
                        <section>
                            <div className="flex items-baseline justify-between mb-4 pb-2 border-b border-gray-300 dark:border-white/10">
                                <h2 className="text-xl font-bold tracking-wider text-slate-800 dark:text-white uppercase flex items-center gap-3">
                                    <span className="material-symbols-outlined text-emerald-400 text-2xl drop-shadow-sm">graphic_eq</span>
                                    Audio
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-slate-900 dark:bg-surface-dark/50 rounded-lg p-6 border border-slate-800 dark:border-white/10 shadow-md dark:shadow-none transition-shadow hover:shadow-lg dark:hover:shadow-none">
                                    <label className="block text-sm font-bold text-gray-200 mb-2 uppercase tracking-wider">Input Device</label>
                                    <div className="relative">
                                        <select className="block w-full rounded bg-gray-100 dark:bg-surface-dark border border-gray-600 dark:border-white/10 text-slate-900 dark:text-white py-2.5 pl-3 pr-10 text-sm focus:border-primary focus:ring-1 focus:ring-primary font-mono tracking-tight appearance-none font-medium">
                                            <option>Microphone Array (Realtek Audio)</option>
                                            <option>Headset Mic (Pixel 8 Pro)</option>
                                            <option>External USB Mic</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                                            <span className="material-symbols-outlined text-lg">arrow_drop_down</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-900 dark:bg-surface-dark/50 rounded-lg p-6 border border-slate-800 dark:border-white/10 shadow-md dark:shadow-none transition-shadow hover:shadow-lg dark:hover:shadow-none">
                                    <label className="block text-sm font-bold text-gray-200 mb-2 uppercase tracking-wider">Output Device</label>
                                    <div className="relative">
                                        <select className="block w-full rounded bg-gray-100 dark:bg-surface-dark border border-gray-600 dark:border-white/10 text-slate-900 dark:text-white py-2.5 pl-3 pr-10 text-sm focus:border-primary focus:ring-1 focus:ring-primary font-mono tracking-tight appearance-none font-medium">
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

                <footer className="border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-background-dark py-4 mt-auto">
                    <div className="max-w-[1200px] mx-auto px-10 flex justify-between items-center text-[10px] font-mono text-slate-500 dark:text-gray-600">
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
