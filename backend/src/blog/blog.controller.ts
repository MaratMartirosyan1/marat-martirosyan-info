import { Controller, Get, Query, Param, NotFoundException } from '@nestjs/common';
import { BlogService } from './blog.service';
import { QueryPostsDto } from './dto/query-posts.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('posts')
  getAllPosts(@Query() query: QueryPostsDto) {
    return this.blogService.getAllPosts(query);
  }

  @Get('featured')
  getFeaturedPosts(@Query('limit') limit?: number) {
    return this.blogService.getFeaturedPosts(limit);
  }

  @Get('posts/:slug')
  getPostBySlug(@Param('slug') slug: string) {
    const post = this.blogService.getPostBySlug(slug);
    if (!post) {
      throw new NotFoundException(`Post with slug "${slug}" not found`);
    }
    return post;
  }
}
