// ✅ Define a type for our menu items
export type MenuItem = {
    label: string;
    href?: string;
    action?: () => void;
    icon?: React.ReactNode;
};


export type TocItem = {
    level: number;
    text: string;
    slug: string;
};


export type Post = {
    title: string;
    content: string;
    created_at: string;
    tags: string[] | null;
    table_of_contents: TocItem[] | null;
};


export interface PostSidebarProps {
    toc: TocItem[];
}
