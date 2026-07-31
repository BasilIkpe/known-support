# KNOWN OS 1.0

Premium React + Vite platform for The KNOWN Movement.

## Included

- Cinematic public experience with KNOWN logo, tree and book artwork
- Story, Book, Cards, Summit and Community pages
- Participant, volunteer, individual-support and institutional-partnership forms
- Supabase RPC integration with reference generation
- Private Team KNOWN dashboard
- Privacy, terms, safeguarding and contact pages
- Responsive layouts for phones, tablets, desktops, ultra-wide screens and TVs

## Install

```bash
npm install
npm run dev
```

## Environment variables

Copy `.env.example` to `.env.local` for local development and use real values there. Do not commit `.env.local`.

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

In Vercel, add the same two values under Project Settings > Environment Variables.

## Supabase

For an existing KNOWN database that already has the earlier foundation, run only:

`supabase/02-known-os-v4-additions.sql`

For a fresh database, run file 01 and then file 02. The scripts create participant registration, volunteers, circles, attendance, consent records, email outbox, individual support and partnership enquiries with RLS policies and secure RPC functions.

## Team KNOWN dashboard

Route: `/team-known`

Create Supabase Auth users for authorised staff and ensure their UUID is present in the existing `admin_profiles` table with `is_active = true`.

## Deployment

Upload the contents of this folder to the GitHub repository root. Vercel should remain connected to the repository and will deploy automatically from the production branch.
