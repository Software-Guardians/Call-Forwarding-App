import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { BluetoothDevice, ConnectionState, BluetoothCallState, CallInfo } from '../types/bluetooth';
import { useLog } from './LogContext';

interface CallStatePayload {
    state: string; // IDLE, RINGING, ACTIVE
    number?: string;
}

interface BluetoothContextType {
    connectionState: ConnectionState;
    availableDevices: BluetoothDevice[];
    connectedDevice: BluetoothDevice | null;
    error: string | null;

    // Call Logic
    callState: BluetoothCallState;
    callInfo: CallInfo | null;
    answerCall: () => void;
    rejectCall: () => void;
    endCall: () => void;
    startCall: (number: string) => void;

    startScan: () => void;
    connectToDevice: (device: BluetoothDevice) => void;
    disconnect: () => void;
    cancelScan: () => void;
    resetState: () => void;
}

const BluetoothContext = createContext<BluetoothContextType | undefined>(undefined);

export const BluetoothProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [connectionState, setConnectionState] = useState<ConnectionState>('IDLE');
    const [availableDevices] = useState<BluetoothDevice[]>([]);
    const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [callState, setCallState] = useState<BluetoothCallState>('IDLE');
    const [callInfo, setCallInfo] = useState<CallInfo | null>(null);
    const { addLog } = useLog();



    interface ConnectionStateEvent {
        state: string;
        device_name?: string;
        device_address?: string;
    }

    // Listen for Backend Events
    useEffect(() => {
        // Handle Connection State Updates from Background Server
        const unlistenConnectionState = listen<ConnectionStateEvent>('connection-state', (event) => {
            console.log("Connection State Update:", event.payload);
            const { state, device_name, device_address } = event.payload;

            if (state === 'connected') {
                setConnectionState('CONNECTED');
                setConnectedDevice({
                    name: device_name || 'Unknown Device',
                    address: device_address || 'Unknown',
                    device_type: 'phone'
                });
                setError(null);
                addLog(`Device Connected: ${device_name || 'Unknown'}`, 'success');
            } else if (state === 'disconnected') {
                setConnectionState('IDLE'); // Or back to Waiting
                setConnectedDevice(null);
                addLog('Device Disconnected', 'warning');
            }
        });

        const unlistenCallState = listen<CallStatePayload>('call-state-update', (event) => {
            console.log("Call State Update:", event.payload);
            const { state, number } = event.payload;

            // Map Backend State to Frontend State
            if (state === 'RINGING') {
                setCallState('RINGING');
                setCallInfo({ number, name: 'Incoming Call' });
                addLog(`Incoming Call: ${number || 'Unknown'}`, 'bluetooth');
            } else if (state === 'ACTIVE') {
                setCallState('ACTIVE');
                if (callState === 'IDLE') {
                    setCallInfo(prev => prev || { number, name: 'Unknown' });
                }
                addLog('Call Active', 'success');
            } else if (state === 'IDLE') {
                setCallState('IDLE');
                setCallInfo(null);
                addLog('Call Ended / Idle', 'info');
            }
        });

        return () => {
            unlistenConnectionState.then(u => u());
            unlistenCallState.then(u => u());
        };
    }, [callState]);

    // Deprecated / Stubbed methods for compatibility
    const startScan = useCallback(async () => {
        console.log("Scan requested but PC is in Server Mode (Passive).");
    }, []);

    const connectToDevice = useCallback(async (_device: BluetoothDevice) => {
        console.log("Manual connect requested but PC is in Server Mode (Passive).");
    }, []);

    const cancelScan = useCallback(() => { }, []);
    const resetState = useCallback(() => { }, []);

    const answerCall = useCallback(async () => {
        try {
            await invoke('send_command', { action: 'ANSWER' });
        } catch (e) {
            console.error("Failed to answer", e);
            addLog(`Failed to answer call: ${e}`, 'error');
        }
    }, []);

    const rejectCall = useCallback(async () => {
        try {
            await invoke('send_command', { action: 'REJECT' });
        } catch (e) {
            console.error("Failed to reject", e);
            addLog(`Failed to reject call: ${e}`, 'error');
        }
    }, []);

    const endCall = useCallback(async () => {
        try {
            await invoke('send_command', { action: 'END' });
        } catch (e) {
            console.error("Failed to end call", e);
            addLog(`Failed to end call: ${e}`, 'error');
        }
    }, []);

    const startCall = useCallback(async (number: string) => {
        try {
            await invoke('send_command', { action: 'DIAL', number });
            setCallState('DIALING');
            setCallInfo({ number, name: 'Dialing...' });
            addLog(`Dialing: ${number}`, 'bluetooth');
        } catch (e) {
            console.error("Failed to dial", e);
            addLog(`Failed to dial: ${e}`, 'error');
        }
    }, []);

    return (
        <BluetoothContext.Provider value={{
            connectionState,
            availableDevices,
            connectedDevice,
            error,
            startScan,
            connectToDevice,
            disconnect: async () => {
                try {
                    await invoke('disconnect_device');
                    addLog('Disconnecting device...', 'info');
                } catch (e) {
                    console.error("Failed to disconnect", e);
                    addLog(`Failed to disconnect: ${e}`, 'error');
                }
            },
            cancelScan,
            resetState,
            callState,
            callInfo,
            answerCall,
            rejectCall,
            endCall,
            startCall
        }}>
            {children}
        </BluetoothContext.Provider>
    );
};

export const useBluetooth = () => {
    const context = useContext(BluetoothContext);
    if (context === undefined) {
        throw new Error('useBluetooth must be used within a BluetoothProvider');
    }
    return context;
};
