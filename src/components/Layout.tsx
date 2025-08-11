import React from 'react';
import Footer from './Footer';

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col w-full bg-[#1d2027]"
        >
            <main className='flex-glow min-h-screen'>
                {children}
            </main>
            <Footer />
        </div>
    );
}
