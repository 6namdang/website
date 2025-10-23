'use client'

import Link from "next/link";
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useState, useEffect } from "react";
import { useTheme } from 'next-themes'
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const pathName = usePathname();

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { label: 'Experience', href: '/experiences' },
        { label: 'Projects', href: '/projects' },
        { label: 'Blog', href: '/blogs' },
        { label: 'Research', href: '/research' },
        { label: 'Contact', href: '/contact' },

    ];

    return (
        <>
            <nav className={`fixed top-1 left-1/2 -translate-x-1/2 z-50 transition-all duration-[800ms] ease-in-out ${isScrolled
                    ? 'w-[95%] max-w-6xl'
                    : 'w-[90%] max-w-5xl'
                }`}>
                <div className={`backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg transition-all duration-[800ms] ease-in-out ${isScrolled ? 'shadow-xl py-3' : 'py-4'
                    }`}>
                    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white hover:opacity-60 transition-opacity duration-200"
                        >
                            Hoang Nam Dang
                        </Link>

                        {/* Desktop Menu */}
                        <ul className="hidden md:flex items-center gap-1 lg:gap-2">
                            {menuItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                            ${pathName === item.href
                                                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                                                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
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
                                {mounted && theme === 'dark' ? (
                                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-200 hover:rotate-180" />
                                ) : (
                                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-200 hover:rotate-12" />
                                )}
                            </button>

                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="md:hidden p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                                aria-label="Open menu"
                            >
                                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Backdrop */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <aside
                className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                        <span className="text-base font-semibold text-gray-900 dark:text-white">
                            Menu
                        </span>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                            aria-label="Close menu"
                        >
                            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Mobile Menu Items */}
                    <nav className="flex-1 overflow-y-auto p-6">
                        <ul className="space-y-1">
                            {menuItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block px-4 py-3 rounded-lg transition-all duration-200 font-medium text-base
                                            ${pathName === item.href
                                                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                                                : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}