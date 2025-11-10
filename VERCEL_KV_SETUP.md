# Vercel KV Setup Instructions

To enable live content updates on your Vercel deployment, you need to set up Vercel KV (Key-Value storage).

## Steps:

1. **Go to your Vercel Dashboard**

   - Navigate to your project
   - Go to the "Storage" tab

2. **Create a KV Database**

   - Click "Create Database"
   - Select "KV" (Key-Value)
   - Choose a name for your database (e.g., "website-content")
   - Select a region close to your users
   - Click "Create"

3. **Link the Database to Your Project**

   - After creating, Vercel will automatically add the required environment variables
   - The variables `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, and `KV_REST_API_READ_ONLY_TOKEN` will be added automatically

4. **Redeploy Your Application**
   - After linking, trigger a new deployment
   - Your content updates will now persist in production!

## How It Works:

- **Development**: Content is saved to `src/data/content.json` file
- **Production**: Content is saved to Vercel KV storage
- **Loading**: The app first tries to load from KV, then falls back to the default JSON file

## Testing:

1. Make changes in the admin panel
2. Click "Save Changes"
3. Refresh the website - your changes should be live immediately!
