import React, { useState } from 'react';
import { DialerHeader } from '../components/dialer/DialerHeader';
import { DialerDisplay } from '../components/dialer/DialerDisplay';
import { DialerKeypad } from '../components/dialer/DialerKeypad';
import { DialerActions } from '../components/dialer/DialerActions';
import { DialerFooter } from '../components/dialer/DialerFooter';

interface DialerPageProps { }

export const Dialer: React.FC<DialerPageProps> = () => {
    const [number, setNumber] = useState('(555) 867-5309'); // Default value from template

    const handleKeyPress = (key: string) => {
        setNumber(prev => prev + key);
    };

    const handleBackspace = () => {
        setNumber(prev => prev.slice(0, -1));
    };

    return (
        <div className="text-slate-900 dark:text-white font-body selection:bg-primary selection:text-black overflow-x-hidden h-full flex flex-col relative">
            {/* Main Content Wrapper */}
            <div className="relative z-10 flex h-full grow flex-col">
                <DialerHeader />

                {/* Main Workspace */}
                <main className="flex-1 flex justify-center items-center py-8 px-4">
                    <div className="w-full max-w-[420px] glass-panel rounded-3xl p-1 flex flex-col relative overflow-hidden group">
                        {/* Decorative Corner Accents */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/50 rounded-tl-2xl z-20"></div>
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/50 rounded-tr-2xl z-20"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/50 rounded-bl-2xl z-20"></div>
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/50 rounded-br-2xl z-20"></div>

                        {/* Inner Content Container */}
                        <div className="bg-slate-900 dark:bg-background-dark/90 rounded-[20px] flex flex-col h-full border border-slate-800 dark:border-white/5 relative z-10 p-6 shadow-md dark:shadow-inner transition-colors duration-300">
                            <DialerDisplay value={number} onBackspace={handleBackspace} />
                            <DialerKeypad onKeyPress={handleKeyPress} />
                            <DialerActions />
                        </div>
                    </div>
                </main>

                <DialerFooter />
            </div>
        </div>
    );
};
