export class UpdatePostDto {
  title?: string;
  description?: string;
  content?: string;
  coverImage?: string;
  tags?: string[];
  category?: string;
  featured?: boolean;
  status?: 'draft' | 'published';
  author?: string;
  readTime?: number;
}
