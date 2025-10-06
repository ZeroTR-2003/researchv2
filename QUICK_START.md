# ⚡ Quick Start Guide

## 📦 What's Been Set Up

✅ **GitHub Repository**: https://github.com/ZeroTR-2003/researchv2  
✅ **Git LFS**: Configured for large files (videos & 3D models)  
✅ **All Files**: Pushed and ready for deployment  
✅ **Deployment Guide**: See `DEPLOYMENT_GUIDE.md`

---

## 🚀 Deploy to Vercel (3 Steps)

### 1. Go to Vercel
👉 Visit: https://vercel.com  
- Sign in with GitHub account

### 2. Import Project
- Click "Add New..." → "Project"
- Select `ZeroTR-2003/researchv2`
- Click "Import"

### 3. Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Your site is live! 🎉

---

## 🔗 Important Links

- **GitHub Repo**: https://github.com/ZeroTR-2003/researchv2
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Full Deployment Guide**: See `DEPLOYMENT_GUIDE.md`
- **Testing Guide**: See `TESTING_GUIDE.md`

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open http://localhost:3000

---

## 📁 Project Structure

```
├── src/
│   ├── app/              # Pages (Next.js App Router)
│   ├── components/       # React components
│   ├── contexts/         # Theme context
│   └── data/            # Content (landmarks.json)
├── public/
│   ├── models/          # 3D GLB files
│   ├── videos/          # Background videos
│   └── images/          # SVG illustrations
├── DEPLOYMENT_GUIDE.md  # Full deployment instructions
└── README.md            # Complete documentation
```

---

## ✨ Features Included

- 🎮 Interactive 3D Models (Three.js)
- 🌍 360° Virtual Tours (Panoee)
- 🎨 Dark Mode with Theme Toggle
- 📱 Fully Responsive Design
- ⚡ Next.js 15 with App Router
- 🔍 SEO Optimized
- 🚀 Vercel-Ready Configuration

---

## 📋 After Deployment Checklist

1. ✅ Visit your live site
2. ✅ Test all 3 landmark pages
3. ✅ Check 3D models load
4. ✅ Test dark mode toggle
5. ✅ Test on mobile device
6. ✅ Update README with live URL

---

## 🔄 Future Updates

```bash
# Make changes to your code
git add .
git commit -m "Your update message"
git push origin main

# Vercel automatically redeploys! ✨
```

---

## 💡 Tips

- **Build Time**: 2-3 minutes on Vercel
- **Auto-Deploy**: Enabled on push to main
- **Domain**: Free `*.vercel.app` subdomain
- **LFS Bandwidth**: GitHub LFS has 1GB/month free

---

## 🆘 Quick Troubleshooting

**Build fails?**
```bash
npm install
npm run build
```

**3D models not showing?**
- Check Vercel deployment logs
- Verify Git LFS files uploaded

**Dark mode not working?**
- Clear browser cache
- Check localStorage permissions

---

## 📧 Support

- **Deployment Issues**: See `DEPLOYMENT_GUIDE.md`
- **Code Issues**: Check `TESTING_GUIDE.md`
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

**🎉 You're all set!** Just deploy to Vercel and your site will be live.

Need help? Check the detailed `DEPLOYMENT_GUIDE.md`
