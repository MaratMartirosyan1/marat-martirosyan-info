import { Injectable } from '@nestjs/common';
import { Post, PostsResponse } from './interfaces/post.interface';
import { QueryPostsDto } from './dto/query-posts.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BlogService {
  private posts: Post[];

  constructor() {
    this.loadPosts();
  }

  private loadPosts(): void {
    const dataPath = path.join(process.cwd(), 'src/assets/data/blog-metadata.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    this.posts = JSON.parse(rawData);
  }

  getAllPosts(query: QueryPostsDto): PostsResponse {
    const {
      page = 1,
      pageSize = 10,
      search = '',
      category,
      sortBy = 'date',
      sortOrder = 'desc',
    } = query;

    let filtered = [...this.posts];

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.description.toLowerCase().includes(searchLower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      );
    }

    if (category && category !== 'All Categories') {
      filtered = filtered.filter((post) => post.category === category);
    }

    filtered.sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;

      if (sortBy === 'date') {
        return order * (new Date(b.date).getTime() - new Date(a.date).getTime());
      }
      if (sortBy === 'title') {
        return order * a.title.localeCompare(b.title);
      }
      if (sortBy === 'readTime') {
        return order * (a.readTime - b.readTime);
      }
      return 0;
    });

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedPosts = filtered.slice(startIndex, startIndex + pageSize);

    return {
      data: paginatedPosts,
      currentPage: page,
      totalPages,
      totalCount,
      pageSize,
    };
  }

  getFeaturedPosts(limit: number = 3): PostsResponse {
    const featured = this.posts.filter((post) => post.featured).slice(0, limit);

    return {
      data: featured,
      currentPage: 1,
      totalPages: 1,
      totalCount: featured.length,
      pageSize: featured.length,
    };
  }

  getPostBySlug(slug: string): Post | undefined {
    return this.posts.find((post) => post.slug === slug);
  }
}
