import React from 'react';
import { ConnectionState } from '../../types/bluetooth';

interface DashboardHeaderProps {
    connectionState?: ConnectionState;
    deviceName?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    connectionState = 'IDLE',
    deviceName
}) => {
    const isConnected = connectionState === 'CONNECTED';

    return (
        <header className="flex items-center justify-between px-5 py-4 border-b border-primary/20 bg-black/20 select-none" style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}>
            <div className="flex items-center gap-3">
                <div className="size-8 rounded flex items-center justify-center bg-primary/10 border border-primary/30 shadow-neon-soft text-primary">
                    <span className="material-symbols-outlined text-[20px]">wifi_tethering</span>
                </div>
                <div>
                    <h1 className="text-white text-lg font-bold leading-none tracking-wider text-glow">AURA LINK</h1>
                    <span className="text-[10px] text-primary/60 font-mono tracking-widest uppercase">System Online</span>
                </div>
            </div>
            {/* Connection Status Pill */}
            {isConnected && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#050A14]/80 border border-white/5 shadow-inner">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </div>
                    <span className="text-xs font-medium text-gray-300">{deviceName ? deviceName : 'Device Connected'}</span>
                    <span className="text-[10px] text-gray-500 font-mono pl-1 border-l border-gray-700">--%</span>
                </div>
            )}
        </header>
    );
};

