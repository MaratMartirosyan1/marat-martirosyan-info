import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [BlogModule, ProjectsModule],
})
export class AppModule {}
