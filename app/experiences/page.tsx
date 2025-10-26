import { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Award, ArrowUpRight } from "lucide-react";

// --- DATA ---
// You can easily update your information here

const experiences = [
    {
        role: "Research Thesis: Predictive Modeling",
        company: "Gannon University",
        date: "2025 — 2026",
        description: "Developed an ML model to predict student transfer intentions. Work was published at the ETLTC-ICES conference in Aizu, Japan.",
        link: "#" // Replace with a link to the paper or project
    },
    {
        role: "AI/ML Engineer (Senior Capstone)",
        company: "Lockheed Martin Collaboration",
        date: "2024 — 2025",
        description: "Led the development of an AI-powered platform to analyze video interviews and streamline candidate assessment.",
        link: "https://www.lockheedmartin.com/"
    },
    {
        role: "Summer Conference Assistant",
        company: "Gannon University",
        date: "Summer 2022",
        description: "Provided logistical and administrative support for university conferences, ensuring a smooth experience for attendees and organizers.",
        link: "https://www.gannon.edu/"
    },
];

const awards = [
    {
        name: "J.J. Duratz Research Award",
        issuer: "Gannon University",
        date: "2025"
    },
    {
        name: "Published at ETLTC-ICES Conference",
        issuer: "University of Aizu, Japan",
        date: "2026"
    },

    {
        name: "Paper accepted at IEEE CSCloud",
        date: "2026"
    }
    // Add more awards here if you like
];

const skills = [
    {
        category: "Languages",
        items: ["Python", "JavaScript / TypeScript", "Java", "C", "Go"],
    },
    {
        category: "AI & Machine Learning",
        items: ["Computer Vision", "PyTorch", "Scikit-learn", "Pandas", "Streamlit"],
    },
    {
        category: "Web Development",
        items: ["React.js", "Next.js", "Node.js", "FastAPI", "Tailwind CSS"],
    },
    {
        category: "Databases & Platforms",
        items: ["PostgreSQL", "Supabase", "AWS", "Docker", "Git & GitHub"],
    },
    {
        category: "Security",
        items: ["Suricata", "Intrusion Detection", "Network Security"],
    }
];

// SEO Metadata
export const metadata: Metadata = {
    title: "My Journey | Hoang Nam Dang",
    description: "A detailed timeline of my professional experience, awards, and technical skills.",
};


// --- PAGE COMPONENT ---

export default function ExperiencesPage() {
    return (
        <main className="w-full max-w-3xl mx-auto px-4 py-28 sm:py-32">
            <header className="mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                    My Journey
                </h1>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                    A timeline of my work, research, and projects. I believe in learning from every opportunity, whether it's in a lab, a corporate setting, or even behind a bar.                </p>
            </header>

            {/* --- Experience Section --- */}
            <section className="mb-16">
                <h2 className="text-xl font-semibold uppercase tracking-widest text-gray-700 dark:text-gray-200 mb-8">
                    Experience
                </h2>
                <div className="relative pl-8">
                    {/* Vertical Line */}
                    <div className="absolute left-2 top-1.5 h-full w-px bg-gray-200 dark:bg-gray-700"></div>

                    <div className="flex flex-col gap-12">
                        {experiences.map((exp, index) => (
                            <div key={index} className="relative group">
                                {/* Dot on the timeline */}
                                <div className="absolute -left-[38px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-gray-900">
                                    <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-400 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors duration-200"></div>
                                </div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{exp.date}</p>
                                <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{exp.role}</h3>
                                <div className="flex items-center gap-2">
                                    <p className="text-gray-700 dark:text-gray-200">{exp.company}</p>
                                    {exp.link && (
                                        <Link href={exp.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-400 hover:underline">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    )}
                                </div>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <hr className="my-16 border-gray-200 dark:border-gray-700" />

            {/* --- Awards Section --- */}
            <section className="mb-16">
                <h2 className="text-xl font-semibold uppercase tracking-widest text-gray-700 dark:text-gray-200 mb-8">
                    Awards
                </h2>
                <div className="relative pl-8">
                    {/* Vertical Line */}
                    <div className="absolute left-2 top-0 h-full w-px bg-gray-200 dark:bg-gray-700"></div>

                    <div className="flex flex-col gap-8">
                        {awards.map((award, index) => (
                            <div key={index} className="relative">
                                {/* Icon on the timeline */}
                                <div className="absolute -left-[38px] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-300">
                                    <Award className="w-5 h-5" />
                                </div>
                                <div className="flex items-baseline justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{award.name}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{award.issuer}</p>
                                    </div>
                                    <p className="flex-shrink-0 text-sm font-medium text-gray-500 dark:text-gray-400">{award.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <hr className="my-16 border-gray-200 dark:border-gray-700" />

            {/* --- Skills Section --- */}
            <section>
                <h2 className="text-xl font-semibold uppercase tracking-widest text-gray-700 dark:text-gray-200 mb-8">
                    Skills
                </h2>
                <div className="space-y-6">
                    {skills.map((skillCategory) => (
                        <div key={skillCategory.category}>
                            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider mb-3">
                                {skillCategory.category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skillCategory.items.map((item) => (
                                    <span key={item} className="text-sm font-medium px-4 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}