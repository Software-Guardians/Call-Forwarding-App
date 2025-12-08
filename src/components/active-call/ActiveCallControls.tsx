import React from 'react';

interface ActiveCallControlsProps {
    onEndCall?: () => void;
    onMute?: () => void;
    onKeypad?: () => void;
}

export const ActiveCallControls: React.FC<ActiveCallControlsProps> = ({ onEndCall, onMute, onKeypad }) => {
    return (
        <div className="mt-auto bg-[#0d1414]/80 backdrop-blur-xl border-t border-[#283839] p-6">
            <div className="flex items-center justify-around max-w-[320px] mx-auto">
                <button
                    onClick={onMute}
                    className="group flex flex-col items-center gap-2 text-[#9cb8ba] hover:text-white transition-colors duration-200"
                >
                    <div className="flex items-center justify-center size-14 rounded-full bg-surface-highlight border border-[#283839] group-hover:border-primary group-hover:bg-primary/10 transition-all duration-200">
                        <span className="material-symbols-outlined text-[28px] text-white">mic_off</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest">MUTE</span>
                </button>
                <button
                    onClick={onEndCall}
                    className="group flex flex-col items-center gap-2 text-[#9cb8ba] hover:text-danger transition-colors duration-200"
                >
                    <div className="flex items-center justify-center size-16 rounded-full bg-danger-dim border border-danger text-danger group-hover:bg-danger group-hover:text-white group-hover:shadow-neon-red transition-all duration-200 active:scale-95">
                        <span className="material-symbols-outlined text-[32px] fill-current">call_end</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest">END CALL</span>
                </button>
                <button
                    onClick={onKeypad}
                    className="group flex flex-col items-center gap-2 text-[#9cb8ba] hover:text-white transition-colors duration-200"
                >
                    <div className="flex items-center justify-center size-14 rounded-full bg-surface-highlight border border-[#283839] group-hover:border-primary group-hover:bg-primary/10 transition-all duration-200">
                        <span className="material-symbols-outlined text-[28px] text-white">dialpad</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest">KEYPAD</span>
                </button>
            </div>
        </div>
    );
};
