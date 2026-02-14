import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { AdminProjectsController } from './admin.controller';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController, AdminProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
