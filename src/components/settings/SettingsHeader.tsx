import React from 'react';

interface SettingsHeaderProps { }

export const SettingsHeader: React.FC<SettingsHeaderProps> = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-300 dark:border-white/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
            <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="size-8 flex items-center justify-center rounded bg-primary/20 border border-primary/40 text-primary shadow-neon">
                        <span className="material-symbols-outlined text-xl">hub</span>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-slate-900 dark:text-white text-base font-bold tracking-widest leading-none">AURA LINK</h2>
                        <span className="text-xs font-mono text-primary/70 tracking-tight">SYSTEM CONFIG // v2.4.0</span>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-1">
                    {/* Navigation removed in favor of global sidebar */}
                </div>
                <div className="flex items-center gap-4">
                    <button className="relative group flex items-center justify-center size-9 rounded-full bg-gray-100 dark:bg-surface-dark border border-gray-300 dark:border-white/10 hover:border-primary/50 transition-all">
                        <span className="material-symbols-outlined text-slate-500 dark:text-gray-400 group-hover:text-primary text-xl">notifications</span>
                        <span className="absolute top-0 right-0 size-2 bg-secondary rounded-full border-2 border-white dark:border-background-dark"></span>
                    </button>
                    <div className="h-9 w-px bg-gray-300 dark:bg-white/10 mx-1"></div>
                    <div className="flex items-center gap-3 pl-2">
                        <div className="text-right hidden sm:block">
                            <div className="text-xs font-bold text-slate-900 dark:text-white">ADM_USER</div>
                            <div className="text-[10px] font-mono text-emerald-500 dark:text-emerald-400">ONLINE</div>
                        </div>
                        <div className="bg-center bg-no-repeat bg-cover rounded-md size-9 border border-white/20 shadow-lg" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCA0q1YLQMl8mCC_jxAqGrlqZOcji4aPhDuHI2CYQnWZ9Nhkmr6t77EjofbQaVz0J67Jd8uI4d4ok2xaMwboH749tpCh_uJUIlxBj6gd7Itv7K0VTaKfuMJPIEbgSjn4oKXVBlXcM-e5NAj0R7b6bckWViREm1HSKFOgUJWcYzYBzmeonVBL5TLtvCcKEnBET2kuYuuBrifOhOKIfx2oovQacwO-nx8YMqNxTHemjlrCZqsXvp2f6e2EwR1BQ3xI2Awh5nXfSHZg2JX")' }}></div>
                    </div>
                </div>
            </div>
        </header>
    );
};
