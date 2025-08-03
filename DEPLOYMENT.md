# Vercel Deployment Guide

This guide covers deploying all projects to Vercel with separate projects for maximum flexibility.

## 🚀 Deployment Overview

```
📱 Web App      → vooksio-web.vercel.app     (Vercel Project #1)
🖥️  Backend     → vooksio-api.vercel.app     (Vercel Project #2)
📱 Mobile       → App Store + Google Play    (Expo/EAS)
```

## 1. 📱 Web App Deployment (Vercel)

### Setup
1. **Create Vercel Project** for web app
2. **Import from GitHub** (root directory)
3. **Use these settings:**

```
Framework: Other
Build Command: pnpm build:web
Output Directory: dist/apps/web
Install Command: pnpm install
Development Command: pnpm nx serve web
Node.js Version: 22.x
```

### Environment Variables
```bash
NODE_ENV=production
VITE_API_URL=https://api.vooksio.com  # Your backend URL
```

### GitHub Secrets
```bash
VERCEL_WEB_TOKEN          # Web app Vercel token
VERCEL_WEB_PROJECT_ID     # Web app project ID
VERCEL_ORG_ID             # Your organization ID
```

## 2. 🖥️ Backend Deployment (Vercel)

### Setup
1. **Create separate Vercel Project** for backend
2. **Set root directory** to `apps/backend`
3. **Use these settings:**

```
Framework: Other
Build Command: pnpm build:backend
Root Directory: apps/backend
Install Command: pnpm install
Development Command: pnpm nx serve backend
Node.js Version: 22.x
```

### Environment Variables
```bash
NODE_ENV=production
```

### GitHub Secrets
```bash
VERCEL_BACKEND_TOKEN      # Backend Vercel token
VERCEL_BACKEND_PROJECT_ID # Backend project ID
```

## 3. 📱 Mobile App Deployment (Expo/EAS)

### Prerequisites
```bash
npm install -g @expo/cli eas-cli
expo login
```

### Setup
1. **Initialize Expo project** (if not done):
```bash
cd apps/mobile
expo init --template blank-typescript
```

2. **Configure app.json** with your details:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "owner": "your-expo-username"
  }
}
```

### Build & Deploy
```bash
# Build for development
eas build --platform all --profile development

# Build for production
eas build --platform all --profile production

# Submit to app stores
eas submit --platform all
```

### Environment Variables (Expo)
```bash
# In apps/mobile/.env
EXPO_PUBLIC_API_URL=https://api.vooksio.com
```

## 4. 📦 Shared Packages (Optional)

### Publish to npm
```bash
# Build packages
pnpm build:packages

# Publish each package
cd packages/ui && npm publish
cd packages/types && npm publish
cd packages/shared && npm publish
```

## 🔧 Development Workflow

### Local Development
```bash
# Start all services
pnpm dev              # Web app (localhost:4200)
pnpm dev:backend      # Backend (localhost:3000)
pnpm dev:mobile       # Mobile app (Expo)

# Or individually
pnpm nx serve web
pnpm nx serve backend
pnpm nx start mobile
```

### Build & Test
```bash
# Build all
pnpm build

# Test all
pnpm test

# Lint all
pnpm lint
```

## 🚀 Deployment Commands

### Manual Deployment
```bash
# Web app
pnpm deploy:web

# Backend
pnpm deploy:backend

# Mobile
pnpm deploy:mobile
```

### CI/CD (Automatic)
- **Push to main** → Deploys all projects
- **Pull Request** → Deploys preview versions
- **Mobile** → Manual trigger for App Store builds

## 🌐 URLs & Endpoints

### Production URLs
```
Web App:    https://vooksio-web.vercel.app
Backend:    https://vooksio-backend.vercel.app
Mobile:     App Store + Google Play Store
```

### API Integration
```typescript
// In web app - apps/web/src/api.ts
const API_URL = process.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
  health: () => fetch(`${API_URL}/health`),
  users: () => fetch(`${API_URL}/users`),
};
```

## 🛡️ Security & CORS

### Backend CORS Configuration
```typescript
// apps/backend/routes/health.ts
export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers automatically set by Vercel config
  res.json({ status: 'healthy' });
}
```

### Environment Variables
```bash
# Web App
VITE_API_URL=https://vooksio-backend.vercel.app

# Backend
NODE_ENV=production
ALLOWED_ORIGINS=https://vooksio-web.vercel.app

# Mobile
EXPO_PUBLIC_API_URL=https://vooksio-backend.vercel.app
```

## 📊 Monitoring & Analytics

### Vercel Dashboard
- **Performance metrics** for both projects
- **Function logs** for backend
- **Build logs** and deployment history

### Expo Dashboard
- **App analytics** and crash reports
- **Update deployment** status
- **Store submission** tracking

## 🔄 Advanced Workflows

### Feature Branch Deployments
```bash
# Creates preview deployments for PRs
git checkout -b feature/new-api
git push origin feature/new-api
# → Automatically deploys preview versions
```

### Environment-specific Deployments
```bash
# Development
vercel --env NODE_ENV=development

# Staging
vercel --env NODE_ENV=staging

# Production
vercel --prod
```

## 🆘 Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version matches `.nvmrc`
2. **CORS errors**: Verify backend URL in web app env vars
3. **Mobile build fails**: Check Expo configuration in `app.json`
4. **Deployment timeout**: Consider splitting large builds

### Debug Commands
```bash
# Check build locally
pnpm build:web
pnpm build:backend

# Test API locally
curl http://localhost:3000/health

# Check mobile bundle
cd apps/mobile && expo export
```

---

## 📋 Deployment Checklist

### Before First Deployment
- [ ] Create Vercel accounts and projects
- [ ] Set up Expo account and project
- [ ] Configure environment variables
- [ ] Add GitHub secrets
- [ ] Test builds locally

### Regular Deployment
- [ ] Run tests: `pnpm test`
- [ ] Build locally: `pnpm build`
- [ ] Commit and push to main
- [ ] Verify deployments in dashboards
- [ ] Test production URLs

### Mobile App Updates
- [ ] Update version in `app.json`
- [ ] Build with EAS: `eas build`
- [ ] Test on physical devices
- [ ] Submit to stores: `eas submit`