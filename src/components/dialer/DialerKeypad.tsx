import React from 'react';

interface DialerKeypadProps {
    onKeyPress: (key: string) => void;
}

export const DialerKeypad: React.FC<DialerKeypadProps> = ({ onKeyPress }) => {
    const keys = [
        { label: '1', sub: 'Voicemail' },
        { label: '2', sub: 'ABC' },
        { label: '3', sub: 'DEF' },
        { label: '4', sub: 'GHI' },
        { label: '5', sub: 'JKL', bump: true },
        { label: '6', sub: 'MNO' },
        { label: '7', sub: 'PQRS' },
        { label: '8', sub: 'TUV' },
        { label: '9', sub: 'WXYZ' },
        { label: '*', sub: '', isAction: true },
        { label: '0', sub: '+' },
        { label: '#', sub: '', isAction: true },
    ];

    return (
        <div className="grid grid-cols-3 gap-4 mb-8 px-2">
            {keys.map((k) => (
                <button
                    key={k.label}
                    onClick={() => onKeyPress(k.label)}
                    className={`
                    aspect-square rounded-full border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 
                    active:scale-95 transition-all duration-200 flex flex-col items-center justify-center group/key
                    ${k.isAction
                            ? 'hover:from-secondary/20 hover:to-secondary/5 hover:border-secondary hover:shadow-[0_0_15px_rgba(188,19,254,0.4)]'
                            : 'hover:from-primary/20 hover:to-primary/5 hover:border-primary hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                        }
                    ${k.bump ? 'relative' : ''}
                `}
                >
                    {k.bump && (
                        <div className="absolute w-1.5 h-1.5 bg-gray-600 rounded-full bottom-2 opacity-50"></div>
                    )}
                    <span className={`text-2xl font-mono font-bold transition-colors ${k.isAction ? 'text-gray-400 group-hover/key:text-secondary' : 'text-white group-hover/key:text-primary'}`}>
                        {k.label}
                    </span>
                    {k.sub && (
                        <span className={`text-[10px] font-display text-gray-500 h-3 ${k.label === '1' ? 'opacity-0 group-hover/key:opacity-100 transition-opacity' : 'tracking-widest'}`}>
                            {k.sub}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};
