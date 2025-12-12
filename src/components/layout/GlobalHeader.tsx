import React from 'react';
import { useTheme } from '../../context/ThemeContext';

import { useBluetooth } from '../../context/BluetoothContext';

export const GlobalHeader: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { connectionState, connectedDevice, disconnect } = useBluetooth();

    const isConnected = connectionState === 'CONNECTED';
    const deviceName = connectedDevice?.name || 'Unknown Device';

    return (
        <header className="flex items-center justify-between whitespace-nowrap px-6 py-4 sticky top-0 z-50 bg-slate-200 dark:bg-transparent">
            <div className="flex items-center gap-4 text-slate-800 dark:text-white">
                <div>
                    {/* Title and Version removed as per user request */}
                </div>
            </div>
            <div className="flex flex-1 justify-end gap-6 items-center">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="relative group flex items-center justify-center size-9 rounded-full bg-slate-100 dark:bg-surface-dark border border-slate-500 dark:border-white/10 hover:border-black dark:hover:border-primary/50 transition-all shadow-sm dark:shadow-none"
                    title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    <span className="material-symbols-outlined text-black dark:text-gray-400 group-hover:text-primary text-xl">
                        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                    </span>
                </button>

                <div className="h-9 w-px bg-slate-500 dark:bg-white/10 mx-[-0.5rem]"></div>

                <button className="relative group flex items-center justify-center size-9 rounded-full bg-slate-100 dark:bg-surface-dark border border-slate-500 dark:border-white/10 hover:border-black dark:hover:border-primary/50 transition-all shadow-sm dark:shadow-none">
                    <span className="material-symbols-outlined text-black dark:text-gray-400 group-hover:text-primary text-xl">notifications</span>
                    <span className="absolute top-0 right-0 size-2 bg-secondary rounded-full border-2 border-white dark:border-background-dark"></span>
                </button>
                <div className="h-9 w-px bg-slate-500 dark:bg-white/10 mx-[-0.5rem]"></div>

                {isConnected && (
                    <button
                        onClick={() => {
                            if (window.confirm("Bu cihazın bağlantısını kesmek istiyor musunuz?")) {
                                disconnect();
                            }
                        }}
                        className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-slate-500 dark:border-primary/20 bg-primary/5 hover:bg-red-500/10 cursor-pointer transition-colors"
                        title="Bağlantıyı Kes"
                    >
                        <span className="material-symbols-outlined text-slate-900 dark:text-green-400 !text-[16px] font-bold">bluetooth_connected</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-primary tracking-widest uppercase">
                            LINKED: {deviceName}
                        </span>
                    </button>
                )}
                <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-slate-500 dark:border-gray-600 relative shadow-sm dark:shadow-none" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkQwEAW1h7_7JE6OkezuH_WP-B9P3TjwRCzMQf27X-gOR1FkH480o6be2_elGKTBbKIDa7nqRzgtGBzdpQNmhkxe0XPPuqtSLMY9RSTJXPoY0rZeXGGveap1qXKA5VUhHAT6LTD6zBHIusBxu1zbDXhMn4NCLqIMh_mXVUxSvf2fjGljAykGwtS0vbFG7eVsEjZYWW1omuZVaWpF5V24EqvuKW03047EqycpB9If5U0VCMwM1aiQGkvlKM7_N9xlD9WDu6-IO3RWlS")' }}>
                    <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white dark:border-background-dark"></div>
                </div>
            </div>
        </header>
    );
};
