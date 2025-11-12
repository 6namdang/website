import Link from "next/link"
import type { ArticleItem } from "@/types"
import moment from "moment"

interface Props {
  category: string
  articles: ArticleItem[]
}

const ArticleItemList = ({ category, articles }: Props) => {
  return (
    <section>
      {/* Category heading - optional, remove if you want all articles in one list */}
      <h2 className="text-2xl font-light text-neutral-800 mb-6 lowercase">
        {category}
      </h2>
      
      {/* Article list */}
      <ul className="space-y-6">
        {articles.map((article) => (
          <li key={article.id}>
            <Link
              href={`/blog/${article.id}`}
              className="group block"
            >
              <article className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <h3 className="text-lg text-neutral-900 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <time className="text-sm text-neutral-500 whitespace-nowrap">
                  {moment(article.date, "DD-MM-YYYY").format("MMM D, YYYY")}
                </time>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ArticleItemList