import React from 'react';

interface GlobalSidebarProps {
    currentView: string;
    onNavigate: (view: 'dashboard' | 'contacts' | 'dialer' | 'settings') => void;
}

export const GlobalSidebar: React.FC<GlobalSidebarProps> = ({ currentView, onNavigate }) => {

    // Helper to determine active class
    const getLinkClass = (viewName: string) => {
        const isActive = currentView === viewName;
        if (isActive) {
            return "group flex items-center gap-4 px-3 py-3 rounded-lg bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,240,255,0.1)] w-full text-left";
        }
        return "group flex items-center gap-4 px-3 py-3 rounded-lg text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/5 transition-all w-full text-left font-medium";
    };

    const getIconClass = (viewName: string) => {
        const isActive = currentView === viewName;
        return isActive ? "material-symbols-outlined font-bold" : "material-symbols-outlined text-slate-500 dark:text-inherit group-hover:text-primary transition-colors";
    };

    const getTextClass = (viewName: string) => {
        const isActive = currentView === viewName;
        return isActive ? "hidden lg:block text-sm font-bold tracking-wide" : "hidden lg:block text-sm font-medium tracking-wide";
    };


    return (
        <aside className="w-20 lg:w-64 h-full flex flex-col border-r border-gray-300 dark:border-white/5 bg-white dark:bg-[#080c10] z-20 transition-all duration-300 shrink-0 shadow-sm dark:shadow-none">
            {/* Logo Area */}
            <div className="h-24 flex items-center gap-3 px-6 border-b border-gray-300 dark:border-white/5">
                <div className="relative flex items-center justify-center shrink-0 animate-pulse">
                    <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full"></div>
                    <div className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 relative z-10 border border-primary/50" data-alt="Abstract neon geometric logo" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4KhpL_y0-IGmnPZ7lZvnq913DvnQKgvAqdkNcnHIYPC3dBhxt5JUf--opgQ2V45BHmRYZAxLacz5Tb9a0ChT4qxpOP0mn1XScB8FrMMYXEEUcN4nXwpwnnGe5u-Ooaeev3GBS1NINx7xbSuBtZcvw5bDruoFGPmhFhIq0lvJz6LMT5cOwizejI-UviTuiXdd_9PGDUDgj4y6_p409PDULrpud7ofOeHte4koDpDQzZRWi4ZizTlRoJtvW3Hb2Ogidtct4EQRnvBci")' }}></div>
                </div>
                <div className="hidden lg:flex flex-col">
                    <h1 className="text-slate-900 dark:text-white text-base font-black tracking-widest leading-none text-glow">AURA LINK</h1>
                    <p className="text-primary text-[10px] font-mono mt-1">V.2.0.77 ONLINE</p>
                </div>
            </div>
            {/* Nav Links */}
            <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
                <button
                    onClick={() => onNavigate('dashboard')}
                    className={getLinkClass('dashboard')}
                >
                    <span className={getIconClass('dashboard')}>dashboard</span>
                    <span className={getTextClass('dashboard')}>DASHBOARD</span>
                </button>

                <button
                    onClick={() => onNavigate('contacts')}
                    className={getLinkClass('contacts')}
                >
                    <span className={getIconClass('contacts')}>contacts</span>
                    <span className={getTextClass('contacts')}>CONTACTS</span>
                </button>

                <button
                    onClick={() => onNavigate('dialer')}
                    className={getLinkClass('dialer')}
                >
                    <span className={getIconClass('dialer')}>dialpad</span>
                    <span className={getTextClass('dialer')}>KEYPAD</span>
                </button>

                <button className="group flex items-center gap-4 px-3 py-3 rounded-lg text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/5 transition-all w-full text-left font-medium">
                    <span className="material-symbols-outlined text-slate-500 dark:text-inherit group-hover:text-primary transition-colors">history</span>
                    <span className="hidden lg:block text-sm font-medium tracking-wide">HISTORY</span>
                </button>

                <div className="flex-1"></div> {/* Spacer */}

                <button
                    onClick={() => onNavigate('settings')}
                    className={getLinkClass('settings').replace('text-primary', 'text-secondary').replace('border-primary/20', 'border-secondary/20').replace('bg-primary/10', 'bg-secondary/10').replace('shadow-[0_0_15px_rgba(0,240,255,0.1)]', 'shadow-[0_0_15px_rgba(188,19,254,0.1)]')}
                >
                    <span className={currentView === 'settings' ? "material-symbols-outlined text-secondary" : "material-symbols-outlined group-hover:text-secondary transition-colors"}>settings</span>
                    <span className={getTextClass('settings')}>SYSTEM</span>
                </button>
            </nav>
        </aside>
    );
};
