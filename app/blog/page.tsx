import { cookies } from 'next/headers';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server'; // Use your SERVER client
import { Metadata } from 'next';

// SEO Metadata
export const metadata: Metadata = {
    title: "Blog | Hoang Nam Dang",
    description: "Thoughts and articles on technology, AI, and software development.",
};

// ✅ Define a type for your post data to fix inference errors
type Post = {
    title: string;
    slug: string;
    content: string;
    created_at: string;
    tags: string[] | null;
};

// Helper function to format the date
function formatDate(dateString: string) {
    // ... (function remains the same)
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// Helper function to create a plain text snippet
function createSnippet(markdown: string, maxLength: number = 150) {
    // ... (function remains the same)
    const plainText = markdown
        .replace(/#{1,6}\s/g, '')
        .replace(/(\*\*|__)(.*?)\1/g, '$2')
        .replace(/(\*|_)(.*?)\1/g, '$2')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1')
        .replace(/!\[(.*?)\]\(.*?\)/g, '')
        .replace(/\n/g, ' ')
        .replace(/<[^>]*>?/gm, '')
        .trim();

    if (plainText.length <= maxLength) {
        return plainText;
    }

    return plainText.substring(0, maxLength).trimEnd() + '...';
}

export default async function BlogPage() {
    // ✅ FIX 1 & 2: Your 'createClient' is async and needs 'await'.
    // It also doesn't take any arguments because it calls cookies() internally.
    const supabase = await createClient();

    // Fetch all published posts, ordered by newest first
    const { data: posts, error } = await supabase
        .from('posts')
        .select('title, slug, content, created_at, tags')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
    }

    return (
        <main className="w-full max-w-3xl mx-auto px-4 py-28 sm:py-32">
            <header className="mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                    Blog
                </h1>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                    Thoughts and articles on technology, AI, and software development.
                </p>
            </header>

            <section>
                <div className="flex flex-col gap-12">
                    {posts && posts.length > 0 ? (
                        // ✅ FIX 3: Explicitly type 'post' using our new Post type
                        posts.map((post: Post) => (
                            <article key={post.slug}>
                                <Link href={`/blog/${post.slug}`} className="group">
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                                        {createSnippet(post.content)}
                                    </p>
                                </Link>
                                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                                    <time
                                        dateTime={post.created_at}
                                        className="text-sm text-gray-500 dark:text-gray-400"
                                    >
                                        {formatDate(post.created_at)}
                                    </time>

                                    <span className="w-px h-4 bg-gray-300 dark:bg-gray-600"></span>

                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {/* ✅ FIX 4: Explicitly type 'tag' as a string */}
                                            {post.tags.map((tag: string) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs font-medium px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))
                    ) : (
                        <p className="text-gray-600 dark:text-gray-300">
                            No published posts found. Check back soon!
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}