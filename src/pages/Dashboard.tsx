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

import { useCallState } from '../hooks/useCallState';
import { useBluetooth } from '../hooks/useBluetooth';
import { IncomingCallOverlay } from '../components/overlays/IncomingCallOverlay';
export const Dashboard: React.FC<DashboardProps> = ({ onDialpadClick, onContactsClick, onSimulateIncomingCall }) => {
    const { callState, callerNumber } = useCallState();
    const bluetooth = useBluetooth();

    // No manual connection logic needed (Server Mode)

    return (
        <div className="h-full flex items-center justify-center font-display overflow-hidden relative">
            {/* Main Dashboard Window */}
            <main className="relative w-full max-w-[400px] h-[640px] flex flex-col bg-slate-900 dark:bg-transparent dark:glass-panel rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/5 text-white">

                {/* Overlays */}
                {callState === 'RINGING' && (
                    <IncomingCallOverlay callerNumber={callerNumber} />
                )}

                <DashboardHeader
                    connectionState={bluetooth.connectionState}
                    deviceName={bluetooth.connectedDevice?.name}
                />

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
