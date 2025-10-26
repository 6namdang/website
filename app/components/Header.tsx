import { Metadata } from "next"
export const metadata: Metadata = {
    title: "This is a header of my portfolio",
    description: "Easy on SEO, searchable, looking for impact through people lives",
    keywords: ["portfolio", "google", "software engineer", "engineers", "technology"],
    openGraph: {
        title: "Best header in the world",
        description: "Find my portfolio here",
        locale: "en_US"
    },
    twitter: {
        card: "summary_large_image",
        title: "NextJS Header",
        description: "Mastering meta data",
        creator: "@hwangnamd",
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1
        }
    }
}


import Image from "next/image"
import Link from "next/link"
import { ArrowRight, FileUser } from "lucide-react"
export default function Header() {
    return (
        <div className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 pt-20">
            <div className="w-40 h-40">
                <Image src="/profile-img.jpg" alt="profile-img" width={160} height={160} className="rounded-full w-40 h-40 object-cover" />
            </div>
            <h3 className="text-xl md:text-2xl mb-3 flex items-end gap-2">Hi! I'm Hoang Dang 🙌</h3>
            <h1 className="text-3xl sm:text-6xl lg:text-[66px]">Software Engineer based in the United States</h1>
            <p className="max-w-2xl mx-auto">
                <em>I am actively looking for an opportunity, and would love to get connected! Feel free to send me an email at dang004(at)gannon(dot)edu
                </em>
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                <Link href="#contact"
                    className="px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2">
                    Contact me
                    <ArrowRight className="w-4 " />
                </Link>

                <Link
                    href="website/public/Hoang_Nam_Dang[Resume].pdf"
                    download="true"
                    className="px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2">
                    My Resume
                    <FileUser className="w-4 " />
                </Link>

            </div>

        </div>
    )
}