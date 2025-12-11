import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { BluetoothDevice, ConnectionState, BluetoothCallState, CallInfo } from '../types/bluetooth';

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
    cancelScan: () => void;
    resetState: () => void;
}

const BluetoothContext = createContext<BluetoothContextType | undefined>(undefined);

export const BluetoothProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [connectionState, setConnectionState] = useState<ConnectionState>('IDLE');
    const [availableDevices, setAvailableDevices] = useState<BluetoothDevice[]>([]);
    const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [callState, setCallState] = useState<BluetoothCallState>('IDLE');
    const [callInfo, setCallInfo] = useState<CallInfo | null>(null);

    // Filter duplicates helper
    const addUniqueDevice = useCallback((device: BluetoothDevice) => {
        setAvailableDevices(prev => {
            if (prev.some(d => d.address === device.address)) return prev;
            return [...prev, device];
        });
    }, []);

    // Listen for Found Devices
    useEffect(() => {
        const unlistenDeviceFound = listen<BluetoothDevice>('bluetooth-device-found', (event) => {
            console.log("Device Found:", event.payload);
            addUniqueDevice(event.payload);
        });

        const unlistenCallState = listen<CallStatePayload>('call-state-update', (event) => {
            console.log("Call State Update:", event.payload);
            const { state, number } = event.payload;

            // Map Backend State to Frontend State
            // Backend: IDLE, RINGING, ACTIVE
            if (state === 'RINGING') {
                setCallState('RINGING');
                setCallInfo({ number, name: 'Incoming Call' }); // Name resolution can happen here if contacts are known
            } else if (state === 'ACTIVE') {
                setCallState('ACTIVE');
                if (callState === 'IDLE') {
                    // If moving from IDLE to ACTIVE without RINGING (e.g. outgoing or missed start), ensure info exists
                    setCallInfo(prev => prev || { number, name: 'Unknown' });
                }
            } else if (state === 'IDLE') {
                setCallState('IDLE');
                setCallInfo(null);
            }
        });

        return () => {
            unlistenDeviceFound.then(u => u());
            unlistenCallState.then(u => u());
        };
    }, [addUniqueDevice, callState]);

    const startScan = useCallback(async () => {
        try {
            setConnectionState('SCANNING');
            setError(null);
            setAvailableDevices([]); // Clear list on new scan
            await invoke('start_scan');
            // Scan continues async...
        } catch (err) {
            console.error('Scan failed:', err);
            setError('Failed to start scan');
            setConnectionState('FAILED');
        }
    }, []);

    const connectToDevice = useCallback(async (device: BluetoothDevice) => {
        try {
            setConnectionState('CONNECTING');
            setError(null);
            console.log(`Connecting to ${device.name} [${device.address}]`);

            await invoke('connect_device', { address: device.address });

            setConnectedDevice(device);
            setConnectionState('CONNECTED');
        } catch (err) {
            console.error('Connection failed:', err);
            setError(`Failed to connect to ${device.name}`);
            setConnectionState('FAILED');
        }
    }, []);

    const resetState = useCallback(() => {
        setConnectionState('IDLE');
        setError(null);
        setAvailableDevices([]);
    }, []);

    const cancelScan = useCallback(() => {
        if (connectedDevice) {
            setConnectionState('CONNECTED');
        } else {
            setConnectionState('IDLE');
        }
    }, [connectedDevice]);

    const answerCall = useCallback(async () => {
        try {
            await invoke('send_command', { action: 'ANSWER' });
        } catch (e) {
            console.error("Failed to answer", e);
        }
    }, []);

    const rejectCall = useCallback(async () => {
        try {
            await invoke('send_command', { action: 'REJECT' });
            // Optimistically set IDLE? Better wait for event.
        } catch (e) {
            console.error("Failed to reject", e);
        }
    }, []);

    const endCall = useCallback(async () => {
        try {
            await invoke('send_command', { action: 'END' });
        } catch (e) {
            console.error("Failed to end call", e);
        }
    }, []);

    const startCall = useCallback(async (number: string) => {
        try {
            await invoke('send_command', { action: 'DIAL', number });
            setCallState('DIALING');
            setCallInfo({ number, name: 'Dialing...' });
        } catch (e) {
            console.error("Failed to dial", e);
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
