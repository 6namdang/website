import { Metadata } from "next";
import Link from "next/link";
import { FileText, Code2, Globe, ChevronDown } from "lucide-react";


const publications = [
    {
        title: "Predictive Modeling of Student Transfer Intentions",
        authors: "<strong>Hoang Nam Dang</strong>, John Doe, Jane Smith",
        venue: "In <em>Proceedings of the International Conference on Educational Technology and Learning (ETLTC-ICES)</em>, Aizu, Japan",
        year: "2026",
        abstract: "This study introduces a machine learning model designed to predict the likelihood of student transfers between academic institutions. By analyzing various academic, demographic, and engagement metrics, the model provides early indicators for administrators, enabling proactive support strategies. Our results demonstrate high accuracy and identify key factors influencing transfer decisions.",
        links: {
            pdf: "#", // Replace with link to your PDF
            website: "#" // Replace with link to a project page
        },
        bibtex: `@inproceedings{dang2026predictive,
  title={Predictive Modeling of Student Transfer Intentions},
  author={Dang, Hoang Nam and Doe, John and Smith, Jane},
  booktitle={Proceedings of the International Conference on Educational Technology and Learning (ETLTC-ICES)},
  year={2026},
  organization={University of Aizu}
}`
    },
    {
        title: "An AI-Powered Platform for Analyzing Video Interviews",
        authors: "<strong>Hoang Nam Dang</strong>, Co-author Name",
        venue: "In <em>Proceedings of the IEEE International Conference on Cloud Computing (CSCloud)</em>",
        year: "2026",
        abstract: "As part of a senior capstone collaboration with Lockheed Martin, we developed a novel platform that leverages computer vision and natural language processing to analyze video interviews. The system extracts key emotional cues, speaking patterns, and content relevance to provide recruiters with data-driven insights, aiming to streamline the initial candidate screening process.",
        links: {
            pdf: "#", // Replace with link to your PDF
        },
        bibtex: `@inproceedings{dang2026ai,
  title={An AI-Powered Platform for Analyzing Video Interviews},
  author={Dang, Hoang Nam and Name, Co-author},
  booktitle={Proceedings of the IEEE International Conference on Cloud Computing (CSCloud)},
  year={2026},
  organization={IEEE}
}`
    },
];

// SEO Metadata
export const metadata: Metadata = {
    title: "Research | Hoang Nam Dang",
    description: "A collection of my research publications and academic work.",
};


// --- PAGE COMPONENT ---

export default function ResearchPage() {
    return (
        <main className="w-full max-w-3xl mx-auto px-4 py-28 sm:py-32">
            <header className="mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                    Research
                </h1>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                    A curated list of my academic publications. I am passionate about research that lies at the intersection of HCI, security, and machine learning.
                </p>
            </header>

            <section>
                <div className="flex flex-col gap-12">
                    {publications.map((pub) => (
                        <article key={pub.title}>
                            {/* Publication Title */}
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                <Link href={pub.links.pdf || "#"} target="_blank" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    {pub.title}
                                </Link>
                            </h2>

                            {/* Authors, Venue, and Year */}
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                <p dangerouslySetInnerHTML={{ __html: pub.authors }} />
                                <p dangerouslySetInnerHTML={{ __html: `${pub.venue}, ${pub.year}` }} />
                            </div>

                            {/* Action Links (PDF, Code, etc.) */}
                            <div className="mt-4 flex flex-wrap items-center gap-4">
                                {pub.links.pdf && (
                                    <Link href={pub.links.pdf} target="_blank" className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                        <FileText className="w-4 h-4" /> PDF
                                    </Link>
                                )}
                                {/* {pub.links.code && (
                                    <Link href={pub.links.code} target="_blank" className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                        <Code2 className="w-4 h-4" /> Code
                                    </Link>
                                )} */}
                                {pub.links.website && (
                                    <Link href={pub.links.website} target="_blank" className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                        <Globe className="w-4 h-4" /> Website
                                    </Link>
                                )}
                            </div>

                            {/* Collapsible Abstract */}
                            <details className="group mt-4 text-sm">
                                <summary className="flex items-center gap-1 cursor-pointer font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    Abstract
                                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" />
                                </summary>
                                <div className="mt-2 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {pub.abstract}
                                    </p>
                                </div>
                            </details>

                            {/* Collapsible BibTeX */}
                            <details className="group mt-2 text-sm">
                                <summary className="flex items-center gap-1 cursor-pointer font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    BibTeX
                                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" />
                                </summary>
                                <div className="mt-2 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                                    <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
                                        <code>{pub.bibtex}</code>
                                    </pre>
                                </div>
                            </details>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}