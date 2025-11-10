# Storage Setup Guide

Your content management system supports multiple storage options. Choose the one that works best for you:

## Option 1: Vercel KV (Recommended for Vercel deployments)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click the **"Storage"** tab
4. Click **"Create Database"**
5. Select **"KV"** (or choose Upstash Redis from Marketplace)
6. Name it (e.g., "website-content")
7. Create it - Vercel will automatically add environment variables
8. Redeploy your application

**No additional configuration needed!** Vercel handles everything automatically.

## Option 2: JSONBin.io (Free, Works Everywhere)

JSONBin.io is a free JSON storage service that works on any platform.

### Setup Steps:

1. **Sign up for free**: Go to [https://jsonbin.io](https://jsonbin.io)
2. **Create a bin**:
   - Click "Create Bin"
   - Paste your content (or leave empty)
   - Click "Create"
3. **Get your credentials**:
   - Copy the **Bin ID** from the URL (e.g., `65a1b2c3d4e5f6g7h8i9j0k`)
   - Go to "Settings" → "API Keys"
   - Copy your **Master Key** (starts with `$2a$10$...`)
4. **Add to Vercel Environment Variables**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add:
     - `JSONBIN_API_KEY` = Your Master Key
     - `JSONBIN_BIN_ID` = Your Bin ID
   - Redeploy your application

### Free Tier Limits:

- 10,000 requests/month
- 100MB storage
- Perfect for small to medium websites

## Which Should I Use?

- **Vercel KV**: Best if you're already on Vercel and want native integration
- **JSONBin.io**: Best if you want a free option that works everywhere, or if you're not on Vercel

## Testing Your Setup

After setting up either option:

1. Go to your admin panel (`/admin`)
2. Make a change
3. Click "Save Changes"
4. You should see "Content saved successfully!"
5. Refresh your website - changes should be live!

## Troubleshooting

**Error: "No storage configured"**

- Make sure you've set up either Vercel KV or JSONBin.io
- Check that environment variables are set correctly
- Redeploy after adding environment variables

**Changes not showing up**

- Clear your browser cache
- Check that the storage service is working (try accessing JSONBin.io directly)
- Verify environment variables are set in production
