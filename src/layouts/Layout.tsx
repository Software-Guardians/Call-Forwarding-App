import React from 'react';
import { GlobalHeader } from '../components/layout/GlobalHeader';
import { GlobalSidebar } from '../components/layout/GlobalSidebar';

interface LayoutProps {
    children: React.ReactNode;
    currentView: string;
    onNavigate: (view: 'dashboard' | 'contacts' | 'dialer' | 'settings') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
    return (
        <div className="flex w-full h-screen overflow-hidden bg-gray-100 dark:bg-background-dark text-slate-900 dark:text-white selection:bg-primary selection:text-black relative transition-colors duration-300">
            {/* Global Background Effects (Dark Mode Only) */}
            <div className="hidden dark:block fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#1f2937 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <div className="hidden dark:block fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-background-dark/80 to-background-dark"></div>

            <GlobalSidebar currentView={currentView} onNavigate={onNavigate} />
            <div className="flex-1 relative flex flex-col min-w-0 overflow-hidden z-10">
                <GlobalHeader />
                {children}
            </div>
        </div>
    );
};
