import React from 'react';

export const ActiveCallHeader: React.FC = () => {
    return (
        <header className="relative z-20 flex items-center justify-between border-b border-[#283839] bg-[#111818]/90 backdrop-blur-md px-6 py-4 lg:px-10">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-10 rounded-lg bg-gradient-to-br from-primary/20 to-transparent border border-primary/30">
                    <span className="material-symbols-outlined text-primary text-2xl">all_inclusive</span>
                </div>
                <div>
                    <h1 className="text-white text-xl font-bold font-tech tracking-wider leading-none">AURA LINK</h1>
                    <p className="text-[#9cb8ba] text-xs font-mono tracking-widest uppercase">System Online</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A2628] border border-[#283839]">
                    <div className="size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(13,231,242,0.8)]"></div>
                    <span className="text-xs font-bold tracking-wider text-primary">BLUETOOTH ACTIVE</span>
                </div>
                <button className="flex size-10 items-center justify-center rounded-full bg-[#283839] text-white hover:bg-[#384849] transition-colors">
                    <span className="material-symbols-outlined text-[20px]">settings</span>
                </button>
            </div>
        </header>
    );
};
