import { Controller, Get, Query, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { QueryPostsDto } from './dto/query-posts.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly postService: PostService) {}

  @Get('posts')
  getPublishedPosts(@Query() query: QueryPostsDto) {
    const { page = 1, pageSize = 10, search, category } = query;
    return this.postService.getPublished(page, pageSize, search, category);
  }

  @Get('featured')
  getFeaturedPosts(@Query('limit') limit?: number) {
    return this.postService.getFeatured(limit || 3);
  }

  @Get('posts/:slug')
  getPostBySlug(@Param('slug') slug: string) {
    return this.postService.getBySlug(slug, 'published');
  }
}
