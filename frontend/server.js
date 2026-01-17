import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
app.use(cors());

const MOONPAY_SECRET_KEY = process.env.MOONPAY_SECRET_KEY;

app.get('/sign-url', (req, res) => {
  const { url } = req.query;

  if (!url || !MOONPAY_SECRET_KEY) {
    console.log('Missing:', { url: !!url, key: !!MOONPAY_SECRET_KEY });
    return res.status(400).json({ error: 'Missing url or secret key' });
  }

  try {
    const parsedUrl = new URL(url);

    // Remove mpSdk param (added by SDK, not part of signature)
    parsedUrl.searchParams.delete('mpSdk');
    // Use query string with leading '?'
    const queryString = parsedUrl.search;

    console.log('Signing query string:', queryString);
    console.log('Using secret key starting with:', MOONPAY_SECRET_KEY?.substring(0, 10));

    const signature = crypto
      .createHmac('sha256', MOONPAY_SECRET_KEY)
      .update(queryString)
      .digest('base64');

    console.log('Generated signature:', signature);

    res.json({ signature });
  } catch (err) {
    console.error('Signing error:', err);
    res.status(500).json({ error: 'Failed to sign URL' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Secret key loaded:', !!MOONPAY_SECRET_KEY);
});
