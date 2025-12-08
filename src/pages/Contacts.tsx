import React, { useState, useRef, useEffect } from 'react';
import { ContactsGrid } from '../components/contacts/ContactsGrid';

interface ContactsPageProps {
    onCallStart: (name: string) => void;
}

export const Contacts: React.FC<ContactsPageProps> = ({ onCallStart }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    return (
        <div className="text-slate-900 dark:text-slate-200 font-display overflow-hidden h-full w-full flex selection:bg-primary selection:text-black">
            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative h-full min-w-0">
                <ContactsGrid onCall={onCallStart} />

                {/* Floating Search Button */}
                <div
                    ref={searchRef}
                    className={`absolute bottom-8 right-8 flex items-center bg-slate-900 dark:bg-primary text-white dark:text-black rounded-full shadow-lg transition-all duration-300 ease-in-out border border-white/10 ${isSearchOpen ? 'w-80 px-4' : 'w-14 h-14 justify-center hover:scale-105 active:scale-95'}`}
                >
                    {isSearchOpen ? (
                        <div className="flex items-center w-full gap-2">
                            <span className="material-symbols-outlined text-gray-400 dark:text-black/60">search</span>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search contacts..."
                                className="bg-transparent border-none outline-none text-sm w-full text-white dark:text-black placeholder-gray-500 dark:placeholder-black/50 font-mono"
                            />
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="w-full h-full flex items-center justify-center cursor-pointer outline-none"
                        >
                            <span className="material-symbols-outlined text-2xl">search</span>
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
};
