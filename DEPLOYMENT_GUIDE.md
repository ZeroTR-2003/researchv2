# 🚀 Deployment Guide - Vercel

## ✅ Pre-Deployment Checklist

Your project is now ready for deployment! Here's what's already configured:

- ✅ **Git Repository**: Successfully pushed to https://github.com/ZeroTR-2003/researchv2
- ✅ **Git LFS**: Large files (videos & 3D models) configured with Git LFS
- ✅ **Vercel Config**: `vercel.json` with optimized settings
- ✅ **Next.js 15**: Latest App Router with SSR/SSG support
- ✅ **TypeScript**: Type-safe code
- ✅ **Responsive Design**: Mobile-first with dark mode
- ✅ **SEO Ready**: Proper metadata and descriptions

---

## 📋 Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Go to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Connect with your GitHub account

#### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Find and select **`ZeroTR-2003/researchv2`** from your repositories
3. Click **"Import"**

#### Step 3: Configure Project
Vercel will auto-detect Next.js. Verify these settings:

```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node Version: 18.x or later
```

#### Step 4: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Your site will be live at `https://researchv2.vercel.app` (or similar)

---

### Option 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login
```bash
vercel login
```

#### Step 3: Deploy
```bash
# From your project directory
vercel

# For production deployment
vercel --prod
```

---

## 🎨 Post-Deployment Tasks

### 1. Update README with Live URL
After deployment, update line 215 in `README.md`:

```markdown
🚀 [Live Demo](https://your-actual-url.vercel.app)
```

### 2. Test Core Features
- ✅ Homepage loads correctly
- ✅ All 3 landmark pages work
- ✅ 3D models load in GLBViewer
- ✅ 360° tours embed properly
- ✅ Dark mode toggle works
- ✅ Mobile responsiveness
- ✅ Navigation between pages

### 3. Configure Custom Domain (Optional)
1. In Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

---

## 🔧 Environment Variables (If Needed)

If you add API keys or secrets later:

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add variables:
   - `NEXT_PUBLIC_PANOEE_API_KEY` (if needed)
   - `DATABASE_URL` (if you add a database)
3. Redeploy for changes to take effect

---

## 📊 Performance Optimization

Your project already includes:

- ✅ **Next.js Image Optimization**: Automatic image optimization
- ✅ **Static Generation**: Pre-rendered pages for fast loading
- ✅ **Code Splitting**: Automatic bundle optimization
- ✅ **Caching Headers**: Configured in `vercel.json`
- ✅ **Git LFS**: Large files served efficiently

### Expected Performance
- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s

---

## 🐛 Troubleshooting

### Build Fails

**Issue**: Missing dependencies
```bash
npm install
npm run build
```

**Issue**: TypeScript errors
```bash
npm run lint
```

### 3D Models Not Loading

**Issue**: Git LFS bandwidth limit
- Vercel has built-in LFS support
- Check Vercel deployment logs
- Verify files exist: https://your-site.vercel.app/models/christuskirche-exterior.glb

### 360° Tours Not Embedding

**Issue**: Panoee URLs blocked
- Check browser console for CORS errors
- Verify URLs in `src/data/landmarks.json`
- Test in incognito mode

---

## 📱 Testing Checklist

After deployment, test on:

- ✅ **Desktop Browsers**
  - Chrome
  - Firefox
  - Safari
  - Edge

- ✅ **Mobile Devices**
  - iPhone (Safari)
  - Android (Chrome)
  - Tablet (iPad/Android)

- ✅ **Key Features**
  - Navigation works
  - 3D models rotate
  - Images load
  - Dark mode persists
  - Links work

---

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update content"
git push origin main

# Vercel automatically builds and deploys!
```

---

## 📈 Monitoring

### Vercel Analytics
1. Go to Vercel Dashboard → Your Project → **Analytics**
2. View:
   - Page views
   - Top pages
   - Performance metrics
   - Error tracking

### Deployment Logs
1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click on any deployment to see:
   - Build logs
   - Function logs
   - Error details

---

## 🎓 Academic Submission

For your research project submission, include:

1. **Live URL**: `https://your-project.vercel.app`
2. **GitHub Repository**: https://github.com/ZeroTR-2003/researchv2
3. **Documentation**: This README and guides
4. **Screenshots**: Homepage, landmark pages, 3D models, dark mode

---

## 📧 Support

### Vercel Issues
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Support](https://vercel.com/support)

### Project Issues
- GitHub Issues: https://github.com/ZeroTR-2003/researchv2/issues

---

## ✨ Next Steps

1. ✅ Deploy to Vercel (follow steps above)
2. ✅ Test all features on live site
3. ✅ Update README with live URL
4. ✅ Share with reviewers/supervisors
5. ✅ Monitor performance and analytics

---

**🎉 Your project is production-ready!**

Built with Next.js 15, React 18, Three.js, and Tailwind CSS  
Deployed on Vercel's global edge network
