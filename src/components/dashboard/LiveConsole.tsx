import React, { useEffect, useRef } from 'react';

export const LiveConsole: React.FC = () => {
    const consoleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, []);

    return (
        <div className="flex flex-col flex-1 min-h-0">
            <div className="flex items-center justify-between pb-2 px-1">
                <h3 className="text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-primary">terminal</span>
                    Live Console
                </h3>
                <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                </div>
            </div>
            <div ref={consoleRef} className="flex-1 bg-[#050A14]/60 border border-white/5 rounded-lg p-3 overflow-y-auto font-mono text-xs leading-relaxed shadow-inner">
                <div className="flex flex-col gap-1.5 opacity-90">
                    <div className="flex gap-2 text-gray-500">
                        <span>10:42:01</span>
                        <span className="text-gray-400">&gt; System Initialized...</span>
                    </div>
                    <div className="flex gap-2 text-primary/80">
                        <span>10:42:03</span>
                        <span className="text-primary">&gt; Bluetooth Service: Active</span>
                    </div>
                    <div className="flex gap-2 text-gray-500">
                        <span>10:42:05</span>
                        <span className="text-gray-400">&gt; Scanning devices...</span>
                    </div>
                    <div className="flex gap-2 text-green-400/90">
                        <span>10:42:08</span>
                        <span className="text-green-400">&gt; Connected: Pixel 7 (Pro)</span>
                    </div>
                    <div className="flex gap-2 text-gray-500">
                        <span>10:42:15</span>
                        <span className="text-gray-400">&gt; Syncing contacts (402)...</span>
                    </div>
                    <div className="flex gap-2 text-gray-500">
                        <span>10:43:00</span>
                        <span className="text-gray-400">&gt; Idle Mode Active</span>
                    </div>
                    <div className="flex gap-2 text-gray-500 animate-pulse">
                        <span className="text-primary">&gt;_</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
