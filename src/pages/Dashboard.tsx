import React from 'react';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { ActionButtons } from '../components/dashboard/ActionButtons';
import { LiveConsole } from '../components/dashboard/LiveConsole';
import { QuickStats } from '../components/dashboard/QuickStats';
import { DashboardFooter } from '../components/dashboard/DashboardFooter';

interface DashboardProps {
    onDialpadClick?: () => void;
    onContactsClick?: () => void;
    onSimulateIncomingCall?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onDialpadClick, onContactsClick, onSimulateIncomingCall }) => {
    // Placeholder actions

    return (
        <div className="h-full flex items-center justify-center font-display overflow-hidden relative">
            {/* Main Dashboard Window */}
            <main className="relative w-full max-w-[400px] h-[640px] flex flex-col glass-panel rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/5">
                <DashboardHeader />

                {/* Body Content */}
                <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
                    <ActionButtons
                        onDialpadClick={onDialpadClick}
                        onContactsClick={onContactsClick}
                        onSimulateCall={onSimulateIncomingCall}
                    />
                    <LiveConsole />
                    <QuickStats />
                </div>

                <DashboardFooter />
            </main>
        </div>
    );
};
