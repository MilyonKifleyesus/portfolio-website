# 🚀 Portfolio Website Deployment Guide

## Render Deployment Instructions

### Prerequisites
- GitHub repository with your code
- MongoDB Atlas database
- Render account

### Step 1: Prepare Your MongoDB Database

1. **MongoDB Atlas Setup** (if not already done):
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free cluster
   - Get your connection string
   - Replace `<password>` with your actual password

### Step 2: Deploy to Render

1. **Sign up/Login to Render**:
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your `portfolio-website` repository

3. **Configure the Service**:
   ```
   Name: portfolio-website (or your preferred name)
   Environment: Node
   Region: Choose closest to your users
   Branch: main
   Root Directory: (leave empty - deploy from root)
   Build Command: npm run install-all && npm run build
   Start Command: npm start
   ```

4. **Set Environment Variables**:
   Click "Environment" tab and add:
   ```
   NODE_ENV = production
   MONGODB_URI = your_mongodb_atlas_connection_string
   JWT_SECRET = your_secure_jwt_secret_key
   PORT = 10000
   ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for build to complete (5-10 minutes)

### Step 3: Update Client API Calls (Optional)

If you want to use the new API configuration:

1. Update your components to use the API_ENDPOINTS:
   ```javascript
   import { API_ENDPOINTS } from '../config/api';
   
   // Instead of: fetch("http://localhost:5000/api/contacts")
   // Use: fetch(API_ENDPOINTS.CONTACTS)
   ```

### Step 4: Custom Domain (Optional)

1. In Render dashboard, go to your service
2. Click "Settings" → "Custom Domains"
3. Add your domain and configure DNS

### Troubleshooting

**Common Issues:**
- Build fails: Check if all dependencies are in package.json
- Database connection fails: Verify MONGODB_URI is correct
- Static files not serving: Ensure build completed successfully

**Logs:**
- Check Render logs in the dashboard
- Look for specific error messages

### Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| NODE_ENV | Environment mode | production |
| MONGODB_URI | MongoDB connection string | mongodb+srv://user:pass@cluster.mongodb.net/db |
| JWT_SECRET | Secret for JWT tokens | your-super-secret-key-here |
| PORT | Server port | 10000 |

### Post-Deployment

1. **Test your application**:
   - Visit your Render URL
   - Test all features (contact form, admin panel, etc.)

2. **Monitor performance**:
   - Check Render metrics
   - Monitor database usage

3. **Set up monitoring** (optional):
   - Configure uptime monitoring
   - Set up error tracking

### Security Notes

- Never commit sensitive data to Git
- Use strong JWT secrets
- Enable MongoDB Atlas security features
- Consider adding rate limiting for production

### Cost Optimization

- Render free tier includes:
  - 750 hours/month
  - 512 MB RAM
  - Shared CPU
- Monitor usage to avoid charges
