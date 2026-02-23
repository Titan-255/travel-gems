# 💎 Hidden Gems for Solo Travelers

Welcome to the **Gamified Comic V1** of the Solo Travelers Hidden Gems platform! 🗺️✨ 
Built exactly to specifications for Next.js, App Router, Server Actions, PostgreSQL, Prisma, Auth.js (NextAuth), and Map API compatibility.

## 🏗️ Requirements
- Node.js & npm
- PostgreSQL database

---

## 🚀 Setup Instructions

Follow these steps exactly to get this production-ready app running in your local environment.

### 1. Clone & Install Dependencies
First, install all necessary packages inside the project folder:
```bash
npm install
```

### 2. Environment Variables (.env)
You already have a pre-filled `.env` file! Update the following values before running:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/sologems?schema=public"
NEXTAUTH_SECRET="your-super-secret-key" # Run `openssl rand -base64 32` to generate a new one
NEXTAUTH_URL="http://localhost:3000"

# (Optional) For Social Auth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# (Optional) For Interactive Map rendering (If empty, fallback will display)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=""
```

### 3. Database Migration & Setup
Generate Prisma Client so your App understands the DB schema, and run migrations:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Seed Initial Data
We added an awesome seed script to load 5 cities (+25 hidden gems!) and create your **Admin Account**. Run:
```bash
npx prisma db seed
```
**Admin Credentials Setup:**
* **Email:** `admin@sologems.com`
* **Password:** `admin123`

### 5. Start Development Server ⚡
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🚀 Vercel Deployment Instructions

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click "Add New Project", select your GitHub repository.
3. In **Environment Variables** configuration, add all values from your `.env` (excluding localhost for auth links):
   - `DATABASE_URL` (Use Supabase / Neon or any hosted PG DB URL)
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (e.g. `https://your-domain.vercel.app`)
   - Google Auth Variables (If set up)
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
4. Set Build command to: `npx prisma generate && npx prisma migrate deploy && next build`
5. Click **Deploy**.

Happy Traveling! 💎🗺️
