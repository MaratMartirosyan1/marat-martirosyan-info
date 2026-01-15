import { Controller, Post as HttpPost, Get, Put, Delete, Patch, Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('admin/blog')
@UseGuards(JwtAuthGuard)
export class AdminBlogController {
  constructor(private readonly postService: PostService) {}

  @HttpPost('posts')
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get('posts')
  async getAll(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.postService.getAll(page, pageSize, search, status);
  }

  @Get('posts/:id')
  async getById(@Param('id') id: string) {
    return this.postService.getById(id);
  }

  @Put('posts/:id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete('posts/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.postService.delete(id);
  }

  @Patch('posts/:id/publish')
  async publish(@Param('id') id: string) {
    return this.postService.publish(id);
  }

  @Patch('posts/:id/unpublish')
  async unpublish(@Param('id') id: string) {
    return this.postService.unpublish(id);
  }
}
