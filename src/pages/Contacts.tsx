import React from 'react';
import { ContactsSidebar } from '../components/contacts/ContactsSidebar';
import { ContactsHeader } from '../components/contacts/ContactsHeader';
import { ContactsGrid } from '../components/contacts/ContactsGrid';

interface ContactsPageProps {
    onNavigate: (view: 'dashboard' | 'contacts' | 'dialer' | 'settings') => void;
    onCallStart: (name: string) => void;
}

export const Contacts: React.FC<ContactsPageProps> = ({ onNavigate, onCallStart }) => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-200 font-display overflow-hidden h-screen w-full flex selection:bg-primary selection:text-black">
            <ContactsSidebar onNavigate={onNavigate} />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative h-full min-w-0">
                {/* Background Decor */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

                <ContactsHeader />
                <ContactsGrid onCall={onCallStart} />
            </main>
        </div>
    );
};
