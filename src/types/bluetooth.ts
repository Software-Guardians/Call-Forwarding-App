export interface BluetoothDevice {
    name: string;
    address: string;
    device_type: 'phone' | 'computer' | 'headset' | 'other';
}

export type ConnectionState = 'IDLE' | 'SCANNING' | 'CONNECTING' | 'CONNECTED' | 'FAILED';

export interface BluetoothState {
    connectionState: ConnectionState;
    availableDevices: BluetoothDevice[];
    connectedDevice: BluetoothDevice | null;
    error: string | null;
}
