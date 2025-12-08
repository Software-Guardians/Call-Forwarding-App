import React from 'react';

interface DialerDisplayProps {
    value: string;
    onBackspace?: () => void;
}

export const DialerDisplay: React.FC<DialerDisplayProps> = ({ value, onBackspace }) => {
    return (
        <>
            {/* Headline / Status */}
            <div className="flex justify-between items-end mb-6 border-b border-gray-800 pb-2">
                <h3 className="text-white font-display text-lg tracking-[0.2em] font-bold text-shadow-sm">DIALER</h3>
                <span className="text-green-400 font-mono text-xs animate-pulse">● SYSTEM READY</span>
            </div>
            {/* Input Field */}
            <div className="mb-8 relative group/input">
                <div className="absolute -top-3 left-3 bg-background-dark px-2 text-[10px] text-primary font-mono tracking-widest uppercase z-10 group-focus-within/input:text-white transition-colors">Dest. Number</div>
                <div className="flex w-full items-center rounded-xl border border-gray-700 bg-[#080f18] focus-within:border-primary focus-within:shadow-neon focus-within:bg-[#0a141f] transition-all duration-300 h-20 overflow-hidden relative">
                    {/* Scanline effect inside input */}
                    <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]"></div>
                    <input
                        className="flex w-full bg-transparent text-white placeholder:text-gray-700 text-3xl font-mono tracking-wider p-4 pl-6 outline-none border-none focus:ring-0 z-10"
                        placeholder="( _ _ _ )  _ _ _ - _ _ _ _"
                        type="tel"
                        value={value}
                        readOnly // Managed by keypad usually
                    />
                    <button
                        onClick={onBackspace}
                        className="h-full px-5 text-gray-500 hover:text-red-400 transition-colors z-10 flex items-center justify-center border-l border-gray-800 hover:bg-white/5 active:bg-white/10"
                    >
                        <span className="material-symbols-outlined !text-[28px]">backspace</span>
                    </button>
                </div>
            </div>
        </>
    );
};
