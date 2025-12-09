import React from 'react';
import { invoke } from '@tauri-apps/api/core';

interface IncomingCallOverlayProps {
    callerNumber?: string;
    onAnswer?: () => void;
    onReject?: () => void;
}

export const IncomingCallOverlay: React.FC<IncomingCallOverlayProps> = ({ callerNumber, onAnswer, onReject }) => {

    const handleAnswer = async () => {
        if (onAnswer) onAnswer();
        try {
            await invoke('send_command', { action: 'ANSWER', number: null });
        } catch (e) {
            console.error('Failed to answer:', e);
        }
    };

    const handleReject = async () => {
        if (onReject) onReject();
        try {
            await invoke('send_command', { action: 'REJECT', number: null });
        } catch (e) {
            console.error('Failed to reject:', e);
        }
    };

    return (
        <div className="absolute inset-x-4 top-4 z-50 animate-in fade-in slide-in-from-top-10 duration-300">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-primary/50 shadow-[0_0_30px_rgba(0,255,255,0.3)] rounded-2xl p-6 flex flex-col items-center gap-6">

                {/* Header & Pulse */}
                <div className="relative">
                    <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                </div>

                <div className="text-center space-y-2">
                    <h3 className="text-primary font-bold tracking-[0.2em] text-sm uppercase">Incoming Call</h3>
                    <div className="text-3xl font-mono font-bold text-white tracking-wider glow-text-white">
                        {callerNumber || "Unknown"}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-8 w-full justify-center">
                    <button
                        onClick={handleReject}
                        className="group flex flex-col items-center gap-2"
                    >
                        <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center group-hover:bg-red-500 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] transition-all duration-300">
                            <span className="material-symbols-outlined text-red-500 group-hover:text-white text-3xl">call_end</span>
                        </div>
                        <span className="text-xs font-bold text-red-400 group-hover:text-red-300 tracking-wider">DECLINE</span>
                    </button>

                    <button
                        onClick={handleAnswer}
                        className="group flex flex-col items-center gap-2"
                    >
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition-all duration-300">
                            <span className="material-symbols-outlined text-emerald-500 group-hover:text-white text-3xl">call</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300 tracking-wider">ACCEPT</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
