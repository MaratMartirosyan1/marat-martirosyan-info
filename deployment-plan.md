# Deployment Plan for marat-martirosyan-info

## Overview
Deploy Angular 21 SSR frontend and NestJS backend to production using free-tier hosting solutions with CI/CD integration.

## Tech Stack
- **Frontend**: Angular 21 with SSR (Server-Side Rendering)
- **Backend**: NestJS (Node.js)
- **Styling**: TailwindCSS

## Deployment Architecture

### Recommended Option: Hybrid Approach (Frontend on Vercel + Backend on Render)

#### Why This Approach?
- Vercel excels at Angular SSR hosting
- Render/Railway offers free tier for NestJS backend
- Clear separation of concerns
- Easy to scale independently
- Both services offer free subdomains

---

## Part 1: Backend Deployment (NestJS on Render)

### Prerequisites
- GitHub account
- Render account (sign up at https://render.com)

### Step 1: Prepare Backend for Production

#### 1.1 Update `backend/package.json`
Add production scripts:
```json
{
  "scripts": {
    "backend:dev": "nest start",
    "backend:watch": "nest start --watch",
    "start": "node dist/main",
    "build": "nest build"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

#### 1.2 Create `backend/render.yaml`
```yaml
services:
  - type: web
    name: portfolio-backend
    runtime: node
    buildCommand: npm install && npm run build
    startCommand: npm run start
    envVars:
      - key: PORT
        value: 10000
      - key: NODE_ENV
        value: production
```

#### 1.3 Update CORS Configuration
In `backend/src/main.ts`, update CORS to allow your future Vercel domain:
```typescript
app.enableCors({
  origin: [
    'http://localhost:4200',
    'http://localhost:4000',
    'https://your-app.vercel.app', // Will update after Vercel deployment
    'https://*.vercel.app' // Allow all Vercel preview deployments
  ],
  credentials: true,
});
```

### Step 2: Deploy Backend to Render

1. **Push code to GitHub** (if not already)
   ```bash
   git add .
   git commit -m "feat: prepare backend for production deployment"
   git push origin master
   ```

2. **Create New Web Service on Render**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `portfolio-backend`
     - **Region**: Choose closest to your users
     - **Branch**: `master`
     - **Root Directory**: `backend`
     - **Runtime**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm run start`
     - **Instance Type**: `Free`

3. **Set Environment Variables**
   In Render dashboard → Environment:
   ```
   PORT=10000
   NODE_ENV=production
   CORS_ORIGIN=https://your-app.vercel.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy
   - Note down your backend URL: `https://portfolio-backend-xxxx.onrender.com`

### Step 3: Backend Health Check

After deployment, test your backend:
```bash
curl https://your-backend-url.onrender.com
```

---

## Part 2: Frontend Deployment (Angular SSR on Vercel)

### Prerequisites
- Vercel account (sign up at https://vercel.com)
- GitHub account

### Step 1: Prepare Frontend for Production

#### 1.1 Update Environment Configuration

Create `frontentd/src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-url.onrender.com' // Update with your Render backend URL
};
```

Create `frontentd/src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

#### 1.2 Update API Service to Use Environment

Update your HTTP services to use `environment.apiUrl` instead of hardcoded URLs.

Example:
```typescript
import { environment } from '../environments/environment';

// In your service
private apiUrl = environment.apiUrl;
```

#### 1.3 Create `vercel.json` in Frontend Root

Create `frontentd/vercel.json`:
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/portfolio-app/browser",
  "framework": "angular",
  "devCommand": "npm run frontend:dev",
  "installCommand": "npm install",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

#### 1.4 Update `angular.json` for Production Build

Ensure your `angular.json` has proper production configuration:
```json
{
  "projects": {
    "portfolio-app": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "namedChunks": false,
              "extractLicenses": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                }
              ]
            }
          }
        }
      }
    }
  }
}
```

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "feat: prepare frontend for production deployment"
   git push origin master
   ```

2. **Import Project to Vercel**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your repository
   - Configure:
     - **Framework Preset**: Angular
     - **Root Directory**: `frontentd`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist/portfolio-app/browser`

3. **Set Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:
   ```
   PRODUCTION=true
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app
   - You'll get a URL like: `https://your-app.vercel.app`

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to frontend directory
cd frontentd

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

### Step 3: Update Backend CORS with Vercel URL

After getting your Vercel URL, go back to Render:
1. Go to your backend service
2. Update `CORS_ORIGIN` environment variable with your actual Vercel URL
3. Redeploy backend

### Step 4: Test Production Deployment

Visit your Vercel URL and test:
- [ ] Homepage loads correctly
- [ ] SSR is working (view page source, content should be rendered)
- [ ] API calls to backend work
- [ ] Blog posts load
- [ ] Projects load
- [ ] Navigation works
- [ ] Responsive design on mobile

---

## Part 3: Configure CI/CD (Automatic Deployments)

### Backend (Render)
✅ **Already configured!** Render automatically deploys when you push to `master` branch.

### Frontend (Vercel)
✅ **Already configured!** Vercel automatically deploys when you push to `master` branch.

### How It Works
1. Make changes to your code
2. Commit and push to GitHub
3. Vercel/Render automatically detect the push
4. They build and deploy your app
5. You get a notification when deployment is complete

### Preview Deployments
- Every PR gets a unique preview URL
- Test changes before merging to master
- No impact on production deployment

---

## Part 4: Custom Domain Setup (Future)

### When You Buy a Domain

#### For Vercel (Frontend)
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `maratmartirosyan.com`)
3. Vercel provides DNS records
4. Add these records to your domain registrar:
   ```
   Type: A     Name: @     Value: 76.76.21.21
   Type: CNAME Name: www   Value: cname.vercel-dns.com
   ```
5. Wait for DNS propagation (can take 24-48 hours)

#### For Render (Backend)
1. Go to Render Dashboard → Your Service → Settings
2. Add custom domain (e.g., `api.maratmartirosyan.com`)
3. Add CNAME record at your domain registrar:
   ```
   Type: CNAME Name: api Value: your-backend-url.onrender.com
   ```
4. Update CORS in backend to include new domain

---

## Part 5: Post-Deployment Checklist

### Security
- [ ] Environment variables are properly set
- [ ] CORS is configured correctly
- [ ] No sensitive data in repository
- [ ] HTTPS is enabled (automatic on Vercel/Render)
- [ ] Security headers are set

### Performance
- [ ] Images are optimized
- [ ] Angular production build is optimized
- [ ] Lazy loading is implemented
- [ ] SSR is working correctly

### Monitoring
- [ ] Set up Vercel Analytics (free tier available)
- [ ] Monitor Render backend logs
- [ ] Set up uptime monitoring (e.g., UptimeRobot - free)

### SEO
- [ ] meta tags are properly set
- [ ] robots.txt is configured
- [ ] sitemap.xml is generated
- [ ] SSR is rendering content properly

---

## Alternative Deployment Options

### Option 2: Both on Vercel (Requires Backend Refactoring)

If you want everything on Vercel, you'll need to:
1. Convert NestJS controllers to Vercel Serverless Functions
2. Move backend logic to `frontentd/api` directory
3. Use Vercel's Node.js runtime

**Pros**: Single deployment, single platform
**Cons**: More refactoring required, less flexibility for backend

### Option 3: Railway for Both

Railway offers free tier for both frontend and backend:
- Similar to Render but with unified dashboard
- $5 free credit per month
- Easy monorepo support

---

## Troubleshooting

### Common Issues

#### Issue: CORS errors in production
**Solution**:
- Verify CORS_ORIGIN in backend includes exact Vercel URL
- Check for trailing slashes

#### Issue: 404 errors on refresh in Angular
**Solution**:
- Vercel handles this automatically with `vercel.json`
- Ensure rewrites are configured

#### Issue: Backend deployment fails
**Solution**:
- Check Node version compatibility
- Verify all dependencies are in `dependencies`, not `devDependencies`
- Check Render build logs

#### Issue: Environment variables not working
**Solution**:
- Rebuild/redeploy after adding environment variables
- Check variable names are exact matches
- Verify environment (production vs preview)

---

## Cost Breakdown (Free Tier)

### Vercel (Frontend)
- ✅ **Free tier includes**:
  - 100GB bandwidth/month
  - 6000 build minutes/month
  - Unlimited static sites
  - Automatic HTTPS
  - Preview deployments
  - Analytics (limited)

### Render (Backend)
- ✅ **Free tier includes**:
  - 750 hours/month (enough for 1 service)
  - 512MB RAM
  - Automatic HTTPS
  - Auto-deploy from Git
  - **Note**: Free tier sleeps after 15 min inactivity (first request may be slow)

### Total Cost: **$0/month** 🎉

---

## Next Steps

1. **Deploy Backend First**
   - Follow Part 1
   - Test backend independently
   - Note down backend URL

2. **Deploy Frontend**
   - Update environment with backend URL
   - Follow Part 2
   - Test end-to-end functionality

3. **Set Up Monitoring**
   - Add analytics
   - Set up error tracking (optional: Sentry free tier)

4. **Plan for Scaling**
   - Monitor usage
   - When traffic grows, consider paid tiers
   - Optimize as needed

---

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Angular SSR Guide](https://angular.dev/guide/ssr)
- [NestJS Deployment](https://docs.nestjs.com/deployment)

---

## Support

If you encounter issues:
1. Check deployment logs (Vercel/Render dashboard)
2. Verify environment variables
3. Test API endpoints independently
4. Check browser console for errors

---

**Ready to deploy? Start with Part 1: Backend Deployment! 🚀**
