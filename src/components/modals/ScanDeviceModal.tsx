import React, { useEffect } from 'react';
import { BluetoothDevice, ConnectionState } from '../../types/bluetooth';
import { Smartphone, Laptop, Monitor, Bluetooth, X, Loader2, Wifi } from 'lucide-react';

interface ScanDeviceModalProps {
    isOpen: boolean;
    onClose: () => void;
    connectionState: ConnectionState;
    availableDevices: BluetoothDevice[];
    startScan: () => void;
    connectToDevice: (device: BluetoothDevice) => void;
    error: string | null;
}

const DeviceIcon = ({ type }: { type: string }) => {
    switch (type.toLowerCase()) {
        case 'phone': return <Smartphone className="w-5 h-5 text-purple-400" />;
        case 'computer': return <Laptop className="w-5 h-5 text-blue-400" />;
        case 'headset': return <Monitor className="w-5 h-5 text-green-400" />; // approximating for now
        default: return <Bluetooth className="w-5 h-5 text-slate-400" />;
    }
};

const ScanDeviceModal: React.FC<ScanDeviceModalProps> = ({
    isOpen,
    onClose,
    connectionState,
    availableDevices,
    startScan,
    connectToDevice,
    error
}) => {
    // Auto-start scan when modal opens
    useEffect(() => {
        if (isOpen && connectionState === 'IDLE') {
            startScan();
        }
    }, [isOpen, connectionState, startScan]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-[450px] bg-slate-900/90 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">

                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Wifi className="w-5 h-5 text-purple-400" />
                        Connect Device
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 min-h-[300px] flex flex-col">

                    {/* Status Bar */}
                    <div className="mb-4 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            {connectionState === 'SCANNING' && <Loader2 className="w-4 h-4 animate-spin text-purple-400" />}
                            <span className="text-slate-300">
                                {connectionState === 'SCANNING' ? 'Scanning for Android phones...' :
                                    connectionState === 'CONNECTING' ? 'Connecting...' :
                                        'Ready to pair'}
                            </span>
                        </div>
                        {connectionState !== 'SCANNING' && connectionState !== 'CONNECTING' && (
                            <button
                                onClick={startScan}
                                className="text-xs text-purple-400 hover:text-purple-300 font-medium underline"
                            >
                                Rescan
                            </button>
                        )}
                    </div>

                    {/* Device List */}
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                        {availableDevices.length === 0 && connectionState === 'SCANNING' && (
                            <div className="flex flex-col items-center justify-center h-40 text-slate-500 gap-2">
                                <Loader2 className="w-8 h-8 animate-spin opacity-50" />
                                <span className="text-xs">Searching for devices...</span>
                            </div>
                        )}

                        {availableDevices.length === 0 && connectionState !== 'SCANNING' && (
                            <div className="flex flex-col items-center justify-center h-40 text-slate-500">
                                <span className="text-sm">No devices found.</span>
                                <span className="text-xs opacity-70">Make sure your phone is discoverable.</span>
                            </div>
                        )}

                        {availableDevices.map((device) => (
                            <button
                                key={device.address}
                                onClick={() => connectToDevice(device)}
                                disabled={connectionState === 'CONNECTING'}
                                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 active:bg-purple-500/20 border border-transparent hover:border-purple-500/30 transition-all group text-left"
                            >
                                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-purple-900/30 transition-colors">
                                    <DeviceIcon type={device.device_type} />
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-slate-200 group-hover:text-white truncate">
                                        {device.name}
                                    </div>
                                    <div className="text-xs text-slate-500 font-mono">
                                        {device.address}
                                    </div>
                                </div>
                                {connectionState === 'CONNECTING' && (
                                    <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                                )}
                            </button>
                        ))}
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-xs text-center">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScanDeviceModal;
