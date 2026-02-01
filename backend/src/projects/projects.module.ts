import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { AdminProjectsController } from './admin.controller';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [ProjectsController, AdminProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
