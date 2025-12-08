import React from 'react';

interface ContactsSidebarProps {
    currentView?: string;
    onNavigate: (view: 'dashboard' | 'contacts' | 'dialer' | 'settings') => void;
}

export const ContactsSidebar: React.FC<ContactsSidebarProps> = ({ onNavigate }) => {

    // Helper to determine active state (visual only for now based on template hardcoded "Contacts")
    // In strict port, the "Contacts" link has special styling (lines 91-94)
    // I will adhere to the styling but make it conditional if possible, or stick to strict template visuals.
    // The template has "DASHBOARD" as slate-400 and "CONTACTS" as primary/10. 
    // I will implement the clicks.

    return (
        <aside className="w-20 lg:w-64 h-full flex flex-col border-r border-white/5 bg-[#080c10] z-20 transition-all duration-300 shrink-0">
            {/* Logo Area */}
            <div className="h-24 flex items-center gap-3 px-6 border-b border-white/5">
                <div className="relative flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full"></div>
                    <div className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 relative z-10 border border-primary/50" data-alt="Abstract neon geometric logo" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4KhpL_y0-IGmnPZ7lZvnq913DvnQKgvAqdkNcnHIYPC3dBhxt5JUf--opgQ2V45BHmRYZAxLacz5Tb9a0ChT4qxpOP0mn1XScB8FrMMYXEEUcN4nXwpwnnGe5u-Ooaeev3GBS1NINx7xbSuBtZcvw5bDruoFGPmhFhIq0lvJz6LMT5cOwizejI-UviTuiXdd_9PGDUDgj4y6_p409PDULrpud7ofOeHte4koDpDQzZRWi4ZizTlRoJtvW3Hb2Ogidtct4EQRnvBci")' }}></div>
                </div>
                <div className="hidden lg:flex flex-col">
                    <h1 className="text-white text-base font-black tracking-widest leading-none text-glow">AURA LINK</h1>
                    <p className="text-primary text-[10px] font-mono mt-1">V.2.0.77 ONLINE</p>
                </div>
            </div>
            {/* Nav Links */}
            <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
                <button
                    onClick={() => onNavigate('dashboard')}
                    className={`group flex items-center gap-4 px-3 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all w-full text-left`}
                >
                    <span className="material-symbols-outlined group-hover:text-primary transition-colors">dashboard</span>
                    <span className="hidden lg:block text-sm font-medium tracking-wide">DASHBOARD</span>
                </button>

                <button
                    onClick={() => onNavigate('contacts')}
                    className={`group flex items-center gap-4 px-3 py-3 rounded-lg bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,240,255,0.1)] w-full text-left`}
                >
                    <span className="material-symbols-outlined">contacts</span>
                    <span className="hidden lg:block text-sm font-bold tracking-wide">CONTACTS</span>
                </button>

                <button
                    onClick={() => onNavigate('dialer')}
                    className={`group flex items-center gap-4 px-3 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all w-full text-left`}
                >
                    <span className="material-symbols-outlined group-hover:text-primary transition-colors">dialpad</span>
                    <span className="hidden lg:block text-sm font-medium tracking-wide">KEYPAD</span>
                </button>

                <button className={`group flex items-center gap-4 px-3 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all w-full text-left`}>
                    <span className="material-symbols-outlined group-hover:text-primary transition-colors">history</span>
                    <span className="hidden lg:block text-sm font-medium tracking-wide">HISTORY</span>
                </button>

                <div className="flex-1"></div> {/* Spacer */}

                <button
                    onClick={() => onNavigate('settings')}
                    className={`group flex items-center gap-4 px-3 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all w-full text-left`}
                >
                    <span className="material-symbols-outlined group-hover:text-secondary transition-colors">settings</span>
                    <span className="hidden lg:block text-sm font-medium tracking-wide">SYSTEM</span>
                </button>
            </nav>
        </aside>
    );
};
