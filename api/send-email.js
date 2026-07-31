// Optional Vercel serverless endpoint for a future Resend connection.
// It intentionally does nothing unless RESEND_API_KEY and EMAIL_FROM are configured.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    return res.status(503).json({ error: 'Email automation is not configured. Use the Supabase email_outbox for manual sending.' })
  }
  return res.status(501).json({ error: 'Connect this endpoint only after verifying a sending domain and completing a privacy review.' })
}
