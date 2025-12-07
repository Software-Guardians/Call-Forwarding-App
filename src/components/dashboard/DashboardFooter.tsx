import React from 'react';

export const DashboardFooter: React.FC = () => {
    return (
        <footer className="p-4 border-t border-white/5 bg-black/40 flex items-center justify-between text-xs text-gray-500">
            <button className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">settings</span>
                <span>Settings</span>
            </button>
            <div className="flex items-center gap-2 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-accent"></span>
                <span>v1.2.0-stable</span>
            </div>
        </footer>
    );
};
