import { CodeXml, GraduationCap, } from "lucide-react"
import Image from "next/image"
export default function About() {
    return (
        <div className="w-full px-[12%] py-10 scroll-mt-20">
            <h4 className="text-center mb-2 text-lg">
                Introduction
            </h4>
            <h2 className="text-center text-5xl">
                About me
            </h2>
            <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
                <div className="w-64 sm:w-80 rounded-3xl max-w-none">
                    <Image src="/img.jpeg" alt="profile-img" width={800} height={800} className="w-full rounded-3xl" />
                </div>
                <div className="flex-1">
                    <p className="mb-10 max-w-2xl">
                        Hello! I'm a Gannon University Computer Science graduate <em>passionate about</em> <strong>HCI, security, and explainable AI</strong>. My work focuses on creating and improving computational methods for machine learning analysis.
                        I have research experience developing AI-driven security tools and predictive models, complemented by hands-on software engineering experience in <strong>full-stack web development (JavaScript, Python, AWS)</strong>. I'm a <em>strong collaborator</em> who enjoys solving complex problems.
                        Beyond tech, I volunteer in my community, including teaching cybersecurity skills.
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
                        <li className="border-[0.5px] border-gray-300 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 hover:bg-[#fcf4ff] dark:hover:bg-[#fcf4ff]/10 hover:-translate-y-1 transition-transform duration-500">
                            <CodeXml className="w-7 mt-3 text-gray-900 dark:text-gray-100" />
                            <h3 className="my-4 font-semibold text-gray-700 dark:text-gray-300">Languages</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Python, Java, Javascript, Golang</p>
                        </li>

                        <li className="border-[0.5px] border-gray-300 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 hover:bg-[#fcf4ff] dark:hover:bg-[#fcf4ff]/10 hover:-translate-y-1 transition-transform duration-500">
                            <GraduationCap className="w-7 mt-3 text-gray-900 dark:text-gray-100" />
                            <h3 className="my-4 font-semibold text-gray-700 dark:text-gray-300">Education</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">B.S in Computer Science (2021-2025)</p>
                        </li>

                        <li className="border-[0.5px] border-gray-300 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 hover:bg-[#fcf4ff] dark:hover:bg-[#fcf4ff]/10 hover:-translate-y-1 transition-transform duration-500">
                            <CodeXml className="w-7 mt-3 text-gray-900 dark:text-gray-100" />
                            <h3 className="my-4 font-semibold text-gray-700 dark:text-gray-300">Skills</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Networking, Operating System, Computer Architecture, ML, AWS</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}