import { useState, useEffect } from 'react';
import { listen } from '@tauri-apps/api/event';

export type CallState = 'IDLE' | 'RINGING' | 'ACTIVE';

export interface CallStatePayload {
    state: CallState;
    number?: string;
}

export const useCallState = () => {
    const [callState, setCallState] = useState<CallState>('IDLE');
    const [callerNumber, setCallerNumber] = useState<string | undefined>(undefined);

    useEffect(() => {
        const unlisten = listen<CallStatePayload>('call-state-update', (event) => {
            console.log('Call State Update Received:', event.payload);
            setCallState(event.payload.state);
            setCallerNumber(event.payload.number);
        });

        return () => {
            unlisten.then((f) => f());
        };
    }, []);

    return {
        callState,
        callerNumber,
    };
};
