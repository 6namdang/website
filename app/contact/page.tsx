import { Metadata } from "next";
import Link from "next/link";
import { Mail, Github, Linkedin, Twitter, FileText } from "lucide-react";

// --- DATA ---
// Update this array with your social media links and resume path.
const socials = [
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/your-profile-name", // <-- UPDATE THIS
        handle: "Your Profile Name", // <-- UPDATE THIS
        icon: <Linkedin className="w-5 h-5" />
    },
    {
        name: "GitHub",
        href: "https://github.com/hoangdang",
        handle: "hoangdang",
        icon: <Github className="w-5 h-5" />
    },
    {
        name: "Twitter (X)",
        href: "https://twitter.com/hwangnamd",
        handle: "@hwangnamd",
        icon: <Twitter className="w-5 h-5" />
    },
    {
        name: "Resume",
        href: "/Hoang_Nam_Dang[Resume].pdf", // Assumes your PDF is in the /public folder
        handle: "Download PDF",
        icon: <FileText className="w-5 h-5" />
    }
];

// SEO Metadata
export const metadata: Metadata = {
    title: "Contact | Hoang Nam Dang",
    description: "Get in touch with Hoang Nam Dang.",
};


// --- PAGE COMPONENT ---
export default function ContactPage() {
    return (
        <main className="w-full max-w-3xl mx-auto px-4 py-28 sm:py-32">
            <header className="mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                    Contact
                </h1>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                    Feel free to get in touch. I'm always open to discussing new projects, research, or opportunities.
                </p>
            </header>

            {/* --- Primary Email Section --- */}
            <section className="mb-16">
                <h2 className="text-xl font-semibold uppercase tracking-widest text-gray-700 dark:text-gray-200 mb-8">
                    Get in Touch
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    The most reliable way to reach me is through email.
                </p>
                <Link
                    href="mailto:dang004@gannon.edu"
                    className="inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline decoration-2 underline-offset-4"
                >
                    <Mail className="w-5 h-5" />
                    dang004@gannon.edu
                </Link>
            </section>

            {/* --- Social Media Section --- */}
            <section>
                <h2 className="text-xl font-semibold uppercase tracking-widest text-gray-700 dark:text-gray-200 mb-8">
                    Find Me Elsewhere
                </h2>
                <div className="flex flex-col gap-4">
                    {socials.map((social) => (
                        <Link
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        >
                            <div className="text-gray-600 dark:text-gray-400">
                                {social.icon}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900 dark:text-gray-100">
                                    {social.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {social.handle}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}