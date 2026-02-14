import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  intro: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column('simple-array')
  technologies: string[];

  @Column()
  category: string;

  @Column({ nullable: true })
  demoUrl: string;

  @Column({ nullable: true })
  githubUrl: string;

  @Column({ default: false })
  featured: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
