import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Admin } from '../auth/entities/admin';
import { Post } from '../blog/entities/post';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Admin, Post],
  synchronize: true,
});

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection initialized');

    const adminRepository = AppDataSource.getRepository(Admin);

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await adminRepository.findOne({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log(`Admin with email ${adminEmail} already exists`);
      process.exit(0);
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    const admin = adminRepository.create({
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    await adminRepository.save(admin);

    console.log(`Admin user created successfully`);
    console.log(`Email: ${adminEmail}`);
    console.log('Password: [use the password from .env]');

    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

seed();
