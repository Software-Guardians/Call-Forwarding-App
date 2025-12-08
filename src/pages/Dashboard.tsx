import React from 'react';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { ActionButtons } from '../components/dashboard/ActionButtons';
import { LiveConsole } from '../components/dashboard/LiveConsole';
import { QuickStats } from '../components/dashboard/QuickStats';
import { DashboardFooter } from '../components/dashboard/DashboardFooter';

interface DashboardProps {
    onDialpadClick?: () => void;
    onContactsClick?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onDialpadClick, onContactsClick }) => {
    // Placeholder actions

    return (
        <div className="bg-[#111818] dark:bg-deep-void min-h-screen flex items-center justify-center font-display overflow-hidden relative">
            {/* Background Ambiance */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-secondary-accent/20 rounded-full blur-[120px]"></div>
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"></div>
            </div>

            {/* Main Dashboard Window */}
            <main className="relative w-full max-w-[400px] h-[640px] flex flex-col glass-panel rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/5">
                <DashboardHeader />

                {/* Body Content */}
                <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
                    <ActionButtons onDialpadClick={onDialpadClick} onContactsClick={onContactsClick} />
                    <LiveConsole />
                    <QuickStats />
                </div>

                <DashboardFooter />
            </main>
        </div>
    );
};
