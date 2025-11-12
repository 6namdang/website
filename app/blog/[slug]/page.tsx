import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getArticleData, getAllArticleIds } from "@/lib/articles"
import moment from "moment"

export function generateStaticParams() {
  return getAllArticleIds()
}

const Article = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const articleData = await getArticleData(slug)
  
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        
        {/* Back link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          back
        </Link>

        {/* Article header */}
        <header className="mb-12">
          <h1 className="text-4xl font-light text-neutral-900 mb-4 leading-tight">
            {articleData.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-neutral-600">
            <time dateTime={articleData.date}>
              {moment(articleData.date, "DD-MM-YYYY").format("MMMM D, YYYY")}
            </time>
            <span>•</span>
            <span className="lowercase">{articleData.category}</span>
          </div>
        </header>

        {/* Article content with your existing .article styles */}
        <article
          className="article prose prose-neutral max-w-none
            prose-headings:font-light
            prose-headings:text-neutral-900
            prose-p:text-neutral-700
            prose-a:text-blue-600
            prose-a:no-underline
            hover:prose-a:underline
            prose-code:text-sm
            prose-code:before:content-['']
            prose-code:after:content-['']
          "
          dangerouslySetInnerHTML={{ __html: articleData.contentHtml }}
        />

        {/* Footer back link */}
        <footer className="mt-16 pt-8 border-t border-neutral-200">
          <Link 
            href="/blog"
            className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            ← back to blog
          </Link>
        </footer>
      </div>
    </main>
  )
}

export default Article