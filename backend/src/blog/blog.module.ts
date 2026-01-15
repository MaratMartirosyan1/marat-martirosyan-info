import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';
import { AdminBlogController } from './admin.controller';
import { PostService } from './post.service';
import { Post } from './entities/post';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [BlogController, AdminBlogController],
  providers: [PostService],
  exports: [PostService],
})
export class BlogModule {}
