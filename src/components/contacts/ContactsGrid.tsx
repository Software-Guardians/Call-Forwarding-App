import React from 'react';
import { ContactCard, ContactData } from './ContactCard';

interface ContactsGridProps {
    onCall: (name: string) => void;
}

export const ContactsGrid: React.FC<ContactsGridProps> = ({ onCall }) => {
    const contacts: ContactData[] = [
        {
            id: '1',
            name: 'Alexa Vance',
            phone: '+1 (555) 019-2834',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR8Hsu7pg7W0Glc3-7jkkpRWger3jY_u8MQ0aC6SBJvK1Ryt36Q5cV23jNtXxD6BtEVQpo3CdFuzQr8Vhtg6-XWeCaCGeipqFx33iYXCameN9Wgke1VT_N6OZdQjGB7a0OiSV1TgFraD3ETL-AIM1Ol7BgyGj2OgoEQz7W0_hD_PQFzNVHv4UG45VsWtoDDdGXrLSpOl8R71f09gMglotJvNh6deXv6BXITvcxVY5eyQiTSSn_BPasVuPa6Vhg_HmmHhOIA_Nymv7J',
            statusColor: 'bg-green-500'
        },
        {
            id: '2',
            name: 'Cyber Dyne Systems',
            phone: '+1 (800) 555-0001',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5B0kvAHmbIZv1xVbWDtz7RFvH-xRNBV5H8YgFllqVBBR_m-s_PIdO1g9v6_QXl6OrFWv9C1un_COg4LM268BIRO_Ble3HUyAoEM7R6dxXC5BCT25z5KyyRktS7L1S8PJrXkJnWnWgCaS3d7cD5cPFxFrczdiVO2USlmPBhXIXsZEX0JS_5aj8UQoT8YmX9Vi41C04fi4jFE0NFan7msYFG4bDdzSZA39sjHAw2-NOlMGLtm7whvakv4AibCC9ymFORAtULeh_wisq',
            statusColor: 'bg-slate-500',
            theme: 'secondary'
        },
        {
            id: '3',
            name: 'Sarah Connor',
            phone: '+1 (310) 555-2029',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACgeTAe2wirvYXNxn9ug2UHZBaGRS_HBPYXDUOACM9jImu6oSgDEDFs-o7JTcQszvc386XxXKSm7TikWORPDnxUCf-hyTL73xkPkEniXc_YHqM9GPI4V4Enn4YJ-aG81BMzzFS5smaO5dNO6iv-Z1N2CSU3tHTr16-PsSl2Y3205kgSHUE06CTrpE8y_C3SyN6ktXbh-2W6T7nuLK_eaME-tsXUUUIr5F2bfFhFu4-5CgBs5S_vLYoJc2_d9PPQe6L8SXeg2jB52Ez',
            statusColor: 'bg-red-500'
        },
        {
            id: '4',
            name: 'Roy Batty',
            phone: '+1 (213) 555-0199',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIJfvTCubqjomyVULXwgd3vXeiWp1BP_QiHp6CpCQIipvvB7T3g8BnKMaTII2BB_qg9SWFIvlDQ-WHusR6yz0ymuNDQi_0lxUWZV_tGnc7FKyKGnB7NMpxbGPydOQRBOIq55WXtlm6vkSyS1Kc2PEg7CxqfW0DE8MriGLrIWwQTrKiEIs21tTiazpkdtzxTKmkMep3UeGBKLVnNfqX4OhZWDUgOrKQZhkQduDLU0XhDaoTur43iYJB7GyaIFd_3DwSd0ySBS1JmeFF',
            statusColor: 'bg-green-500'
        },
        {
            id: '5',
            name: 'Niander Wallace',
            phone: '+1 (949) 555-3824',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnSZxVFL5wrCPIWY5qlY3Jk-F4BXdzomAKfuiRnf5Q8hSXopVuVXvSodgsGKFUQAn9_uKvusUnpyRWCHWaLE-JTasy1iRP5MSO4icn995EIOpTk-huzmqnSSKE8zWfLXHj9rMYGk4Coqi_gGC4ZxU8OBt_7YdrAk4FuphUKlxtLVLHKxatTtBPWMROgZn7cwfjzZBYlelY9hCZpjRs8Bxdpgwzx0V69Rd-a0OWpD5sjCcArlD-WWvOLTlJgdEM5AAJjNOXTe5ijNvp',
            statusColor: 'bg-slate-500'
        },
        {
            id: '6',
            name: 'Major Motoko',
            phone: '+81 (90) 555-9000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKksuUIFJ6jyeg9QKKCqP115S44cWccLF6sdRtpOE8Ilx3gzIWACOEufoXteDuT-Y2gxpqmt7IAnYviVOInzCKLsJw5MAghcLi9VSMKC-6ZiunpNMi_1YrnQbXpAMjzmUcdacWshIIbyoA_jqNErDZTF8oTVWE9EAU0kw0d5GiJE1YLfj7CASAP5eLeKkpybsbiZCPvjlF7qsplTeL1hhtX49TMth06JWwnaODw_OJfY6e5RvniijXSNmbCdnOHSzaERygNxqtq9Lv',
            statusColor: 'bg-green-500'
        },
        {
            id: '7',
            name: 'Rick Deckard',
            phone: '+1 (213) 555-0666',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKDKQAI9xOjqUQGkAm7fPgtZK6WBWARMKy-htLmDpiGSPd9rU7PI-oIHLHLfvHv4iEqKK_qS1SxvXGjva5u3Hn8vqVX5fGVeoZ6WJ-ilXKBS28NFRQoHSkJ8bYw66JwVR1awkiuo7zNUn8PkEqIY756LnaEftGwyw2o9MhDH5YM7yh_IwrrevwAbHBIqrjGCGiDCJsWes9ofN7BPAFG28erEYbdvPlJhht3ZDerR5ecpzQ-vf6SRgZ0prvnP71CWiillP5s1u19sQ5',
            statusColor: 'bg-orange-500'
        },
        {
            id: '8',
            name: 'Agent K',
            phone: '+1 (323) 555-4921',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiOkD91kG7eAoWek4g6RJnxVUAFxY0IxZT5f6Ugn2QDKNEKevl_TVZx1UZAs60O_9qJHcTLg4ppR6NKzMJV24XXF7rS0LTp1HHVriiuqcuUr07lucDXpcHhkfoacZNqOr8Bs3yaxSDGxFAD7MbZGBmfAA_4Y5Yrt_MXgQUsBZRZ5vsK4ejqcUBSQO7y_-t5C0JwFGDNI1WlNTFSqlZ5_JIFed_zJQMzsOPP6TId3aNGplXj5OVt44bYV0RnqzJi2IlAvPgOTb4BGm8',
            statusColor: 'bg-slate-500'
        },
    ];

    const handleCall = (name: string) => {
        console.log(`Calling ${name}...`);
        onCall(name);
    };

    return (
        <div className="flex-1 overflow-y-auto p-6 md:p-10 scroll-smooth">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pb-10 max-w-[1400px] mx-auto">
                {contacts.map(contact => (
                    <ContactCard
                        key={contact.id}
                        contact={contact}
                        onCall={() => handleCall(contact.name)}
                    />
                ))}
            </div>

            {/* Bottom decorative element */}
            <div className="flex justify-center pb-6 opacity-40">
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
            </div>
        </div>
    );
};
