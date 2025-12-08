import React from 'react';

export interface ContactData {
    id: string;
    name: string;
    phone: string;
    image: string;
    statusColor: string; // 'bg-green-500', 'bg-red-500', 'bg-slate-500', etc.
    theme?: 'primary' | 'secondary';
}

interface ContactCardProps {
    contact: ContactData;
    onCall: () => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact, onCall }) => {
    const isSecondary = contact.theme === 'secondary';

    return (
        <div className={`group relative bg-[#0e151a]/60 hover:bg-[#0e151a] border border-white/5 ${isSecondary ? 'hover:border-secondary/50' : 'hover:border-primary/50'} transition-all duration-300 rounded-xl p-4 flex items-center justify-between overflow-hidden`}>
            {/* Hover Glow Effect */}
            <div className={`absolute top-0 right-0 w-20 h-20 ${isSecondary ? 'bg-secondary/10' : 'bg-primary/10'} blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${isSecondary ? 'bg-secondary' : 'bg-primary'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

            <div className="flex items-center gap-5 z-10">
                <div className="relative">
                    <div
                        className={`bg-center bg-no-repeat bg-cover rounded-lg h-14 w-14 border border-white/10 ${isSecondary ? 'group-hover:border-secondary/30' : 'group-hover:border-primary/30'} transition-colors`}
                        style={{ backgroundImage: `url("${contact.image}")` }}
                    ></div>
                    {/* Status Dot */}
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${contact.statusColor} rounded-full border-2 border-[#0e151a]`}></div>
                </div>
                <div className="flex flex-col">
                    <p className={`text-white text-lg font-bold tracking-wide uppercase ${isSecondary ? 'group-hover:text-secondary' : 'group-hover:text-primary'} transition-colors`}>{contact.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="material-symbols-outlined text-[14px] text-slate-500">tag</span>
                        <p className="text-slate-400 text-sm font-mono tracking-wider">{contact.phone}</p>
                    </div>
                </div>
            </div>

            {/* Action Button (Hidden until hover) */}
            <button
                onClick={onCall}
                className={`z-10 ${isSecondary ? 'bg-secondary/10 hover:bg-secondary text-secondary hover:text-white border-secondary/30 hover:shadow-neon-purple' : 'bg-primary/10 hover:bg-primary text-primary hover:text-black border-primary/30 hover:shadow-neon'} border rounded-lg p-3 opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center`}
            >
                <span className="material-symbols-outlined">call</span>
            </button>
        </div >
    );
};
