import { Metadata } from "next";
import Link from "next/link";
import { Code2, Globe, FileText } from "lucide-react";

// --- DATA ---
// 'image' property has been removed from each object.
const projects = [
    {
        title: "AI-Powered Video Interview Analysis",
        description: "A platform that leverages computer vision and NLP to analyze video interviews, providing data-driven insights on candidate sentiment, communication skills, and content relevance. Developed as a senior capstone in collaboration with Lockheed Martin.",
        tags: ["Python", "Computer Vision", "PyTorch", "NLP", "FastAPI", "React"],
        links: {
            code: "https://github.com/your-repo/ai-interviewer",
            website: "#",
        }
    },
    {
        title: "Personal Portfolio & Blog",
        description: "My personal website and blog, built from scratch using Next.js 14, Tailwind CSS, and Supabase. Features a custom Markdown blog editor, dynamic content, and full dark mode support.",
        tags: ["Next.js", "React", "Tailwind CSS", "Supabase", "TypeScript"],
        links: {
            code: "https://github.com/hoangdang/personal-website",
            website: "https://www.your-domain.com",
        }
    },
    {
        title: "Student Transfer Prediction Model",
        description: "My undergraduate research thesis. I developed a machine learning model to predict student transfer intentions based on academic and engagement data. The work was published at the ETLTC-ICES conference.",
        tags: ["Machine Learning", "Scikit-learn", "Pandas", "Python", "Research"],
        links: {
            pdf: "#",
        }
    },
];

// SEO Metadata
export const metadata: Metadata = {
    title: "Projects | Hoang Nam Dang",
    description: "A selection of projects I've built, showcasing my skills in AI, web development, and more.",
};


// --- PAGE COMPONENT ---
export default function ProjectsPage() {
    return (
        <main className="w-full max-w-3xl mx-auto px-4 py-28 sm:py-32">
            <header className="mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                    Projects
                </h1>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                    A selection of projects I've built, ranging from machine learning models to full-stack web applications.
                </p>
            </header>

            <section>
                {/* The layout is now a single column list */}
                <div className="flex flex-col gap-12">
                    {projects.map((project) => (
                        <article key={project.title}>
                            {/* Project Details */}
                            <div>
                                {/* Title */}
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    <Link href={project.links.website || project.links.code || "#"} target="_blank" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </Link>
                                </h2>

                                {/* Tags */}
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="text-xs font-medium px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Description */}
                                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Action Links */}
                                <div className="mt-4 flex flex-wrap items-center gap-4">
                                    {project.links.code && (
                                        <Link href={project.links.code} target="_blank" className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                            <Code2 className="w-4 h-4" /> Code
                                        </Link>
                                    )}
                                    {project.links.website && (
                                        <Link href={project.links.website} target="_blank" className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                            <Globe className="w-4 h-4" /> Website
                                        </Link>
                                    )}
                                    {project.links.pdf && (
                                        <Link href={project.links.pdf} target="_blank" className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                            <FileText className="w-4 h-4" /> PDF
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}