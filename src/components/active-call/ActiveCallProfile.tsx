import React from 'react';

interface ActiveCallProfileProps {
    name?: string;
    number?: string;
    image?: string;
}

export const ActiveCallProfile: React.FC<ActiveCallProfileProps> = ({
    name = "ALEXA DOE",
    number = "+1 (555) 019-2834",
    image = "https://lh3.googleusercontent.com/aida-public/AB6AXuCS9iQSF7USY6kC2Z35IpiGRmhYno1Pd_B4E2Q5LDqVsAw48PWXm9Uu6NmSbeJ7TNlN7oBE4lEeQ06d805sL5KpPJLl26Y_9UXjBl7ToGgSsu9Aqk6Fn8CjysCnGBqmY_dfyyL4xCpw1Ltvghsn2umop3_Flfw6KWrQXqtC1m-c0NL6PIgsBMiZg7hNuvzJL32Um7MvG3hmUdCu1gLewynRXK3zEL2i6Mr3svTWUOGYe1czuDTYMY7Z704Pt5IIXfQ3fbxzsrUNvvVw"
}) => {
    return (
        <>
            {/* Top Status Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#283839] bg-[#0d1414]/50">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-sm">encrypted</span>
                    <span className="text-[#9cb8ba] text-xs font-bold tracking-[0.1em]">CONNECTION SECURE</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1 h-3 bg-primary rounded-full"></div>
                    <div className="w-1 h-3 bg-primary rounded-full"></div>
                    <div className="w-1 h-3 bg-primary rounded-full"></div>
                    <div className="w-1 h-3 bg-[#283839] rounded-full"></div>
                </div>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col items-center px-8 py-10 gap-8">
                <div className="relative flex items-center justify-center">
                    <div className="relative size-32 rounded-full p-1 bg-gradient-to-b from-primary/50 to-secondary/50 shadow-neon">
                        <div className="w-full h-full rounded-full overflow-hidden bg-[#111818] relative">
                            <img alt={`${name} Profile`} className="w-full h-full object-cover opacity-90 transition-opacity" src={image} />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                        </div>
                    </div>
                </div>
                <div className="text-center space-y-1">
                    <h2 className="text-3xl font-bold text-white font-tech tracking-wide glow-text uppercase">{name}</h2>
                    <p className="text-lg text-primary font-mono tracking-wider">{number}</p>
                </div>
            </div>
        </>
    );
};
