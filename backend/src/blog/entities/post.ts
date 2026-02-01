import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  intro: string;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column('simple-array')
  tags: string[];

  @Column()
  category: string;

  @Column({ default: 0 })
  readTime: number;

  @Column({ default: false })
  featured: boolean;

  @Column({
    type: 'enum',
    enum: ['draft', 'published'],
    default: 'draft'
  })
  status: string;

  @Column()
  author: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;
}
