import React from 'react';

interface ActionButtonsProps {
    onDialpadClick?: () => void;
    onContactsClick?: () => void;
    onSimulateCall?: () => void;
    onConnect?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onDialpadClick, onContactsClick, onSimulateCall, onConnect }) => {
    return (
        <div className="flex flex-col gap-3">
            {/* Large Dialpad Button */}
            <button
                onClick={onDialpadClick}
                className="group relative flex items-center justify-center w-full h-16 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/40 hover:border-primary text-primary transition-all duration-300 shadow-neon-soft hover:shadow-neon"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="material-symbols-outlined text-[28px] mr-3 group-hover:scale-110 transition-transform">dialpad</span>
                <span className="text-lg font-bold tracking-widest">OPEN DIALPAD</span>
            </button>

            {/* Connect Button */}
            <button
                onClick={onConnect}
                className="flex items-center justify-between w-full h-12 px-5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 hover:border-emerald-500 text-emerald-400 transition-all"
            >
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined">bluetooth</span>
                    <span className="text-sm font-bold tracking-wide">CONNECT PHONE</span>
                </div>
                <span className="material-symbols-outlined text-emerald-500/50 text-sm">chevron_right</span>
            </button>

            {/* Contacts Button */}
            <button
                onClick={onContactsClick}
                className="flex items-center justify-between w-full h-12 px-5 rounded-lg bg-[#283839]/40 hover:bg-[#283839]/80 border border-white/10 hover:border-white/20 text-gray-200 transition-all"
            >
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400">contacts</span>
                    <span className="text-sm font-bold tracking-wide">CONTACTS</span>
                </div>
                <span className="material-symbols-outlined text-gray-500 text-sm">chevron_right</span>
            </button>

            {/* Simulate Call Button */}
            <button
                onClick={onSimulateCall}
                className="flex items-center justify-between w-full h-12 px-5 rounded-lg bg-[#283839]/40 hover:bg-[#283839]/80 border border-white/10 hover:border-white/20 text-gray-200 transition-all"
            >
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400">ring_volume</span>
                    <span className="text-sm font-bold tracking-wide">INCOMING TEST</span>
                </div>
                <span className="material-symbols-outlined text-gray-500 text-sm">chevron_right</span>
            </button>
        </div>
    );
};
