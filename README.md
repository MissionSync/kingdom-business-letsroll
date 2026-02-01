# Kingdom Business Let's Roll (KBLR)

A faith-based community platform dedicated to waking the sleeper, equipping believers, and reaching the lost.

**Live Site**: https://kingdom-business-letsroll.netlify.app/

## About the Organization

**Mission**: *"Here to wake the sleeper to equip & enable them to find the lost because the harvest is now"* — Ephesians 5:14

Kingdom Business demonstrates genuine love through actively opposing evil, embracing good, and living in harmony with others. The organization strives to reflect the character of Christ in daily life through acts of kindness, forgiveness, and authentic community support (Romans 12:9-17).

### Core Services

- **Community Care** — Building strong relationships through compassion and support
- **Live Streaming** — Connect and grow with live online sessions
- **Coaching** — Personal guidance for your spiritual journey
- **Resources** — Access to valuable learning materials
- **Partnerships** — Highlighting and supporting aligned organizations
- **Support/Donations** — Contribute to the mission

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Backend | Netlify Functions (serverless) |
| Database | Neon PostgreSQL |
| Email | Resend |
| Hosting | Netlify |

## Local Development

### Prerequisites

- Node.js 18+ (install via [nvm](https://github.com/nvm-sh/nvm))
- Netlify CLI (for local function testing)

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/kingdom-business-letsroll.git
cd kingdom-business-letsroll

# Install dependencies
npm install

# Install Netlify CLI globally (for testing serverless functions)
npm install -g netlify-cli
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_neon_connection_string
RESEND_API_KEY=your_resend_api_key
```

### Running Locally

```bash
# Frontend only (contact form won't work)
npm run dev

# Full stack with Netlify Functions
netlify dev
```

## Deployment

The site is deployed automatically via Netlify when changes are pushed to the `main` branch.

### Environment Variables (Netlify Dashboard)

Set these in **Site Settings → Environment Variables**:

- `DATABASE_URL` — Neon PostgreSQL connection string
- `RESEND_API_KEY` — Resend API key for email notifications

## Project Structure

```
├── netlify/
│   └── functions/        # Serverless functions (contact form handler)
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Route pages (Index, About, Contact, etc.)
│   └── hooks/            # Custom React hooks
├── public/               # Static assets
├── netlify.toml          # Netlify configuration
└── package.json
```

## Database Schema

Contact form submissions are stored in Neon PostgreSQL:

```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  purpose TEXT NOT NULL CHECK (purpose IN ('prayer', 'partnership', 'other')),
  message TEXT NOT NULL
);
```

## Cost

This project runs entirely on free tiers:

| Service | Free Tier |
|---------|-----------|
| Netlify | 100 GB bandwidth, 300 build minutes/month |
| Neon | 0.5 GB storage, 190 compute hours/month |
| Resend | 3,000 emails/month |
