'use client'

// Removed import for next/link
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState, useEffect } from "react";
import { useTheme } from 'next-themes';
// Removed import for next/navigation
import React from "react";
import { MenuItem } from "@/types";

// We will use standard <a> tags instead of Link
// and get the pathname from window.location
export default function Navbar() {
    // --- State Hooks ---
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    // Add state to hold the current pathname
    const [pathName, setPathName] = useState("");

    // --- Next.js Hooks ---
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
        // Set the pathname from the window object
        setPathName(window.location.pathname);
        
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Base menu items remain
    const baseMenuItems: MenuItem[] = [
        { label: 'Experience', href: '/experiences' },
        { label: 'Projects', href: '/projects' },
        { label: 'Blog', href: '/blog' },
        { label: 'Research', href: '/research' },
        { label: 'Contact', href: '/contact' },
    ];

    // Menu items are now just the base items
    const menuItems: MenuItem[] = baseMenuItems;


    return (
        <>
            <nav className={`fixed top-1 left-1/2 -translate-x-1/2 z-50 transition-all duration-[800ms] ease-in-out ${isScrolled ? 'w-[95%] max-w-6xl' : 'w-[90%] max-w-5xl'}`}>
                <div className={`backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg transition-all duration-[800ms] ease-in-out ${isScrolled ? 'shadow-xl py-3' : 'py-4'}`}>
                    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
                        {/* Logo (using <a> tag) */}
                        <a href="/" className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white hover:opacity-60 transition-opacity duration-200">
                            Hoang Nam Dang
                        </a>

                        {/* Desktop Menu */}
                        <ul className="hidden md:flex items-center gap-1 lg:gap-2">
                            {menuItems.map((item) => (
                                <li key={item.label}>
                                    {item.href ? (
                                        // Use <a> tag instead of <Link>
                                        <a
                                            href={item.href}
                                            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathName === item.href ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50"}`}
                                        >
                                            {item.icon}{item.label}
                                        </a>
                                    ) : (
                                        <button
                                            onClick={item.action}
                                            className="flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                                        >
                                            {item.icon}{item.label}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                                aria-label="Toggle theme"
                            >
                                {mounted && theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                            <button onClick={() => setIsMenuOpen(true)} className="md:hidden p-2">
                                <Menu className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- Mobile Menu --- */}
            {isMenuOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)} />}
            <aside className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                    <span className="font-semibold">Menu</span>
                    <button onClick={() => setIsMenuOpen(false)}><X className="w-5 h-5" /></button>
                </div>
                <nav className="p-6">
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.label}>
                                {item.href ? (
                                    // Use <a> tag instead of <Link>
                                    <a href={item.href} onClick={() => setIsMenuOpen(false)} className={`block px-4 py-3 rounded-lg font-medium ${pathName === item.href ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}>{item.label}</a>
                                ) : (
                                    <button onClick={item.action} className="w-full text-left block px-4 py-3 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800">{item.label}</button>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}

