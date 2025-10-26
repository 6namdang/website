import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { Metadata } from 'next';
import Link from 'next/link';
import PostSidebar from './PostSidebar';
import { TocItem, Post } from '@/types'; // Assuming types are in @/types

// --- Helper Functions ---

// Helper function to format the date
function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// Helper to create slugs for headings
const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-');
};

// --- Dynamic Metadata ---
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const supabase = await createClient();
    const { data: post } = await supabase
        .from('posts')
        .select('title, content')
        .eq('slug', params.slug)
        .single();

    if (!post) {
        return { title: 'Post Not Found' };
    }

    const description = post.content.substring(0, 160).replace(/(\*\*|#|\[.*?\]\(.*?\))/g, '').replace(/\s+/g, ' ').trim() + '...';
    return {
        title: `${post.title} | Hoang Nam Dang`,
        description: description,
    };
}


// --- PAGE COMPONENT ---
export default async function PostPage({ params }: { params: { slug: string } }) {
    const supabase = await createClient();
    const { data: post } = await supabase
        .from('posts')
        .select('title, content, created_at, tags, table_of_contents')
        .eq('slug', params.slug)
        .single<Post>();

    if (!post) {
        notFound();
    }

    const renderer = new marked.Renderer();
    renderer.heading = (token) => {
        const text = token.text;
        const level = token.depth;
        const slug = slugify(text);
        const marginTopClass = "scroll-mt-24";
        return `<h${level} id="${slug}" class="${marginTopClass}">${text}</h${level}>`;
    };
    marked.use({ renderer });
    const htmlContent = await marked.parse(post.content);

    return (
        // The main container is centered with mx-auto and has a max-width
        <div className="w-full max-w-6xl mx-auto px-4 py-28 sm:py-32">
            <div className="flex flex-col lg:flex-row justify-center gap-12">

                {/* --- Main Content (Left Column) --- */}
                <main className="flex-1 min-w-0 lg:max-w-3xl">
                    <article>
                        {/* Post Header */}
                        <header className="mb-8">
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                                {post.title}
                            </h1>
                            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                                <time dateTime={post.created_at}>
                                    {formatDate(post.created_at)}
                                </time>
                                {post.tags && post.tags.length > 0 && (
                                    <>
                                        <span className="w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="text-xs font-medium px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </header>

                        <hr className="my-8 border-gray-200 dark:border-gray-700" />

                        {/* Post Content */}
                        <div
                            className="prose prose-lg prose-gray dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />

                        <hr className="my-12 border-gray-200 dark:border-gray-700" />

                        <div className="text-center">
                            <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
                                ← Back to all posts
                            </Link>
                        </div>
                    </article>
                </main>

                {/* --- Right Sidebar --- */}
                {post.table_of_contents && post.table_of_contents.length > 0 && (
                    <aside className="hidden lg:block lg:w-64 flex-shrink-0">
                        <PostSidebar toc={post.table_of_contents} />
                    </aside>
                )}
            </div>
        </div>
    );
}