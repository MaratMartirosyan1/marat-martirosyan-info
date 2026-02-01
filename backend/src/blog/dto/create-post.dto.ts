export class CreatePostDto {
  title: string;
  intro?: string;
  content: string;
  coverImage?: string;
  tags: string[];
  category: string;
  featured: boolean;
  status: 'draft' | 'published';
  author: string;
  readTime?: number;
}
