'use client';
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
    const [ready, setReady] = useState(false);
    const [visible, setVisible] = useState(true);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const finish = () => setReady(true);
        if (document.readyState === 'complete') {
            finish();
            return;
        }
        window.addEventListener('load', finish);
        return () => window.removeEventListener('load', finish);
    }, []);

    useEffect(() => {
        if (!ready) return;
        const reduced =
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduced) {
            setVisible(false);
            return;
        }

        // play a short fade-out for smooth transition
        setExiting(true);
        const t = setTimeout(() => setVisible(false), 300);
        return () => clearTimeout(t);
    }, [ready]);

    return (
        <>
            {children}
            {visible && (
                <div
                    aria-hidden={ready}
                    role="status"
                    aria-live="polite"
                    aria-busy={!ready}
                    className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm transition-opacity duration-300 ${exiting ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="flex flex-col items-center gap-4 p-6">
                        <Spin size="large" />
                        <span className="text-sm text-gray-700 dark:text-gray-200">Loading…</span>
                    </div>
                </div>
            )}
        </>
    );
}