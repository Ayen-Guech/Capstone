export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface Article {
    id: number;
    title: string;
    author: number;
    category: Category;
    content: string;
    image?: string;
    published_date: string;
    is_public: boolean;
}
