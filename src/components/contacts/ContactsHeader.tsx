import React from 'react';

export const ContactsHeader: React.FC = () => {
    return (
        <header className="shrink-0 px-6 py-6 md:px-10 glass-panel z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-primary/60 mb-1">
                    <span className="material-symbols-outlined text-[18px]">encrypted</span>
                    <span className="text-xs font-mono uppercase tracking-widest">Database // Secure</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase"><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Contacts</span> Grid</h2>
            </div>
            {/* Cyberpunk Search Bar */}
            <div className="w-full md:w-96 group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-20 group-focus-within:opacity-100 transition duration-500 blur"></div>
                <div className="relative flex items-center bg-[#0B1215] rounded-lg border border-white/10 group-focus-within:border-primary/50 overflow-hidden">
                    <div className="pl-3 pr-2 text-slate-500 group-focus-within:text-primary transition-colors">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                    <input className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-600 font-mono text-sm py-3 outline-none" placeholder="SEARCH ID OR FREQUENCY..." type="text" />
                    <div className="pr-3 text-xs text-slate-700 font-mono">CTRL+F</div>
                </div>
            </div>
        </header>
    );
};
