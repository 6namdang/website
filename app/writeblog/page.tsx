'use client';

import { useState, useEffect } from 'react';
import { marked } from 'marked';
import { useRouter } from 'next/navigation';

// Define the structure for a Table of Contents item
interface TocItem {
    level: number;
    text: string;
    slug: string;
}

// Initial content to demonstrate features
const placeholderContent = `# Your Blog Post Title

Write a short, engaging introduction here.

## Main Section 1

You can elaborate on your first point...
`;

// Helper function to create a URL-friendly slug
const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')       // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-');      // Replace multiple - with single -
};

export default function BlogEditorPage() {
    // --- Form State ---
    const [title, setTitle] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [content, setContent] = useState<string>(placeholderContent);
    const [tags, setTags] = useState<string>('');

    // --- Preview & ToC State ---
    const [html, setHtml] = useState<string>('');
    const [toc, setToc] = useState<TocItem[]>([]);

    // --- UI State ---
    const [loadingState, setLoadingState] = useState<'idle' | 'draft' | 'published'>('idle');

    const router = useRouter();

    // Effect to auto-generate slug from title
    useEffect(() => {
        setSlug(slugify(title));
    }, [title]);

    // Effect to parse Markdown and generate ToC
    useEffect(() => {
        const headings: TocItem[] = [];
        const renderer = new marked.Renderer();

        renderer.heading = (token) => {
            const text = token.text;
            const level = token.depth;
            const headingSlug = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
            headings.push({ level, text, slug: headingSlug });
            return `<h${level} id="${headingSlug}" class="scroll-mt-24">${text}</h${level}>`;
        };

        marked.use({ renderer });
        const parsedHtml = marked.parse(content) as string;
        setHtml(parsedHtml);
        setToc(headings);
    }, [content]);

    // Function to "save" the post (placeholder, no Supabase)
    const handleSave = async (status: 'draft' | 'published') => {
        if (!title.trim()) {
            alert('Please enter a title.');
            return;
        }
        if (!slug.trim()) {
            alert('Please enter a valid slug.');
            return;
        }

        setLoadingState(status);

        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

        // Placeholder for actual saving logic
        console.log({
            title,
            slug,
            content,
            toc,
            tags: tagsArray,
            status,
        });

        alert(`Post ${status === 'draft' ? 'saved as draft' : 'published'}!`);
        setLoadingState('idle');

        // Redirect (example)
        router.push('/blog');
    };

    return (
        <main className="w-full max-w-6xl mx-auto px-4 py-28 sm:py-32">
            <header className="mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center text-gray-900 dark:text-gray-50">
                    Create New Post
                </h1>
            </header>

            {/* --- Form Inputs --- */}
            <div className="max-w-3xl mx-auto space-y-6 mb-12">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider mb-2">TITLE</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="My Awesome Post Title"
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Slug */}
                <div>
                    <label htmlFor="slug" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider mb-2">SLUG (URL)</label>
                    <input
                        type="text"
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(slugify(e.target.value))}
                        placeholder="my-awesome-post-title"
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    />
                </div>

                {/* Tags */}
                <div>
                    <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider mb-2">TAGS</label>
                    <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="react, nextjs, ai"
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Comma-separated (e.g., react, nextjs, ai)</p>
                </div>
            </div>

            {/* --- Editor & Preview --- */}
            <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
                {/* Editor */}
                <div className="flex-1 flex flex-col">
                    <label htmlFor="content" className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider mb-3">
                        MARKDOWN CONTENT
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full flex-grow p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200"
                    />
                </div>

                {/* Preview */}
                <div className="flex-1 flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider mb-3">
                        PREVIEW
                    </label>
                    <div className="w-full flex-grow p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-y-auto">
                        {toc.length > 0 && (
                            <div className="mb-10 p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800/50">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Table of Contents</h2>
                                <ul className="space-y-2">
                                    {toc.map((item) => (
                                        <li key={item.slug} style={{ paddingLeft: `${(item.level - 1) * 1.25}rem` }}>
                                            <a href={`#${item.slug}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                                {item.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div
                            className="prose prose-gray dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    </div>
                </div>
            </div>

            {/* --- Action Buttons --- */}
            <div className="flex justify-end items-center gap-4 mt-8 max-w-6xl mx-auto">
                <button
                    onClick={() => handleSave('draft')}
                    disabled={loadingState !== 'idle'}
                    className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {loadingState === 'draft' ? 'Saving...' : 'Save as Draft'}
                </button>
                <button
                    onClick={() => handleSave('published')}
                    disabled={loadingState !== 'idle'}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                >
                    {loadingState === 'published' ? 'Publishing...' : 'Publish'}
                </button>
            </div>
        </main>
    );
}
