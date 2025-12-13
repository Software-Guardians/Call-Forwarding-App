import React, { createContext, useContext, useState, useCallback } from 'react';

export type LogType = 'info' | 'success' | 'warning' | 'error' | 'bluetooth';

export interface LogEntry {
    id: string;
    timestamp: Date;
    message: string;
    type: LogType;
}

interface LogContextType {
    logs: LogEntry[];
    addLog: (message: string, type?: LogType) => void;
    clearLogs: () => void;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

export const LogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [logs, setLogs] = useState<LogEntry[]>([]);

    const addLog = useCallback((message: string, type: LogType = 'info') => {
        const newLog: LogEntry = {
            id: crypto.randomUUID(),
            timestamp: new Date(),
            message,
            type,
        };
        setLogs(prev => [...prev.slice(-99), newLog]); // Keep last 100 logs
    }, []);

    const clearLogs = useCallback(() => {
        setLogs([]);
    }, []);

    return (
        <LogContext.Provider value={{ logs, addLog, clearLogs }}>
            {children}
        </LogContext.Provider>
    );
};

export const useLog = () => {
    const context = useContext(LogContext);
    if (context === undefined) {
        throw new Error('useLog must be used within a LogProvider');
    }
    return context;
};
