import React from 'react';

interface SettingsHeaderProps {
    onNavigate: (view: 'dashboard' | 'contacts' | 'settings') => void;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({ onNavigate }) => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md">
            <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="size-8 flex items-center justify-center rounded bg-primary/20 border border-primary/40 text-primary shadow-neon">
                        <span className="material-symbols-outlined text-xl">hub</span>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-white text-base font-bold tracking-widest leading-none">AURA LINK</h2>
                        <span className="text-xs font-mono text-primary/70 tracking-tight">SYSTEM CONFIG // v2.4.0</span>
                    </div>
                </div>
                <nav className="hidden md:flex items-center gap-1">
                    <button
                        onClick={() => onNavigate('dashboard')}
                        className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-colors tracking-wide"
                    >
                        DASHBOARD
                    </button>
                    <button className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-colors tracking-wide">
                        CALL LOGS
                    </button>
                    <button
                        onClick={() => onNavigate('contacts')}
                        className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-colors tracking-wide"
                    >
                        CONTACTS
                    </button>
                    <button className="relative px-4 py-2 text-xs font-bold text-primary transition-colors tracking-wide bg-primary/5 rounded border border-primary/20 shadow-neon">
                        SETTINGS
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_#0de7f2]"></span>
                    </button>
                </nav>
                <div className="flex items-center gap-4">
                    <button className="relative group flex items-center justify-center size-9 rounded-full bg-surface-dark border border-white/10 hover:border-primary/50 transition-all">
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-xl">notifications</span>
                        <span className="absolute top-0 right-0 size-2 bg-secondary rounded-full border-2 border-background-dark"></span>
                    </button>
                    <div className="h-9 w-px bg-white/10 mx-1"></div>
                    <div className="flex items-center gap-3 pl-2">
                        <div className="text-right hidden sm:block">
                            <div className="text-xs font-bold text-white">ADM_USER</div>
                            <div className="text-[10px] font-mono text-emerald-400">ONLINE</div>
                        </div>
                        <div className="bg-center bg-no-repeat bg-cover rounded-md size-9 border border-white/20 shadow-lg" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCA0q1YLQMl8mCC_jxAqGrlqZOcji4aPhDuHI2CYQnWZ9Nhkmr6t77EjofbQaVz0J67Jd8uI4d4ok2xaMwboH749tpCh_uJUIlxBj6gd7Itv7K0VTaKfuMJPIEbgSjn4oKXVBlXcM-e5NAj0R7b6bckWViREm1HSKFOgUJWcYzYBzmeonVBL5TLtvCcKEnBET2kuYuuBrifOhOKIfx2oovQacwO-nx8YMqNxTHemjlrCZqsXvp2f6e2EwR1BQ3xI2Awh5nXfSHZg2JX")' }}></div>
                    </div>
                </div>
            </div>
        </header>
    );
};
