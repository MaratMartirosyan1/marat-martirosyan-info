# 📋 Angular Portfolio Application - Implementation Plan

## **Project Overview**
A modern portfolio website showcasing Angular SSR/SSG capabilities with:
- **SSG Pages**: Home, About, Projects (pre-rendered at build time for optimal performance)
- **SSR Pages**: Blog with dynamic content (server-rendered on request)
- **Tech Stack**: Angular 17+, Tailwind CSS, Angular Universal for SSR/SSG
- **Content**: Markdown/JSON files for blog posts
- **Theme**: Dark/Light mode with Angular's modern gradient colors and smooth animations

---

## **Architecture & Technical Approach**

### **1. Rendering Strategy**
```
SSG (Static Site Generation) - Build Time Pre-rendering:
├── / (home)
├── /about
├── /projects
├── /contact
└── /blog (list page - SSG for performance)

SSR (Server-Side Rendering) - Request Time:
└── /blog/:slug (individual blog posts - SSR for freshness)
```

### **2. Project Structure**
```
src/
├── app/
│   ├── core/                    # Singleton services, guards, interceptors
│   │   ├── services/
│   │   │   ├── blog.service.ts
│   │   │   ├── theme.service.ts
│   │   │   └── seo.service.ts
│   │   └── models/
│   ├── features/                # Feature modules
│   │   ├── home/
│   │   ├── about/
│   │   ├── projects/
│   │   ├── blog/
│   │   │   ├── blog-list/
│   │   │   └── blog-detail/
│   │   └── contact/
│   ├── shared/                  # Shared components, directives, pipes
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   ├── theme-toggle/
│   │   │   └── loading-spinner/
│   │   ├── directives/
│   │   │   └── fade-in.directive.ts
│   │   └── pipes/
│   │       └── markdown.pipe.ts
│   └── layouts/
│       └── main-layout/
├── assets/
│   ├── blog/                    # Markdown blog posts
│   │   └── posts/
│   ├── data/                    # JSON data files
│   │   ├── projects.json
│   │   └── blog-metadata.json
│   └── images/
└── styles/
    ├── tailwind.css
    └── animations.scss
```

### **3. Technology Stack**
- **Framework**: Angular 17+ with standalone components
- **SSR/SSG**: Angular Universal (`@angular/ssr`)
- **Styling**: Tailwind CSS with Angular gradient color system
- **Animations**: Angular Animations + custom CSS animations
- **Content**: Markdown-it for parsing markdown, JSON for metadata
- **Forms**: Reactive Forms with EmailJS for contact form
- **SEO**: Angular Meta service + structured data (JSON-LD)
- **Icons**: Lucide Angular or Heroicons

---

## **Feature Breakdown**

### **Phase 1: Foundation & Core Setup**
1. **Project Configuration**
   - Configure Tailwind CSS with Angular gradient theme colors
   - Set up Angular Universal for SSR/SSG
   - Configure prerendering routes in `angular.json`
   - Set up environment configurations

2. **Core Services**
   - Theme Service: Dark/Light mode with localStorage persistence
   - SEO Service: Dynamic meta tags, Open Graph, Twitter Cards
   - Blog Service: Load and parse markdown/JSON content

3. **Shared Components**
   - Header with navigation and theme toggle
   - Footer with social links
   - Loading states and animations
   - Layout component with route transitions

### **Phase 2: Static Pages (SSG)**
4. **Home Page** `/`
   - Hero section with animated introduction and gradient accents
   - Skills/technologies showcase
   - Featured projects (3-4 cards)
   - Recent blog posts preview (2-3 articles)
   - CTA to contact page
   - **SEO**: Meta tags, structured data for Person schema

5. **About Page** `/about`
   - Professional bio with photo
   - Skills & expertise with visual indicators
   - Experience timeline/journey
   - Education & certifications
   - Downloadable resume/CV link
   - **SEO**: Meta description, structured data

6. **Projects Page** `/projects`
   - Project cards grid with filtering
   - Categories: All, Angular, Full-Stack, etc.
   - Each project: image, title, description, tech stack, links (demo/GitHub)
   - Hover effects with gradient accents
   - **Data Source**: `assets/data/projects.json`
   - **SEO**: Meta tags, structured data for creative works

7. **Contact Page** `/contact`
   - Contact form (name, email, message)
   - Form validation with error messages
   - EmailJS integration for form submission
   - Social media links
   - Success/error toast notifications
   - **SEO**: Meta tags

### **Phase 3: Dynamic Pages (SSR)**
8. **Blog List Page** `/blog`
   - Blog post cards with excerpt
   - Category/tag filters
   - Search functionality (client-side)
   - Pagination or infinite scroll
   - Featured post highlight
   - **Data Source**: `assets/blog/posts/*.md` + metadata
   - **Rendering**: SSG for better performance

9. **Blog Detail Page** `/blog/:slug`
   - Markdown content rendering
   - Syntax highlighting for code blocks
   - Reading time estimate
   - Publication date
   - Tags/categories
   - Table of contents (if long posts)
   - Previous/Next post navigation
   - Social sharing buttons
   - **Rendering**: SSR for dynamic content
   - **SEO**: Dynamic meta tags, structured data for Article schema

### **Phase 4: Polish & Optimization**
10. **Animations & Transitions**
    - Page transition animations
    - Fade-in on scroll for sections
    - Smooth hover effects on cards/buttons
    - Loading state animations
    - Skeleton loaders where appropriate

11. **Theme System**
    - Dark/Light mode toggle in header
    - Smooth theme transitions with gradient accents
    - Persist preference in localStorage
    - System preference detection on first visit
    - CSS variables for theme colors

12. **SEO & Performance**
    - Meta tags for all pages
    - Open Graph and Twitter Card tags
    - Sitemap.xml generation
    - Robots.txt configuration
    - Structured data (JSON-LD) for rich snippets
    - Image optimization and lazy loading
    - Performance audit and optimization

13. **Content Setup**
    - Create sample blog posts (3-5 markdown files)
    - Add project data with images
    - Configure blog categories/tags
    - Add profile images and assets

---

## **Design & UI Considerations**

### **Color Scheme - Angular Renaissance Gradient**

#### **Angular Gradient Colors (v17+ Renaissance)**
```css
/* Primary Gradient: Red → Purple → Pink */
--angular-red: #DD0031;
--angular-crimson: #C3002F;
--angular-magenta: #BD0043;
--angular-purple: #A100FF;
--angular-pink: #E91E63;

/* Gradient Combinations */
--gradient-primary: linear-gradient(135deg, #DD0031 0%, #BD0043 50%, #E91E63 100%);
--gradient-vibrant: linear-gradient(135deg, #DD0031 0%, #A100FF 100%);
--gradient-accent: linear-gradient(135deg, #C3002F 0%, #BD0043 50%, #A100FF 100%);
```

#### **Light Mode**
- **Background**: Clean whites (#FFFFFF, #FAFAFA)
- **Surface**: Light grays (#F5F5F5, #EEEEEE)
- **Text**: Dark grays (#212121, #424242)
- **Primary**: Angular gradient (red → purple → pink)
- **Accents**: Use gradient on CTAs, links, and highlights
- **Borders**: Subtle grays (#E0E0E0)

#### **Dark Mode**
- **Background**: Deep dark (#0A0A0A, #121212)
- **Surface**: Dark grays (#1E1E1E, #2A2A2A)
- **Text**: Soft whites (#E0E0E0, #FAFAFA)
- **Primary**: Vibrant Angular gradient (more saturated)
- **Accents**: Glowing gradient effects on interactive elements
- **Borders**: Dark grays (#333333)

#### **Gradient Applications**
- **Hero Section**: Large gradient text or gradient background overlay
- **CTAs & Buttons**: Gradient backgrounds with hover effects
- **Links**: Gradient underlines or text color
- **Cards**: Gradient borders or subtle gradient overlays on hover
- **Icons**: Gradient fills for featured icons
- **Loading States**: Animated gradient skeleton loaders
- **Section Dividers**: Subtle gradient lines

### **Typography**
- Modern font pairing (e.g., Inter/Poppins for headings, system fonts for body)
- Proper font weights and sizes
- Good line height and spacing for readability

### **Components Style**
- Cards with subtle shadows and hover effects
- Gradient borders or accents on interactive elements
- Rounded corners for modern look
- Smooth transitions on all interactions
- Glassmorphism effects with gradient accents (optional, subtle)
- Grid layouts with responsive breakpoints

### **Animations**
- Page transitions using Angular route animations
- Scroll-triggered fade-ins using Intersection Observer
- Hover effects: scale, glow with gradient, shadow changes
- Loading spinners with gradient colors
- Smooth theme toggle transition
- Gradient animation on hero elements (subtle shift)

---

## **Implementation Phases**

### **Phase 1: Foundation**
- ✅ Configure Angular project with SSR/SSG
- ✅ Set up Tailwind CSS with Angular gradient colors
- ✅ Create core services (Theme, SEO, Blog)
- ✅ Build shared components (Header, Footer, Layout)
- ✅ Implement theme switcher with gradient accents
- ✅ Set up routing and lazy loading

### **Phase 2: Static Pages**
- ✅ Build Home page with hero and gradient sections
- ✅ Create About page with bio and skills
- ✅ Develop Projects page with filtering
- ✅ Create Contact page with form
- ✅ Add basic animations with gradient effects

### **Phase 3: Blog System**
- ✅ Set up markdown parsing
- ✅ Create Blog list page with filters
- ✅ Build Blog detail page with SSR
- ✅ Implement tags/categories system
- ✅ Add syntax highlighting for code

### **Phase 4: Polish**
- ✅ Enhance animations and transitions
- ✅ Complete SEO optimization
- ✅ Add all meta tags and structured data
- ✅ Create sample content (blogs, projects)
- ✅ Performance optimization
- ✅ Cross-browser testing
- ✅ Generate sitemap and configure robots.txt

---

## **Technical Implementation Details**

### **SSG Configuration** (`angular.json`)
```json
"prerender": {
  "builder": "@angular/build:prerender",
  "options": {
    "routes": [
      "/",
      "/about",
      "/projects",
      "/contact",
      "/blog"
    ]
  }
}
```

### **Tailwind Configuration with Angular Colors**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        angular: {
          red: '#DD0031',
          crimson: '#C3002F',
          magenta: '#BD0043',
          purple: '#A100FF',
          pink: '#E91E63',
        }
      },
      backgroundImage: {
        'gradient-angular': 'linear-gradient(135deg, #DD0031 0%, #BD0043 50%, #E91E63 100%)',
        'gradient-vibrant': 'linear-gradient(135deg, #DD0031 0%, #A100FF 100%)',
        'gradient-accent': 'linear-gradient(135deg, #C3002F 0%, #BD0043 50%, #A100FF 100%)',
      }
    }
  }
}
```

### **SSR for Dynamic Routes**
- Blog detail pages will use SSR
- Route parameters extracted server-side
- Content loaded from markdown files
- Meta tags injected during SSR

### **Content Management**
- Blog posts: `assets/blog/posts/*.md`
- Metadata: Frontmatter in markdown or separate JSON
- Projects: `assets/data/projects.json`
- Categories/tags: Defined in blog metadata

### **Deployment Considerations**
- **SSG Pages**: Can be served as static files from CDN
- **SSR Pages**: Require Node.js server (can use Vercel, Netlify with functions)
- Build commands: `npm run build:prerender` for SSG, `npm run serve:ssr` for SSR

---

## **Suggested Additional Features** (Optional Enhancements)
- 📊 Analytics integration (Google Analytics 4)
- 🔍 Advanced blog search with Algolia
- 💬 Comments system for blog (Giscus or Disqus)
- 📱 Progressive Web App (PWA) capabilities
- 🌐 Internationalization (i18n) support
- 📈 View counter for blog posts
- 🎨 Animated gradient cursor effects
- ✨ Particle effects on hero section with gradient colors

---

## **Summary**

This plan creates a **professional, modern portfolio** that effectively demonstrates:
- ✅ Angular SSR capabilities (blog posts)
- ✅ Angular SSG capabilities (static pages)
- ✅ Modern UI/UX with Tailwind CSS and Angular gradient colors
- ✅ Professional animations and interactions
- ✅ SEO best practices
- ✅ Dark/Light theme support with gradient accents
- ✅ Content management via markdown/JSON
- ✅ Scalable architecture for future enhancements

**The result**: A showcase-worthy portfolio that highlights your Angular expertise with Angular's iconic Renaissance branding while providing a platform for your content and projects.

---

## **Key Highlights**
- 🎨 **Modern Angular Branding**: Red → Purple → Pink gradient theme throughout
- ⚡ **Performance**: SSG for static content, SSR for dynamic blog posts
- 🌓 **Theme Support**: Dark/Light modes with gradient-enhanced UI
- 📱 **Responsive**: Mobile-first design with Tailwind CSS
- 🔍 **SEO Optimized**: Meta tags, structured data, sitemap
- ✨ **Polished UX**: Smooth animations, gradient accents, professional feel
- 📝 **Content Ready**: Blog system with markdown support and categorization
- 📧 **Interactive**: Contact form with EmailJS integration

---

## **NEW FEATURE: Admin Panel for Blog Management**

### **Overview**
Add a complete blog management system with an admin panel similar to Medium/dev.to for creating, editing, and managing blog posts with rich text content.

### **Feature Requirements**
- **Admin Authentication**: Simple password protection with JWT tokens
- **Rich Text Editor**: WYSIWYG editor (Quill/TinyMCE) for content creation
- **Image Uploads**: Cloud storage integration (AWS S3)
- **Full CRUD**: Create, Read, Update, Delete operations for blog posts
- **Draft/Publish Workflow**: Save posts as drafts before publishing
- **Protected Routes**: Admin pages only accessible with valid authentication
- **Modern UI**: Clean, professional interface like Medium/dev.to

---

## **Backend Changes (NestJS)**

### **1. Database Setup - PostgreSQL**

#### **Install Dependencies**
```bash
npm install @nestjs/typeorm typeorm pg
npm install @nestjs/config
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install bcrypt
npm install @types/bcrypt @types/passport-jwt --save-dev
```

#### **Database Schema - Post Entity**
```typescript
// backend/src/blog/entities/post.entity.ts
@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  content: string; // HTML content from WYSIWYG editor

  @Column()
  coverImage: string; // URL from cloud storage

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
```

#### **Database Schema - Admin User Entity**
```typescript
// backend/src/auth/entities/admin.entity.ts
@Entity('admins')
export class AdminEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Hashed with bcrypt

  @Column({ default: 'admin' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

### **2. Authentication Module**

#### **File Structure**
```
backend/src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── entities/
│   │   └── admin.entity.ts
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── auth-response.dto.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   └── strategies/
│       └── jwt.strategy.ts
```

#### **Key Features**
- **POST /auth/login**: Login with email/password, returns JWT token
- **JWT Strategy**: Validates token and extracts admin info
- **JWT Guard**: Protects admin routes
- **Password Hashing**: Use bcrypt with salt rounds

### **3. Enhanced Blog Module**

#### **New CRUD Endpoints (Protected)**
```typescript
// backend/src/blog/admin-blog.controller.ts
@Controller('admin/blog')
@UseGuards(JwtAuthGuard) // All routes require authentication
export class AdminBlogController {

  @Post('posts')
  createPost(@Body() createPostDto: CreatePostDto) {
    // Create new post (draft or published)
  }

  @Put('posts/:id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    // Update existing post
  }

  @Delete('posts/:id')
  deletePost(@Param('id') id: string) {
    // Delete post
  }

  @Patch('posts/:id/publish')
  publishPost(@Param('id') id: string) {
    // Change status from draft to published
  }

  @Patch('posts/:id/unpublish')
  unpublishPost(@Param('id') id: string) {
    // Change status from published to draft
  }
}
```

#### **Updated Public Endpoints**
```typescript
// backend/src/blog/blog.controller.ts
@Controller('blog')
export class BlogController {

  @Get('posts')
  getAllPosts(@Query() query: QueryPostsDto) {
    // Only return published posts
  }

  @Get('posts/:slug')
  getPostBySlug(@Param('slug') slug: string) {
    // Only return published post with full content
  }
}
```

#### **DTOs**
```typescript
// backend/src/blog/dto/create-post.dto.ts
export class CreatePostDto {
  title: string;
  description: string;
  content: string; // HTML from editor
  coverImage?: string;
  tags: string[];
  category: string;
  featured: boolean;
  status: 'draft' | 'published';
  author: string;
}

// backend/src/blog/dto/update-post.dto.ts
export class UpdatePostDto extends PartialType(CreatePostDto) {}
```

### **4. Image Upload Module**

#### **Install Dependencies**
```bash
npm install @nestjs/platform-express multer
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
npm install @types/multer --save-dev
```

#### **File Structure**
```
backend/src/
├── upload/
│   ├── upload.module.ts
│   ├── upload.controller.ts
│   └── upload.service.ts
```

#### **Features**
- **POST /upload/image**: Upload image to AWS S3, return URL
- **File Validation**: Check file type, size limits
- **Image Optimization**: Automatic resizing and format conversion
- **Protected Route**: Requires JWT authentication

### **5. Configuration Updates**

#### **Environment Variables (.env)**
```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=portfolio_db

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRATION=7d

# AWS S3
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_S3_BUCKET=your_bucket_name

# Admin (for initial setup)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
```

#### **TypeORM Configuration**
```typescript
// backend/src/app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [PostEntity, AdminEntity],
      synchronize: true, // Disable in production
    }),
    AuthModule,
    BlogModule,
    UploadModule,
  ],
})
export class AppModule {}
```

### **6. Database Seeding (Optional)**

Create a seed script to:
- Create initial admin user
- Migrate existing blog posts from JSON to database

---

## **Frontend Changes (Angular)**

### **1. Admin Module Structure**

```
src/app/features/
├── admin/
│   ├── admin.routes.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── admin-blog.service.ts
│   ├── login/
│   │   └── login.component.ts
│   ├── dashboard/
│   │   └── dashboard.component.ts
│   ├── post-editor/
│   │   ├── post-editor.component.ts
│   │   ├── post-editor.component.html
│   │   └── post-editor.component.scss
│   ├── post-list/
│   │   └── post-list.component.ts
│   └── components/
│       ├── rich-text-editor/
│       │   └── rich-text-editor.component.ts
│       └── image-uploader/
│           └── image-uploader.component.ts
```

### **2. Install Frontend Dependencies**

```bash
npm install @angular/forms
npm install quill ngx-quill
npm install @auth0/angular-jwt
```

### **3. Authentication Service**

#### **Features**
- Login with email/password
- Store JWT token in localStorage
- Auto-refresh token
- Logout functionality
- Auth state management with signals

```typescript
// admin/services/auth.service.ts
export class AuthService {
  private tokenSignal = signal<string | null>(null);
  isAuthenticated = computed(() => !!this.tokenSignal());

  login(email: string, password: string): Observable<AuthResponse> {
    // POST /auth/login
  }

  logout(): void {
    // Clear token and redirect
  }

  getToken(): string | null {
    // Return stored token
  }
}
```

### **4. Auth Guard**

Protect admin routes from unauthorized access:

```typescript
// admin/guards/auth.guard.ts
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/admin/login']);
  return false;
};
```

### **5. Admin Routes**

```typescript
// admin/admin.routes.ts
export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'posts',
        component: PostListComponent,
      },
      {
        path: 'posts/new',
        component: PostEditorComponent,
      },
      {
        path: 'posts/edit/:id',
        component: PostEditorComponent,
      },
    ],
  },
];
```

### **6. Login Component**

- Email/password form with validation
- Error handling (invalid credentials, network errors)
- Redirect to dashboard after successful login
- Gradient-themed UI matching portfolio design

### **7. Post Editor Component (Key Feature)**

#### **UI Layout (Similar to Medium/dev.to)**
```
┌─────────────────────────────────────────────────┐
│  [← Back to Posts]              [Save Draft] [Publish] │
├─────────────────────────────────────────────────┤
│  Cover Image Upload (drag & drop or click)     │
├─────────────────────────────────────────────────┤
│  Title: [Large input field]                    │
├─────────────────────────────────────────────────┤
│  Description: [Textarea]                        │
├─────────────────────────────────────────────────┤
│  Category: [Dropdown]                           │
│  Tags: [Tag input with autocomplete]           │
│  Featured: [Toggle]                             │
├─────────────────────────────────────────────────┤
│  Rich Text Editor (Quill)                      │
│  ┌─────────────────────────────────────────┐  │
│  │ [B] [I] [U] [H1] [H2] [•] [1] [link] [img]│  │
│  ├─────────────────────────────────────────┤  │
│  │                                          │  │
│  │  Content goes here...                   │  │
│  │                                          │  │
│  └─────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

#### **Features**
- **WYSIWYG Editor**: Quill with custom toolbar
  - Text formatting: Bold, Italic, Underline, Strikethrough
  - Headings: H1, H2, H3
  - Lists: Ordered, Unordered
  - Links: Insert/edit hyperlinks
  - Images: Upload or paste images
  - Code blocks: Syntax highlighting
  - Blockquotes
- **Cover Image Upload**: Drag & drop or click to upload
- **Real-time Preview**: See how post will look (optional)
- **Auto-save Drafts**: Save every 30 seconds
- **Tag Management**: Add/remove tags with autocomplete
- **Category Selection**: Dropdown with existing categories
- **Status Toggle**: Draft or Published
- **Validation**: Required fields, character limits

### **8. Rich Text Editor Component**

```typescript
// admin/components/rich-text-editor/rich-text-editor.component.ts
export class RichTextEditorComponent {
  content = input<string>('');
  contentChange = output<string>();

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      [{ color: [] }, { background: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  onContentChange(content: string): void {
    this.contentChange.emit(content);
  }
}
```

### **9. Image Uploader Component**

- Drag & drop zone
- Click to browse
- Image preview before upload
- Progress indicator during upload
- Support for multiple formats (JPEG, PNG, WebP)
- File size validation (max 5MB)
- Returns S3 URL

### **10. Post List Component (Admin Dashboard)**

- Table view of all posts (drafts + published)
- Columns: Title, Status, Category, Date, Actions
- Filter by status (All, Draft, Published)
- Search by title
- Actions: Edit, Delete, Publish/Unpublish
- Pagination
- Sort by date, title

### **11. Admin Blog Service**

```typescript
// admin/services/admin-blog.service.ts
export class AdminBlogService {
  private http = inject(HttpClient);

  createPost(postData: CreatePostDto): Observable<Post> {
    return this.http.post<Post>('/admin/blog/posts', postData);
  }

  updatePost(id: string, postData: UpdatePostDto): Observable<Post> {
    return this.http.put<Post>(`/admin/blog/posts/${id}`, postData);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`/admin/blog/posts/${id}`);
  }

  publishPost(id: string): Observable<Post> {
    return this.http.patch<Post>(`/admin/blog/posts/${id}/publish`, {});
  }

  unpublishPost(id: string): Observable<Post> {
    return this.http.patch<Post>(`/admin/blog/posts/${id}/unpublish`, {});
  }
}
```

### **12. HTTP Interceptor for JWT**

```typescript
// core/interceptors/auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
```

### **13. Updated Blog Detail Component**

- Display HTML content from database (sanitized)
- Render rich text with proper formatting
- Support embedded images
- Code syntax highlighting with Prism.js or highlight.js

```typescript
// features/blog/blog-detail/blog-detail.component.ts
export class BlogDetailComponent {
  post = signal<Post | null>(null);
  sanitizedContent = computed(() => {
    const post = this.post();
    if (!post) return '';
    return this.sanitizer.sanitize(SecurityContext.HTML, post.content) || '';
  });
}
```

---

## **Database Setup & Configuration (PREREQUISITE)**

### **Overview**
Before proceeding with the admin panel implementation, PostgreSQL must be properly installed, configured, and connected to the backend.

### **Step 1: Install PostgreSQL**

#### **Windows**
1. Download PostgreSQL installer from https://www.postgresql.org/download/windows/
2. Run the installer and follow the setup wizard
3. Remember the password you set for the `postgres` user
4. Default port is `5432`

#### **macOS**
```bash
# Using Homebrew
brew install postgresql@15
brew services start postgresql@15
```

#### **Linux (Ubuntu/Debian)**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### **Step 2: Create Database and User**

#### **Option A: Using psql CLI**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE portfolio_db;

# Verify database was created
\l

# Exit
\q
```

#### **Option B: Using pgAdmin (GUI)**
1. Open pgAdmin
2. Right-click on "Databases" → "Create" → "Database"
3. Name: `portfolio_db`
4. Owner: `postgres`
5. Click "Save"

### **Step 3: Configure Environment Variables**

Update `backend/.env` with your actual PostgreSQL credentials:

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=YOUR_ACTUAL_POSTGRES_PASSWORD
DATABASE_NAME=portfolio_db
```

**Important**: Replace `YOUR_ACTUAL_POSTGRES_PASSWORD` with the password you set during PostgreSQL installation.

### **Step 4: Verify Connection**

Run the backend to verify the database connection:
```bash
cd backend
npm run start:dev
```

**Expected Success Output:**
```
[Nest] LOG [TypeOrmModule] Database connection established
```

**If you see authentication errors:**
1. Double-check the password in `.env`
2. Ensure PostgreSQL service is running
3. Verify the database `portfolio_db` exists

### **Step 5: Create Initial Admin User**

After the database is connected, run the seed script to create the admin user:
```bash
cd backend
npm run seed:admin
```

This will create an admin user with credentials from `.env`:
- Email: `ADMIN_EMAIL`
- Password: `ADMIN_PASSWORD`

### **Troubleshooting**

#### **Error: "password authentication failed for user postgres"**
- The password in `.env` doesn't match your PostgreSQL password
- Solution: Update `DATABASE_PASSWORD` in `.env`

#### **Error: "database portfolio_db does not exist"**
- The database hasn't been created yet
- Solution: Run `CREATE DATABASE portfolio_db;` in psql

#### **Error: "could not connect to server: Connection refused"**
- PostgreSQL service is not running
- Solution: Start the PostgreSQL service
  - Windows: `net start postgresql-x64-15`
  - macOS: `brew services start postgresql@15`
  - Linux: `sudo systemctl start postgresql`

#### **Error: "role postgres does not exist"**
- PostgreSQL user doesn't exist
- Solution: Create the user or use a different username

---

## **AWS S3 Setup (For Image Uploads)**

### **Step 1: Create AWS Account & S3 Bucket**
1. Go to https://aws.amazon.com/
2. Sign up or log into your AWS account
3. Navigate to S3 in the AWS Console
4. Create a new bucket with appropriate settings
5. Configure bucket permissions and CORS policy

### **Step 2: Create IAM User for API Access**
1. Navigate to IAM in the AWS Console
2. Create a new IAM user with programmatic access
3. Attach `AmazonS3FullAccess` policy (or a more restrictive custom policy)
4. Save the Access Key ID and Secret Access Key

### **Step 3: Update Environment Variables**

Update `backend/.env`:
```env
# AWS S3
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_actual_access_key_id
AWS_SECRET_ACCESS_KEY=your_actual_secret_access_key
AWS_S3_BUCKET=your_actual_bucket_name
```

---

## **Implementation Phases**

### **Phase 5: Admin Panel & Database Integration**

#### **Prerequisite Tasks (Database Setup)**
1. ⬜ Install PostgreSQL locally
2. ⬜ Create `portfolio_db` database
3. ⬜ Configure `.env` with correct database credentials
4. ⬜ Verify database connection (start backend without errors)
5. ⬜ Set up AWS S3 bucket and configure credentials

#### **Backend Tasks**
6. ✅ Install and configure TypeORM
7. ✅ Create Post and Admin entities
8. ✅ Create AuthModule with JWT strategy
9. ✅ Implement admin login endpoint
10. ✅ Create JWT guard for protected routes
11. ✅ Implement admin blog CRUD endpoints
12. ✅ Set up AWS S3 integration
13. ✅ Create image upload endpoint
14. ✅ Update public blog endpoints to filter published posts
15. ⬜ Create database seeding script for admin user
16. ⬜ Test all endpoints with Postman/Insomnia

#### **Frontend Tasks**
13. ✅ Create admin module with routing
14. ✅ Install Quill editor and dependencies
15. ✅ Create AuthService with JWT handling
16. ✅ Implement auth guard
17. ✅ Build login component
18. ✅ Create post editor component with Quill
19. ✅ Build rich text editor wrapper component
20. ✅ Create image uploader component
21. ✅ Build post list/dashboard component
22. ✅ Implement admin blog service
23. ✅ Add HTTP interceptor for JWT tokens
24. ✅ Update blog detail component for HTML rendering
25. ✅ Add code syntax highlighting
26. ✅ Style admin panel with Angular gradient theme
27. ✅ Add loading states and error handling
28. ✅ Test complete flow: login → create post → publish → view

### **Phase 6: Testing & Security**
29. ✅ Add input sanitization for XSS prevention
30. ✅ Implement CSRF protection
31. ✅ Add rate limiting on auth endpoints
32. ✅ Test image upload and validation
33. ✅ Test draft/publish workflow
34. ✅ Validate all forms
35. ✅ Add error boundaries
36. ✅ Test on mobile devices
37. ✅ Security audit

---

## **Security Considerations**

### **Backend**
- ✅ Hash passwords with bcrypt (salt rounds: 10)
- ✅ Use secure JWT secret (environment variable)
- ✅ Set JWT expiration (7 days recommended)
- ✅ Implement rate limiting on login endpoint
- ✅ Validate and sanitize all inputs
- ✅ Use parameterized queries (TypeORM handles this)
- ✅ Enable CORS only for frontend domain
- ✅ Add request size limits
- ✅ Implement CSRF protection

### **Frontend**
- ✅ Store JWT in localStorage
- ✅ Sanitize HTML content before rendering
- ✅ Implement route guards for admin pages
- ✅ Clear sensitive data on logout
- ✅ Add CSRF token to requests
- ✅ Validate file uploads (type, size)
- ✅ Use HTTPS in production

---

## **Technology Stack Updates**

### **Backend**
- **Database**: PostgreSQL 15+
- **ORM**: TypeORM
- **Auth**: JWT with Passport.js
- **Image Storage**: AWS S3
- **Hashing**: bcrypt

### **Frontend**
- **Rich Text Editor**: Quill (ngx-quill)
- **HTTP**: Angular HttpClient with interceptors
- **Auth**: @auth0/angular-jwt
- **Syntax Highlighting**: Prism.js or highlight.js

---

## **Migration Strategy**

### **Migrate Existing Posts from JSON to Database**

Create a migration script:
```typescript
// backend/src/scripts/migrate-posts.ts
async function migratePosts() {
  const jsonPosts = JSON.parse(fs.readFileSync('blog-metadata.json'));

  for (const post of jsonPosts) {
    await postRepository.save({
      ...post,
      content: '<p>Placeholder content - needs manual update</p>',
      status: 'published',
      publishedAt: new Date(post.date),
    });
  }
}
```

---

## **Deployment Considerations**

### **Environment-Specific Configurations**

#### **Development**
- Local PostgreSQL database
- TypeORM `synchronize: true`
- Detailed error messages

#### **Production**
- Managed PostgreSQL (AWS RDS, Heroku Postgres, etc.)
- TypeORM `synchronize: false` + migrations
- Generic error messages
- Enable HTTPS
- Set secure JWT secret
- Configure CORS for production domain

---

## **Optional Enhancements**

### **Future Improvements**
- 📝 Markdown support alongside WYSIWYG
- 🔖 Post versioning and revision history
- 📅 Schedule posts for future publishing
- 👥 Multiple admin users with roles
- 📊 Post analytics (views, reading time)
- 💬 Comments management from admin panel
- 🔍 SEO preview and optimization suggestions
- 🖼️ Image gallery/media library
- 📱 Mobile app for content creation
- 🌐 Multi-language support
- 🎨 Custom themes for blog posts
- 📧 Email notifications on new posts

---

## **Summary of Changes**

### **What's New**
✅ **Full Blog Management System**: CRUD operations for blog posts
✅ **Admin Authentication**: Secure login with JWT tokens
✅ **Rich Text Editor**: WYSIWYG editor similar to Medium/dev.to
✅ **Image Uploads**: Cloud storage integration with Cloudinary/S3
✅ **Draft/Publish Workflow**: Save drafts before publishing
✅ **Database Integration**: PostgreSQL for dynamic content
✅ **Protected Admin Routes**: Secure admin panel
✅ **Modern UI**: Professional post creation experience

### **What Stays the Same**
✅ All existing static pages (Home, About, Projects, Contact)
✅ Public blog listing and detail pages
✅ SSR for blog detail pages
✅ Angular gradient theme
✅ Dark/Light mode
✅ SEO optimization

---

## **Next Steps**

### **Completed Phases**
1. ~~Configure Tailwind CSS with Angular gradient colors~~
2. ~~Set up Angular Universal and core services~~
3. ~~Build shared components with gradient-enhanced UI~~
4. ~~Implement static pages (Home, About, Projects, Contact)~~
5. ~~Create blog system with SSR for detail pages~~
6. ~~Add animations, theme system, and SEO~~
7. ~~Create sample content and final polish~~

### **Current Phase: Database & Admin Panel Setup**

#### **Step 1: Database Setup (BLOCKING - Do This First)**
- [ ] Install PostgreSQL on your machine
- [ ] Create `portfolio_db` database
- [ ] Update `backend/.env` with correct PostgreSQL password
- [ ] Start backend and verify database connection works

#### **Step 2: AWS S3 Setup**
- [ ] Create AWS S3 bucket with appropriate settings
- [ ] Create IAM user with S3 access
- [ ] Update `backend/.env` with AWS credentials

#### **Step 3: Admin User Seeding**
- [ ] Create database seeding script
- [ ] Run seed script to create initial admin user
- [ ] Test admin login

#### **Step 4: Test Complete Flow**
- [ ] Test admin login endpoint
- [ ] Test blog CRUD operations
- [ ] Test image upload
- [ ] Test full flow: login → create post → publish → view on frontend

#### **Step 5: Frontend Admin Panel Verification**
- [ ] Verify admin routes are protected
- [ ] Test post editor with Quill
- [ ] Test image uploader
- [ ] Verify blog detail page renders HTML content correctly

### **Future Enhancements**
- Migrate existing JSON posts to database
- Add post analytics
- Implement comments system
- Add SEO preview in editor

---

## **Phase 7: Enhanced Admin Panel & Project Management**

### **Overview**
Enhance the admin experience with a proper layout architecture, unified content management for both Posts and Projects, and improved header authentication UI.

### **Key Features**
1. ~~**Header Enhancement**: "My Account" dropdown visible when authenticated~~ ✅ DONE
2. **Route-Based Layouts**: Auth layout for login, Main layout for everything else
3. **Admin Content with Sidebar**: Sidebar inside content area for admin pages
4. **Unified Content Management**: Posts and Projects with same workflow
5. **Card-Based List Views**: Visual cards with actions (edit, duplicate, delete, archive, open, publish)
6. **Status Workflow**: Draft → Published → Archived for both Posts and Projects

---

### **1. Header Authentication UI** ✅ COMPLETED

- Added "My Account" dropdown (visible only when `isAuthenticated()` is true)
- Dropdown contents: Dashboard link → `/admin`, Logout button
- Mobile: Added "My Account" section to mobile menu
- Logo always links to home page (/)
- Theme toggle works everywhere

---

### **2. Layout Architecture**

#### **Current Problem**
- `app.html` renders `<app-main-layout />` which wraps ALL routes
- Login page incorrectly shows site header/footer

#### **Solution: Route-Based Layouts**

##### **Login Page (Auth Layout)**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    ┌─────────────────┐                      │
│                    │      LOGO       │                      │
│                    │       MM        │                      │
│                    ├─────────────────┤                      │
│                    │  Email input    │                      │
│                    │  Password input │                      │
│                    │  [Login Button] │                      │
│                    └─────────────────┘                      │
│                                                             │
│                              [Theme toggle in corner]       │
└─────────────────────────────────────────────────────────────┘
```
- No header/footer
- Centered login card with logo
- Theme toggle in corner
- Redirects to `/admin/posts` on success

##### **Admin Pages (Main Layout + Sidebar Content)**
```
┌─────────────────────────────────────────────────────────────┐
│  Header (Logo→/, nav links, theme toggle, My Account ▼)     │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┬──────────────────────────────────────────┐    │
│  │ Sidebar  │                                          │    │
│  │          │                                          │    │
│  │ [Posts]  │         Content Area                     │    │
│  │ [Proj.]  │         (cards, editor, etc.)            │    │
│  │          │                                          │    │
│  └──────────┴──────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│  Footer                                                     │
└─────────────────────────────────────────────────────────────┘
```
- Uses Main Layout (header + footer)
- Sidebar is INSIDE the content area
- Sidebar has Posts and Projects links
- Content shows cards/editors

#### **File Changes**
```
frontentd/src/app/
├── app.html                              # Change to just <router-outlet />
├── app.ts                                # Remove MainLayoutComponent import
├── app.routes.ts                         # Restructure with layout parents
└── layouts/
    ├── main-layout/
    │   └── main-layout.ts                # Existing (for public + admin pages)
    └── auth-layout/
        └── auth-layout.ts                # NEW (for login page only)

frontentd/src/app/features/admin/
├── components/
│   └── admin-sidebar/
│       └── admin-sidebar.ts              # NEW (sidebar component)
└── layouts/
    └── admin-content/
        └── admin-content.ts              # NEW (sidebar + router-outlet wrapper)
```

---

### **3. Updated Route Structure**

```typescript
// app.routes.ts
export const routes: Routes = [
  // Login page - Auth Layout (no header/footer)
  {
    path: 'admin/login',
    loadComponent: () => import('./layouts/auth-layout/auth-layout')
      .then(m => m.AuthLayout),
    children: [
      { path: '', loadComponent: () => import('./features/admin/login/login').then(m => m.Login) }
    ]
  },

  // All other pages - Main Layout (header + footer)
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout')
      .then(m => m.MainLayout),
    children: [
      // Public pages
      { path: '', loadComponent: () => import('./features/home/home').then(m => m.Home) },
      { path: 'about', loadComponent: () => import('./features/about/about').then(m => m.About) },
      { path: 'projects', loadComponent: () => import('./features/projects/projects').then(m => m.Projects) },
      { path: 'blog', loadComponent: () => import('./features/blog/blog-list/blog-list').then(m => m.BlogList) },
      { path: 'blog/:slug', loadComponent: () => import('./features/blog/blog-detail/blog-detail').then(m => m.BlogDetail) },
      { path: 'contact', loadComponent: () => import('./features/contact/contact').then(m => m.Contact) },

      // Admin pages (with sidebar inside content)
      {
        path: 'admin',
        canActivate: [authGuard],
        loadComponent: () => import('./features/admin/layouts/admin-content/admin-content')
          .then(m => m.AdminContent),
        children: [
          { path: '', redirectTo: 'posts', pathMatch: 'full' },
          { path: 'posts', loadComponent: () => import('./features/admin/post-list/post-list').then(m => m.PostList) },
          { path: 'posts/new', loadComponent: () => import('./features/admin/post-editor/post-editor').then(m => m.PostEditor) },
          { path: 'posts/edit/:id', loadComponent: () => import('./features/admin/post-editor/post-editor').then(m => m.PostEditor) },
          { path: 'projects', loadComponent: () => import('./features/admin/project-list/project-list').then(m => m.ProjectList) },
          { path: 'projects/new', loadComponent: () => import('./features/admin/project-editor/project-editor').then(m => m.ProjectEditor) },
          { path: 'projects/edit/:id', loadComponent: () => import('./features/admin/project-editor/project-editor').then(m => m.ProjectEditor) },
        ]
      }
    ]
  },

  { path: '**', redirectTo: '' }
];
```

---

### **4. Content Card Component**

#### **Design**
```
┌─────────────────────────────────────────────────────────┐
│  ┌──────────┐                                           │
│  │          │  Title                        [Published] │
│  │  Image   │  Description excerpt...                   │
│  │          │  Category • 5 min read                    │
│  └──────────┘                                           │
├─────────────────────────────────────────────────────────┤
│  [Edit] [Duplicate] [Open] │ [Archive] [Delete] [Pub.] │
└─────────────────────────────────────────────────────────┘
```

#### **Card Actions**
| Action | Description | Availability |
|--------|-------------|--------------|
| **Edit** | Navigate to editor | All statuses |
| **Duplicate** | Create copy with "Copy of [title]" | All statuses |
| **Open** | Open public page in new tab | Published only |
| **Archive** | Move to archived status | Draft, Published |
| **Delete** | Permanent deletion (with confirmation) | All statuses |
| **Publish** | Change status to published | Draft only |
| **Unpublish** | Change status to draft | Published only |
| **Restore** | Change status to draft | Archived only |

#### **Status Badges**
- **Draft**: Yellow/amber badge
- **Published**: Green badge
- **Archived**: Gray badge

---

### **5. Posts Management (Enhanced)**

#### **Current State**
- Post model has `status: 'draft' | 'published'`
- PostList exists but needs card view and filters

#### **Changes Required**

##### **Update Post Model**
```typescript
// post.model.ts
export type PostStatus = 'draft' | 'published' | 'archived';

export interface Post {
  // ... existing fields
  status?: PostStatus;  // Update type
}
```

##### **Backend Changes**
```typescript
// Update PostEntity status enum
@Column({
  type: 'enum',
  enum: ['draft', 'published', 'archived'],
  default: 'draft'
})
status: string;

// Add new endpoints
@Patch('posts/:id/archive')
archivePost(@Param('id') id: string) { /* ... */ }

@Patch('posts/:id/restore')
restorePost(@Param('id') id: string) { /* ... */ }

@Post('posts/:id/duplicate')
duplicatePost(@Param('id') id: string) { /* ... */ }
```

##### **PostList Component Updates**
- Replace table with card grid
- Add status filter tabs: All | Draft | Published | Archived
- Add search input
- Add "New Post" button
- Implement card actions

---

### **6. Projects Management (New)**

#### **Backend Changes**

##### **New Project Entity**
```typescript
// backend/src/projects/entities/project.entity.ts
@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  content: string;  // Rich text description

  @Column()
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

  @Column({
    type: 'enum',
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  })
  status: string;

  @Column({ default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

##### **New Admin Project Endpoints**
```typescript
// backend/src/projects/admin-projects.controller.ts
@Controller('admin/projects')
@UseGuards(JwtAuthGuard)
export class AdminProjectsController {
  @Get()
  getAllProjects(@Query() query: QueryProjectsDto) { /* include all statuses */ }

  @Post()
  createProject(@Body() dto: CreateProjectDto) { /* ... */ }

  @Put(':id')
  updateProject(@Param('id') id: string, @Body() dto: UpdateProjectDto) { /* ... */ }

  @Delete(':id')
  deleteProject(@Param('id') id: string) { /* ... */ }

  @Patch(':id/publish')
  publishProject(@Param('id') id: string) { /* ... */ }

  @Patch(':id/unpublish')
  unpublishProject(@Param('id') id: string) { /* ... */ }

  @Patch(':id/archive')
  archiveProject(@Param('id') id: string) { /* ... */ }

  @Patch(':id/restore')
  restoreProject(@Param('id') id: string) { /* ... */ }

  @Post(':id/duplicate')
  duplicateProject(@Param('id') id: string) { /* ... */ }
}
```

##### **Update Public Projects Endpoint**
```typescript
// Only return published projects
@Get()
getAllProjects() {
  return this.projectsService.getPublishedProjects();
}
```

#### **Frontend Changes**

##### **New Files**
```
frontentd/src/app/features/admin/
├── services/
│   └── admin-project.service.ts
├── project-list/
│   ├── project-list.ts
│   └── project-list.html
└── project-editor/
    ├── project-editor.ts
    └── project-editor.html
```

##### **Update Project Model**
```typescript
// project.model.ts
export type ProjectStatus = 'draft' | 'published' | 'archived';

export interface Project {
  id: string;
  slug?: string;
  title: string;
  description: string;
  content?: string;  // Rich text
  image: string;
  technologies: string[];
  category: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  status?: ProjectStatus;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProjectDto {
  title: string;
  description: string;
  content?: string;
  image?: string;
  technologies: string[];
  category: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: ProjectStatus;
}
```

---

### **7. Implementation Tasks**

#### **Phase 7.1: Header Enhancement** ✅ COMPLETED
- [x] Update Header component to inject AuthService
- [x] Add "My Account" dropdown UI (desktop)
- [x] Add "My Account" to mobile menu
- [x] Style dropdown with Angular gradient theme
- [x] Click-outside to close dropdown

#### **Phase 7.2: Layout Architecture**
- [ ] Update app.html to use `<router-outlet />` only
- [ ] Update app.ts to remove MainLayoutComponent import
- [ ] Rename MainLayoutComponent to MainLayout (follow naming convention)
- [ ] Create AuthLayout component (for login page)
- [ ] Create AdminContent component (sidebar + router-outlet)
- [ ] Create AdminSidebar component
- [ ] Update app.routes.ts with new route structure
- [ ] Update login redirect to `/admin/posts`
- [ ] Implement sidebar collapse for mobile
- [ ] Add active state highlighting on sidebar

#### **Phase 7.3: Content Card Component**
- [ ] Create reusable ContentCard component
- [ ] Implement all card actions
- [ ] Add status badges styling
- [ ] Add confirmation dialog for delete action
- [ ] Implement action handlers

#### **Phase 7.4: Backend - Posts Enhancement**
- [ ] Add 'archived' to Post entity status enum
- [ ] Create archive/restore/duplicate endpoints
- [ ] Update getAllPosts to support status filter
- [ ] Test all new endpoints

#### **Phase 7.5: Frontend - Posts Enhancement**
- [ ] Update Post model with 'archived' status
- [ ] Update admin-post.service with new methods
- [ ] Refactor PostList to use card grid
- [ ] Add status filter tabs
- [ ] Implement all card actions
- [ ] Add loading and error states

#### **Phase 7.6: Backend - Projects CRUD**
- [ ] Create ProjectEntity with status workflow
- [ ] Create AdminProjectsController
- [ ] Implement all CRUD + status endpoints
- [ ] Update public ProjectsController to filter by status
- [ ] Create DTOs for create/update
- [ ] Test all endpoints

#### **Phase 7.7: Frontend - Projects Management**
- [ ] Update Project model with status
- [ ] Create admin-project.service
- [ ] Create ProjectList component (card grid with filters)
- [ ] Create ProjectEditor component
- [ ] Implement all card actions
- [ ] Test complete flow

#### **Phase 7.8: Testing & Polish**
- [ ] Test complete admin flow
- [ ] Verify public pages only show published content
- [ ] Test mobile responsiveness
- [ ] Add loading states and skeletons
- [ ] Add success/error toast notifications
- [ ] Security audit for new endpoints

---

### **8. File Structure Summary**

```
frontentd/src/app/
├── app.html                              # Just <router-outlet />
├── app.ts                                # Minimal, no layout import
├── app.routes.ts                         # Route-based layout selection
└── layouts/
    ├── main-layout/
    │   └── main-layout.ts                # Existing, renamed from MainLayoutComponent
    └── auth-layout/
        └── auth-layout.ts                # NEW (login page only)

frontentd/src/app/features/admin/
├── layouts/
│   └── admin-content/
│       └── admin-content.ts              # NEW (sidebar + router-outlet)
├── components/
│   ├── admin-sidebar/
│   │   └── admin-sidebar.ts              # NEW
│   └── content-card/
│       └── content-card.ts               # NEW
├── services/
│   ├── auth.service.ts                   (existing)
│   ├── admin-post.service.ts             (existing, update)
│   └── admin-project.service.ts          (new)
├── guards/
│   └── auth.guard.ts                     (existing)
├── login/
│   └── login.ts                          (existing, update redirect)
├── post-list/
│   └── post-list.ts                      (refactor to cards)
├── post-editor/
│   └── post-editor.ts                    (existing)
├── project-list/
│   └── project-list.ts                   (new)
└── project-editor/
    └── project-editor.ts        (new)

backend/src/
├── projects/
│   ├── entities/
│   │   └── project.entity.ts    (new)
│   ├── dto/
│   │   ├── create-project.dto.ts (new)
│   │   └── update-project.dto.ts (new)
│   ├── admin-projects.controller.ts (new)
│   ├── projects.controller.ts   (update)
│   ├── projects.service.ts      (update)
│   └── projects.module.ts       (update)
└── blog/
    ├── entities/
    │   └── post.entity.ts       (update status enum)
    └── admin-blog.controller.ts (add new endpoints)
```

---

### **9. UI/UX Considerations**

#### **Admin Theme**
- Use same Angular gradient colors as main site
- Dark mode support
- Clean, professional interface
- Consistent spacing and typography

#### **Responsive Design**
- Sidebar collapses to hamburger on mobile
- Cards stack vertically on mobile
- Touch-friendly action buttons

#### **Feedback & States**
- Loading skeletons while fetching
- Toast notifications for actions
- Confirmation dialogs for destructive actions
- Empty states with helpful CTAs

---

### **10. Security Considerations**

- All admin endpoints protected with JWT guard
- Input validation on all DTOs
- Sanitize rich text content
- Rate limiting on status change endpoints
- Audit log for admin actions (optional future enhancement)
