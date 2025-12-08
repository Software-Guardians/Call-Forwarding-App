import React from 'react';

interface DialerHeaderProps { }

export const DialerHeader: React.FC<DialerHeaderProps> = () => {
    return (
        <header className="flex items-center justify-between whitespace-nowrap bg-transparent px-6 py-4 sticky top-0 z-50 h-[88px] pointer-events-none">
            {/* Dialer Header is now transparent and acts as a spacer/overlay if needed */}
        </header>
    );
};
