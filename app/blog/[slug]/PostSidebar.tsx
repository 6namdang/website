'use client';

import { useState, useEffect, useRef } from 'react';
import { TocItem } from '@/types'; // Assuming types are in @/types

interface PostSidebarProps {
    toc: TocItem[];
}

export default function PostSidebar({ toc }: PostSidebarProps) {
    const [activeId, setActiveId] = useState<string>('');
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(
            (entries) => {
                const intersectingEntry = entries.find((entry) => entry.isIntersecting);
                if (intersectingEntry) {
                    setActiveId(intersectingEntry.target.id);
                }
            },
            { rootMargin: '-100px 0px -75% 0px', threshold: 1.0 }
        );

        const headings = document.querySelectorAll(toc.map((item) => `#${item.slug}`).join(', '));
        headings.forEach((heading) => observer.current?.observe(heading));

        return () => observer.current?.disconnect();
    }, [toc]);

    const filteredToc = toc.filter(item => item.level >= 2 && item.level <= 3);

    if (filteredToc.length === 0) {
        return null;
    }

    return (
        // The 'sticky' class keeps the sidebar in view on scroll
        <div className="sticky top-28 h-[calc(100vh-14rem)]">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-4">
                On this page
            </h2>
            <nav>
                <ul className="space-y-2">
                    {filteredToc.map((item) => (
                        <li key={item.slug} style={{ paddingLeft: `${(item.level - 2) * 1.25}rem` }}>
                            <a
                                href={`#${item.slug}`}
                                className={`block text-sm transition-all duration-200 ease-in-out border-l-2 ${activeId === item.slug
                                        ? 'pl-3 font-semibold text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                                        : 'pl-3 text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}