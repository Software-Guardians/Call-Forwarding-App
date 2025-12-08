import React from 'react';

interface DialerActionsProps {
    onCall?: () => void;
    onContacts?: () => void;
}

export const DialerActions: React.FC<DialerActionsProps> = ({ onCall, onContacts }) => {
    return (
        <div className="flex gap-4 items-stretch h-14">
            {/* Context Action (Secondary) */}
            <button
                onClick={onContacts}
                className="w-14 shrink-0 rounded-2xl border border-gray-700 bg-gray-900 hover:bg-gray-800 hover:border-white text-white flex items-center justify-center transition-all"
            >
                <span className="material-symbols-outlined">contacts</span>
            </button>
            {/* Call Button (Primary) */}
            <button
                onClick={onCall}
                className="flex-1 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-400 text-black font-display font-bold text-lg tracking-widest hover:shadow-neon-green hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group/call relative overflow-hidden"
            >
                {/* Shiny reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover/call:animate-shine"></div>
                <span className="material-symbols-outlined !text-[28px] group-hover/call:animate-bounce">call</span>
                <span>INITIATE</span>
            </button>
        </div>
    );
};
