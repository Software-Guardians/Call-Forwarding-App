import React from 'react';

interface DialerHeaderProps {
    onClose?: () => void;
}

export const DialerHeader: React.FC<DialerHeaderProps> = ({ onClose }) => {
    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-[#00F0FF]/20 bg-background-dark/80 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
            <div className="flex items-center gap-4 text-white">
                <div className="size-8 text-primary animate-pulse">
                    <span className="material-symbols-outlined !text-[32px]">hub</span>
                </div>
                <div>
                    <h2 className="text-white text-xl font-display font-bold leading-tight tracking-wider">AURA LINK <span className="text-primary">//</span> DESKTOP</h2>
                    <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Ver 2.4.0 // Stable</p>
                </div>
            </div>
            <div className="flex flex-1 justify-end gap-6 items-center">
                <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
                    <span className="material-symbols-outlined text-green-400 !text-[16px]">bluetooth_connected</span>
                    <span className="text-xs font-mono text-primary tracking-widest">LINKED: PIXEL 7</span>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center justify-center size-10 rounded-full bg-surface-dark border border-gray-700 text-gray-300 hover:text-primary hover:border-primary hover:shadow-neon transition-all duration-300">
                        <span className="material-symbols-outlined !text-[20px]">settings</span>
                    </button>
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center size-10 rounded-full bg-surface-dark border border-gray-700 text-gray-300 hover:text-primary hover:border-primary hover:shadow-neon transition-all duration-300"
                    >
                        <span className="material-symbols-outlined !text-[20px]">close</span>
                    </button>
                </div>
                <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-gray-600 relative" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkQwEAW1h7_7JE6OkezuH_WP-B9P3TjwRCzMQf27X-gOR1FkH480o6be2_elGKTBbKIDa7nqRzgtGBzdpQNmhkxe0XPPuqtSLMY9RSTJXPoY0rZeXGGveap1qXKA5VUhHAT6LTD6zBHIusBxu1zbDXhMn4NCLqIMh_mXVUxSvf2fjGljAykGwtS0vbFG7eVsEjZYWW1omuZVaWpF5V24EqvuKW03047EqycpB9If5U0VCMwM1aiQGkvlKM7_N9xlD9WDu6-IO3RWlS")' }}>
                    <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-background-dark"></div>
                </div>
            </div>
        </header>
    );
};
