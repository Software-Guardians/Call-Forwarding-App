import { useState, useEffect, useCallback } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { BluetoothDevice, ConnectionState } from '../types/bluetooth';

export const useBluetooth = () => {
    const [connectionState, setConnectionState] = useState<ConnectionState>('IDLE');
    const [availableDevices, setAvailableDevices] = useState<BluetoothDevice[]>([]);
    const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Filter duplicates helper
    const addUniqueDevice = (device: BluetoothDevice) => {
        setAvailableDevices(prev => {
            if (prev.some(d => d.address === device.address)) return prev;
            return [...prev, device];
        });
    };

    // Listen for Found Devices
    useEffect(() => {
        const unlistenPromise = listen<BluetoothDevice>('bluetooth-device-found', (event) => {
            console.log("Device Found:", event.payload);
            addUniqueDevice(event.payload);
        });

        return () => {
            unlistenPromise.then(unlisten => unlisten());
        };
    }, []);

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
        // Optionally invoke 'stop_scan' backend if it existed, but for now just UI state revert.
    }, [connectedDevice]);

    return {
        connectionState,
        availableDevices,
        connectedDevice,
        error,
        startScan,
        connectToDevice,
        resetState,
        cancelScan
    };
};
