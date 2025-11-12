import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import moment from 'moment'
import { ArticleItem } from '@/types' // Assuming you have this type
import { remark } from 'remark'
import html from 'remark-html'

const articleDirectory = path.join(process.cwd(), "app/articles")


export const getSortedArticles = (): ArticleItem[] => {
    const fileNames = fs
        .readdirSync(articleDirectory)
        .filter((name) => name.endsWith('.md'))

    const allArticlesData = fileNames.map((filename) => {
        const id = filename.replace(/\.md$/, "")
        const fullPath = path.join(articleDirectory, filename)
        const fileContent = fs.readFileSync(fullPath, "utf-8")
        const matterResult = matter(fileContent)

        return {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
            category: matterResult.data.category,
        } as ArticleItem
    })

    // Filter out any articles that failed to parse frontmatter
    const validArticles = allArticlesData.filter(
        (article) => article.title && article.date && article.category
    )

    // Sort by date, NEWEST first (descending)
    return validArticles.sort((a, b) => {
        const format = "DD-MM-YYYY"
        const dateOne = moment(a.date, format).valueOf()
        const dateTwo = moment(b.date, format).valueOf()
        return dateTwo - dateOne // b - a = descending
    })
}

export const getCategorisedArticles = (): Record<string, ArticleItem[]> => {
    const sortedArticles = getSortedArticles()
    const categorisedArticles: Record<string, ArticleItem[]> = {}

    sortedArticles.forEach((article) => {
        if (!categorisedArticles[article.category]) {
            categorisedArticles[article.category] = []
        }
        categorisedArticles[article.category].push(article)
    })

    return categorisedArticles
}


// --- UPDATED/NEW FUNCTIONS ---

/**
 * Gets all article IDs (slugs) for generateStaticParams
 * This function is SYNCHRONOUS, so it doesn't need to be async.
 */
export function getAllArticleIds() {
    const fileNames = fs
        .readdirSync(articleDirectory)
        .filter((name) => name.endsWith('.md'))

    return fileNames.map((filename) => {
        return {
            slug: filename.replace(/\.md$/, ""),
        }
    })
}

/**
 * Gets a single article's data (including HTML content) by its slug
 */
export async function getArticleData(slug: string) {
    const fullPath = path.join(articleDirectory, `${slug}.md`)
    const fileContent = fs.readFileSync(fullPath, "utf-8")

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContent)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    
    const contentHtml = processedContent.toString()

    // Combine the data with the id and contentHtml
    return {
        id: slug,
        contentHtml,
        ...(matterResult.data as { 
            title: string; 
            date: string; 
            category: string 
        }),
    }
}
