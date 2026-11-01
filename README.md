# Drishti History Compass

Website for Dr. Drishti Kalra's UPSC, State PCS and UGC NET-JRF mentorship, with a private publishing studio (`/studio`, sign in at `/auth`) for articles, carousels and videos.

Built with TanStack Start, React, Tailwind and Supabase.

## Development

```sh
cp .env.example .env   # fill in your Supabase values
npm install
npm run dev            # http://localhost:8080
npm test
```

## Production

`npm run build` produces a standalone Node server in `.output/`; `npm start` runs it. See [DEPLOY.md](DEPLOY.md) for Supabase setup, the publisher login and running it on a VM.
