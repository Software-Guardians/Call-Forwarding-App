import React, { useEffect, useRef, useState } from 'react';
import { useLog, LogEntry } from '../../context/LogContext';

export const LiveConsole: React.FC = () => {
    const { logs } = useLog();
    const consoleRef = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    // Auto-scroll to bottom directly on render/update if expanded
    useEffect(() => {
        if (consoleRef.current && isExpanded) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [logs, isExpanded]);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-GB', { hour12: false });
    };

    const getLogColor = (type: LogEntry['type']) => {
        switch (type) {
            case 'success': return 'text-green-400';
            case 'error': return 'text-red-400';
            case 'warning': return 'text-yellow-400';
            case 'bluetooth': return 'text-blue-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className={`flex flex-col transition-all duration-300 ease-in-out ${isExpanded ? 'flex-1 min-h-[150px]' : 'h-atuo'}`}>
            <div className="flex items-center justify-between pb-2 px-1">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="group flex items-center gap-2 focus:outline-none"
                    title={isExpanded ? "Collapse Console" : "Expand Console"}
                >
                    <h3 className="text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2 group-hover:text-primary transition-colors">
                        <span className={`material-symbols-outlined text-[14px] text-primary transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                            expand_more
                        </span>
                        Live Console
                    </h3>
                </button>

                <div className="flex gap-1">
                    <div className={`w-1 h-1 rounded-full ${logs.length > 0 ? 'bg-primary' : 'bg-gray-600'} animate-pulse`}></div>
                    <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                </div>
            </div>

            {isExpanded && (
                <div
                    ref={consoleRef}
                    className="flex-1 bg-[#050A14]/60 border border-white/5 rounded-lg p-3 overflow-y-auto font-mono text-xs leading-relaxed shadow-inner min-h-0"
                >
                    <div className="flex flex-col gap-1.5 opacity-90">
                        {logs.length === 0 && (
                            <div className="text-gray-600 italic">&gt; No recent events...</div>
                        )}
                        {logs.map((log) => (
                            <div key={log.id} className={`flex gap-2 ${getLogColor(log.type)}`}>
                                <span className="opacity-50 select-none">[{formatTime(log.timestamp)}]</span>
                                <span>&gt; {log.message}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
