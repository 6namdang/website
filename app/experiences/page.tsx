import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Award } from "lucide-react";

// --- DATA ---
// You can easily update your information for each section here

const experiences = [
    {
        date: "2025 — 2026",
        title: "Research Thesis: Predictive Modeling",
        company: "Gannon University",
        description: "Developed a machine learning model to predict student transfer intentions. My work was awarded the J.J. Duratz Research Award and was accepted for publication at the ETLTC-ICES conference in Aizu, Japan.",
        tags: ["Machine Learning", "Python", "Data Analysis", "Predictive Modeling", "Academic Research"],
        link: "https://www.gannon.edu/" // Replace with a link to the paper or project if available
    },
    {
        date: "2024 — 2025",
        title: "AI/ML Engineer (Senior Capstone)",
        company: "Lockheed Martin Collaboration",
        description: "Led the development of an AI-powered interview analysis platform. This tool was designed to streamline candidate assessment by analyzing video interviews for key communication and technical metrics.",
        tags: ["Computer Vision", "Python", "FastAPI", "React.js", "Full-Stack"],
        link: "https://www.lockheedmartin.com/"
    },
    {
        date: "Summer 2022",
        title: "Summer Conference Assistant",
        company: "Gannon University",
        description: "Provided logistical and administrative support for university conferences, ensuring a smooth and positive experience for all attendees, speakers, and organizers.",
        tags: ["Event Coordination", "Logistics", "Public Speaking", "Customer Service"],
        link: "https://www.gannon.edu/"
    },
    {
        date: "Side Experience",
        title: "Bartender & HCI Researcher",
        company: "Local Establishment",
        description: "Viewed my role as an informal human-computer interaction lab, honing skills in user-centric service, rapid problem-solving, and effective communication in a dynamic, high-pressure environment.",
        tags: ["Human-Computer Interaction", "Communication", "User Experience", "Problem-Solving"],
    },
];

const awards = [
    {
        name: "J.J. Duratz Research Award",
        issuer: "Gannon University",
        date: "2025"
    },
    {
        name: "Accepted Publication at ETLTC-ICES",
        issuer: "University of Aizu, Japan",
        date: "2026"
    },
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


// SEO Metadata for the page
export const metadata: Metadata = {
    title: "My Journey | Hoang Nam Dang",
    description: "A timeline of my professional journey, awards, and a showcase of my technical skills.",
};

export default function ExperiencesPage() {
    return (
        <main className="w-full max-w-3xl mx-auto px-4 py-28 sm:py-32">
            <header className="mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                    My Journey
                </h1>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
                    A timeline of my work, research, awards, and skills. I believe in learning from every opportunity and continuously building my expertise.
                </p>
            </header>

            {/* --- EXPERIENCE SECTION (UNCHANGED) --- */}
            <div className="flex flex-col gap-12">
                {experiences.map((exp) => (
                    <div
                        key={exp.title}
                        className="group relative flex flex-col sm:flex-row gap-4 sm:gap-8 p-4 -mx-4 rounded-xl transition-all duration-300 hover:bg-gray-100/50 dark:hover:bg-white/5"
                    >
                        <div className="flex-shrink-0 w-full sm:w-32 text-sm font-semibold text-gray-500 dark:text-gray-400">
                            {exp.date}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 flex items-center">
                                {exp.title}
                                {exp.link && <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
                            </h3>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                {exp.company}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {exp.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {exp.tags.map((tag) => (
                                    <span key={tag} className="text-xs font-medium px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {exp.link && (
                            <Link href={exp.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0">
                                <span className="sr-only">View details about {exp.title}</span>
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            {/* --- SEPARATOR --- */}
            <hr className="my-16 border-gray-200 dark:border-gray-800" />

            {/* --- AWARDS SECTION (NEW) --- */}
            <section>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
                    Awards
                </h2>
                <div className="relative pl-8">
                    {/* Vertical Line */}
                    <div className="absolute left-0 top-1 h-full w-px bg-gray-200 dark:bg-gray-800"></div>
                    <div className="flex flex-col gap-8">
                        {awards.map((award, index) => (
                            <div key={index} className="relative">
                                {/* Icon on the timeline */}
                                <div className="absolute -left-[40px] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                                    <Award className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">{award.name}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{award.issuer}</p>
                                    </div>
                                    <p className="mt-1 sm:mt-0 flex-shrink-0 text-sm font-medium text-gray-500 dark:text-gray-400">{award.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SEPARATOR --- */}
            <hr className="my-16 border-gray-200 dark:border-gray-800" />

            {/* --- SKILLS SECTION (NEW) --- */}
            <section>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
                    Skills & Technologies
                </h2>
                <div className="space-y-8">
                    {skills.map((skillCategory) => (
                        <div key={skillCategory.category}>
                            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wider uppercase mb-4">
                                {skillCategory.category}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {skillCategory.items.map((item) => (
                                    <span key={item} className="text-sm font-medium px-4 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg">
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