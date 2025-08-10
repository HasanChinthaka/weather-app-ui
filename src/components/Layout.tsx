import React from 'react';
import Footer from './Footer';

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/src/assets/bg-2.png')" }}
        >
            <main className='flex-glow min-h-screen'>
                {children}
            </main>
            <Footer />
        </div>
    );
}
