export class UpdatePostDto {
  title?: string;
  content?: string;
  coverImage?: string;
  tags?: string[];
  category?: string;
  featured?: boolean;
  status?: 'draft' | 'published';
  author?: string;
  readTime?: number;
}
