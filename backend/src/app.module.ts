import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { Post } from './blog/entities/post';
import { Admin } from './auth/entities/admin';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Post, Admin],
      synchronize: false,
      logging: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    BlogModule,
    ProjectsModule,
    UploadModule,
  ],
})
export class AppModule {}
