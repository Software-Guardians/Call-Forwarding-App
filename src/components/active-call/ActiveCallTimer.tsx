import React, { useState, useEffect } from 'react';

export const ActiveCallTimer: React.FC = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (totalSeconds: number) => {
        const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        // Template only shows 00:04:23 (H:M:S ?) or M:S:ms? 
        // Typically call timers are HH:MM:SS. Code example is 00:04:23.
        return `${h}:${m}:${s}`;
    };

    return (
        <div className="w-full flex flex-col items-center gap-4 py-2">
            <div className="text-5xl font-mono font-medium text-white tracking-tighter tabular-nums drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                {formatTime(seconds)}
            </div>
        </div>
    );
};
