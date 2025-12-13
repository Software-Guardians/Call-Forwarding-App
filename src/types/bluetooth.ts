// Basic device info
export interface BluetoothDevice {
    name: string;
    address: string;
    device_type: string; // "phone", "computer", "other"
}

export type ConnectionState = 'IDLE' | 'SCANNING' | 'CONNECTING' | 'CONNECTED' | 'FAILED';

export type BluetoothCallState = 'IDLE' | 'RINGING' | 'ACTIVE' | 'DIALING' | 'ENDED';

export interface CallInfo {
    name?: string;
    number?: string;
}

export interface Contact {
    name: string;
    phoneNumber: string;
}

export interface BluetoothState {
    connectionState: ConnectionState;
    availableDevices: BluetoothDevice[];
    connectedDevice: BluetoothDevice | null;
    error: string | null;
    callState: BluetoothCallState;
    callInfo: CallInfo | null;
}
