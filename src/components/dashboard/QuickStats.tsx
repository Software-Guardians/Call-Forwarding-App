import React from 'react';

export const QuickStats: React.FC = () => {
    return (
        <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#283839]/30 rounded-lg p-3 border border-white/5 flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 font-mono uppercase">Signal</span>
                <div className="flex items-end justify-between">
                    <span className="text-white font-bold text-sm">5G UC</span>
                    <span className="material-symbols-outlined text-green-400 text-[16px]">signal_cellular_alt</span>
                </div>
            </div>
            <div className="bg-[#283839]/30 rounded-lg p-3 border border-white/5 flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 font-mono uppercase">Calls Today</span>
                <div className="flex items-end justify-between">
                    <span className="text-white font-bold text-sm">12</span>
                    <span className="material-symbols-outlined text-primary text-[16px]">call_log</span>
                </div>
            </div>
        </div>
    );
};
