import React from 'react';

interface IncomingCallOverlayProps {
    callerName?: string;
    callerNumber?: string;
    onAccept: () => void;
    onDecline: () => void;
}

export const IncomingCallOverlay: React.FC<IncomingCallOverlayProps> = ({ 
    callerName = "Sarah Connor", 
    callerNumber = "+1 (555) 019-2834",
    onAccept,
    onDecline
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="relative z-20 w-full max-w-[320px]">
            <div className="relative glass-panel rounded-xl border border-primary/20 shadow-2xl overflow-hidden flex flex-col items-center p-6 bg-[#09121f]/85">
                
                {/* Caller Info */}
                <div className="flex flex-col items-center gap-1 text-center w-full mb-6">
                    <h2 className="text-white text-xl font-bold tracking-tight animate-pulse">{callerName}</h2>
                    <p className="font-mono text-gray-400 text-sm">{callerNumber}</p>
                </div>

                {/* Actions */}
                <div className="flex w-full justify-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <button 
                            onClick={onDecline}
                            className="flex items-center justify-center h-14 w-14 rounded-full border border-red-500/50 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-95 group"
                        >
                            <span className="material-symbols-outlined text-[28px] group-hover:animate-shake">call_end</span>
                        </button>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <button 
                            onClick={onAccept}
                            className="flex items-center justify-center h-14 w-14 rounded-full bg-green-500 text-background-dark hover:bg-green-400 transition-all duration-300 active:scale-95 hover:shadow-neon-green"
                        >
                            <span className="material-symbols-outlined text-[28px] font-bold animate-bounce">call</span>
                        </button>
                    </div>
                </div>

                {/* Decorative Corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-primary/30 rounded-tl-lg"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-primary/30 rounded-tr-lg"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-primary/30 rounded-bl-lg"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-primary/30 rounded-br-lg"></div>
            </div>
        </div>
    </div>
  );
};
