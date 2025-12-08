import React from 'react';
import { ContactsHeader } from '../components/contacts/ContactsHeader';
import { ContactsGrid } from '../components/contacts/ContactsGrid';

interface ContactsPageProps {
    onCallStart: (name: string) => void;
}

export const Contacts: React.FC<ContactsPageProps> = ({ onCallStart }) => {
    return (
        <div className="text-slate-900 dark:text-slate-200 font-display overflow-hidden h-full w-full flex selection:bg-primary selection:text-black">
            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative h-full min-w-0">
                <ContactsHeader />
                <ContactsGrid onCall={onCallStart} />
            </main>
        </div>
    );
};
