import ArticleItemList from "../components/ArticleListItems"; // Changed to relative path
import { getCategorisedArticles } from "@/lib/articles"; // Changed to relative path
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Hoang Nam Dang",
};

const HomePage = () => {
  const articles = getCategorisedArticles();

  return (
    <main className="min-h-screen w-full max-w-4xl mx-auto px-6 py-28 sm:py-32">
      
      {/* Simple header */}
            <header className="mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                    Blogs
                </h1>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                    hand-written blogs that i decided to write about
                </p>
            </header>

      {/* Article list - simple chronological */}
      <section className="space-y-12">
        {articles !== null &&
          Object.keys(articles).map((category) => (
            <ArticleItemList
              category={category}
              articles={articles[category]}
              key={category}
            />
          ))}
      </section>
    </main>
  );
};

export default HomePage;

