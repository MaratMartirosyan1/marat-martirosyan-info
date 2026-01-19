import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DOMPurify from 'isomorphic-dompurify';
import { Post } from './entities/post';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiSingleResponse, ApiListResponse } from '../common/interfaces/api-response';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<ApiSingleResponse<Post>> {
    const slug = this.generateSlug(createPostDto.title);
    const sanitizedContent = this.sanitizeHtml(createPostDto.content);

    const post = this.postRepository.create({
      ...createPostDto,
      content: sanitizedContent,
      slug,
      readTime: createPostDto.readTime || this.calculateReadTime(sanitizedContent),
    });

    if (createPostDto.status === 'published') {
      post.publishedAt = new Date();
    }

    const saved = await this.postRepository.save(post);
    return { data: saved };
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<ApiSingleResponse<Post>> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (updatePostDto.title && updatePostDto.title !== post.title) {
      post.slug = this.generateSlug(updatePostDto.title);
    }

    if (updatePostDto.content) {
      updatePostDto.content = this.sanitizeHtml(updatePostDto.content);
      post.readTime = this.calculateReadTime(updatePostDto.content);
    }

    if (updatePostDto.status === 'published' && post.status === 'draft') {
      post.publishedAt = new Date();
    }

    Object.assign(post, updatePostDto);

    const saved = await this.postRepository.save(post);
    return { data: saved };
  }

  async delete(id: string): Promise<void> {
    const result = await this.postRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Post not found');
    }
  }

  async publish(id: string): Promise<ApiSingleResponse<Post>> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.status = 'published';
    post.publishedAt = new Date();

    const saved = await this.postRepository.save(post);
    return { data: saved };
  }

  async unpublish(id: string): Promise<ApiSingleResponse<Post>> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.status = 'draft';

    const saved = await this.postRepository.save(post);
    return { data: saved };
  }

  async getAll(page: number = 1, pageSize: number = 10, search?: string, status?: string): Promise<ApiListResponse<Post>> {
    const query = this.postRepository.createQueryBuilder('post');

    if (search) {
      query.where('post.title ILIKE :search OR post.content ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (status) {
      query.andWhere('post.status = :status', { status });
    }

    const [posts, totalCount] = await query
      .orderBy('post.createdAt', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return {
      data: posts,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / pageSize),
        totalCount,
        pageSize,
      },
    };
  }

  async getById(id: string): Promise<ApiSingleResponse<Post>> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return { data: post };
  }

  async getBySlug(slug: string, status?: string): Promise<ApiSingleResponse<Post>> {
    const query: any = { slug };
    if (status) {
      query.status = status;
    }

    const post = await this.postRepository.findOne({ where: query });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return { data: post };
  }

  async getPublished(page: number = 1, pageSize: number = 10, search?: string, category?: string): Promise<ApiListResponse<Post>> {
    const query = this.postRepository.createQueryBuilder('post')
      .where('post.status = :status', { status: 'published' });

    if (search) {
      query.andWhere('(post.title ILIKE :search OR post.content ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    if (category && category !== 'All Categories') {
      query.andWhere('post.category = :category', { category });
    }

    const [posts, totalCount] = await query
      .orderBy('post.publishedAt', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return {
      data: posts,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / pageSize),
        totalCount,
        pageSize,
      },
    };
  }

  async getFeatured(limit: number = 3): Promise<ApiListResponse<Post>> {
    const posts = await this.postRepository.find({
      where: { featured: true, status: 'published' },
      order: { publishedAt: 'DESC' },
      take: limit,
    });

    return {
      data: posts,
      meta: {
        currentPage: 1,
        totalPages: 1,
        totalCount: posts.length,
        pageSize: limit,
      },
    };
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  private sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3',
        'ul', 'ol', 'li', 'blockquote', 'code', 'pre',
        'a', 'img', 'span', 'div'
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
      ALLOW_DATA_ATTR: false,
    });
  }
}
