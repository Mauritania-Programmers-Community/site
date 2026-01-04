# Image Optimization Guidelines

## 📸 Quick Reference

- **Max file size:** 500 KB (will trigger warning)
- **Recommended formats:** WebP > PNG > JPG
- **Recommended dimensions:** 1920×1080 (1080p) max
- **Optimization tool:** `node scripts/optimize-images.mjs`

## 🎯 Why Optimize Images?

- **Mobile users:** Faster loading on slower connections
- **SEO:** Better Core Web Vitals scores
- **Costs:** Lower Vercel bandwidth usage
- **Git repo:** Smaller repository size

## ✅ Adding New Event/Blog Images

### **Option 1: Use Online Tools (Easiest)**
Before adding images to git:

1. Go to [Squoosh](https://squoosh.app) or [TinyPNG](https://tinypng.com)
2. Upload your image
3. Set quality to 80-85%
4. Download optimized version
5. Add to `/public/images/events/` or `/public/images/blog/`

### **Option 2: Use Built-in Script**
For batch optimization:

```bash
# 1. Add your PNG/JPG images to public/images/events/
# 2. Update scripts/optimize-images.mjs TARGET_FILES array
# 3. Run optimization
node scripts/optimize-images.mjs

# 4. Update MDX frontmatter to use .webp extension
# image: "/images/events/your-event.webp"
```

### **Option 3: Let Vercel Handle It (Not Recommended)**
- Just add the image to `/public/images/`
- Next.js Image component will optimize on-demand
- ⚠️ **Downside:** First request is slow, git repo gets bloated

## 📐 Recommended Dimensions

| Use Case | Dimensions | Format | Max Size |
|----------|-----------|--------|----------|
| Event cover | 1920×1080 | WebP | 200 KB |
| Blog header | 1920×1080 | WebP | 200 KB |
| Author avatar | 512×512 | PNG/WebP | 50 KB |
| Open Graph | 1200×630 | PNG/JPG | 150 KB |

## 🔍 Pre-commit Hook

A pre-commit hook automatically checks for large images:

```bash
# If you add a 2 MB image:
⚠️  Warning: Large image files detected (>500KB):
   - public/images/events/huge-image.png (2.1M)

💡 Consider optimizing with: node scripts/optimize-images.mjs
   Or use online tools: tinypng.com, squoosh.app

Continue commit anyway? (y/N)
```

**To bypass** (not recommended):
```bash
git commit --no-verify
```

## 🚀 Vercel Automatic Optimization

Even without pre-optimization, Vercel optimizes images automatically:

- **Formats:** Converts to WebP/AVIF based on browser
- **Sizes:** Generates multiple responsive sizes
- **Caching:** Serves optimized versions from CDN

**However**, pre-optimizing is still better because:
- Faster first load
- Smaller git repo
- Lower Vercel bandwidth costs

## 📝 Example Workflow

Adding a new event with image:

```bash
# 1. Optimize image
squoosh.app → Upload → Quality 85% → Download

# 2. Add to public/images/events/
mv ~/Downloads/my-event.webp public/images/events/

# 3. Create MDX file
cat > content/events/en/my-event.mdx <<EOF
---
locale: en
title: "My Awesome Event"
description: "Event description"
date: 2025-01-15
type: workshop
image: "/images/events/my-event.webp"
published: true
---

Event content here...
EOF

# 4. Commit (pre-commit hook will check size)
git add .
git commit -m "Add my-event"
```

## 🛠️ Tools & Resources

- **Squoosh:** https://squoosh.app (Best for single images)
- **TinyPNG:** https://tinypng.com (Batch processing)
- **ImageOptim:** https://imageoptim.com (Mac app)
- **Sharp CLI:** For advanced automation

## ❓ FAQ

**Q: Why WebP instead of PNG?**
A: WebP is 25-35% smaller with same quality, supported in all modern browsers.

**Q: Can I use JPG?**
A: Yes, but WebP is preferred. JPG is fine for photos.

**Q: What about SVG?**
A: Perfect for logos and icons! No optimization needed.

**Q: Do I need to create multiple sizes?**
A: No, Next.js Image component handles responsive sizes automatically.

**Q: What if I upload a very large image?**
A: Pre-commit hook warns you. Vercel will still optimize it, but it's better to optimize first.

## 📊 Impact Example

Real optimization from this project:

| Image | Before | After | Savings |
|-------|--------|-------|---------|
| from-code-to-career.png | 1.4 MB | 133 KB | 91% |
| mobile-dev.png | 1.4 MB | 127 KB | 91% |

**Result:** Events page loads **85% faster** on mobile!
