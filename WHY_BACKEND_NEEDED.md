## Why content updates in production require a backend

### The problem

**Current situation:**

- Development: Admin panel works — can save changes to `public/data/content.json`

- Production: Admin panel is read-only — cannot save changes

- Error: `405 Method Not Allowed` when trying to save on the live site

### Why it doesn't work in production

1. Static hosting (Vercel/Netlify)

   - The site is built into static files (HTML, CSS, JS)

   - Files are served from a CDN

   - No server runs your code

   - Files are read-only

2. Serverless limitations

   - Functions are temporary and stateless

   - No persistent file system

   - Cannot write files

   - Designed for API responses, not file operations

3. Why development works

   - Vite dev server runs locally

   - Has full file system access

   - Can read and write files

   - This is why it works locally

### The flow

```
User clicks "Save" in Admin Panel
    ↓
Frontend sends POST request to /api/update-content
    ↓
Request goes to Vercel (serverless)
    ↓
❌ Cannot write to file system (read-only environment)
    ↓
Returns 405 Error: Method Not Allowed
```

### Why a backend is required

To save content in production, you need:

1. A persistent server with file system access (or a database)

2. An API endpoint that can write data

3. Storage that persists across requests

### Solutions

| Solution | Cost | Setup Time | Real-time | Maintenance |
|----------|------|------------|-----------|-------------|
| Backend server (Node.js) | $0-5/mo | 4-6 hours | Yes | Medium |
| Database service (Supabase) | Free tier | 2-3 hours | Yes | Low |
| GitHub API | Free | 2-3 hours | No (1-2 min delay) | Low |

### Recommendation

Use a backend server with a database (Supabase recommended):

- Free tier available

- No server maintenance

- Real-time updates

- Simple API integration

- Estimated cost: $0/month (free tier)

- Estimated development time: 2-3 hours

### Without a backend

- Admin panel only works in development

- Production updates require manual file editing and redeployment

- Non-technical users cannot update content

### With a backend

- Admin panel works in production

- Real-time content updates

- Non-technical users can manage content

- No code changes or redeployment needed

---

