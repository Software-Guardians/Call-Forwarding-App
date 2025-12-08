import React from 'react';
import { ActiveCallHeader } from '../components/active-call/ActiveCallHeader';
import { ActiveCallProfile } from '../components/active-call/ActiveCallProfile';
import { ActiveCallTimer } from '../components/active-call/ActiveCallTimer';
import { ActiveCallControls } from '../components/active-call/ActiveCallControls';

interface ActiveCallProps {
    onEndCall: () => void;
    contactName?: string;
}

export const ActiveCall: React.FC<ActiveCallProps> = ({ onEndCall, contactName }) => {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-display overflow-x-hidden text-white flex flex-col relative">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.07]"></div>
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[100px]"></div>

                {/* Scanlines Effect */}
                <div className="absolute inset-0 opacity-20" style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1))',
                    backgroundSize: '100% 4px',
                    pointerEvents: 'none'
                }}></div>
            </div>

            <ActiveCallHeader />

            <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 lg:p-8">
                <div className="glass-panel w-full max-w-[480px] rounded-3xl shadow-glass flex flex-col overflow-hidden transition-all duration-300 group ring-1 ring-white/10">
                    <ActiveCallProfile name={contactName} />
                    <ActiveCallTimer />
                    <ActiveCallControls onEndCall={onEndCall} />
                </div>
            </main>
        </div>
    );
};
