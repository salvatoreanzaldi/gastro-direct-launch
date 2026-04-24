import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenAI } from '@google/genai';

// Load .env.local first (overwrites .env)
// Use absolute path from project root
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Init clients (with fallback for missing credentials)
let pinecone = null;
let ai = null;

try {
  if (process.env.PINECONE_API_KEY) {
    pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  }
} catch (err) {
  console.warn('⚠️ Pinecone not available - RAG features disabled');
}

try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
} catch (err) {
  console.warn('⚠️ Google GenAI not available - chat features disabled');
}

const EMBEDDING_MODEL = process.env.GEMINI_EMBEDDING_MODEL || 'gemini-embedding-2-preview';
const CHAT_MODEL = process.env.GEMINI_CHAT_MODEL || 'gemini-2.0-flash';
const INDEX_NAME = process.env.PINECONE_INDEX_NAME || 'antigravity';

// ─── Contact Form Email ────────────────────────────────────────────────────

app.post('/api/contact', async (req, res) => {
  try {
    const { name, restaurant, plz, phone, email, message, products } = req.body;

    if (!name || !phone || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Construct email body
    const emailBody = `
Neue Kontaktanfrage von gastro-master.de

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
KONTAKTDATEN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${name}
E-Mail: ${email}
Telefon: ${phone}
Unternehmen: ${restaurant || '-'}
PLZ: ${plz || '-'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NACHRICHT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUKTINTERESSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${products && products.length > 0 ? products.join(', ') : 'Keine Angabe'}
    `.trim();

    // Send email
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@gastro-master.de',
      to: 'info@gastro-master.de',
      subject: `Kontaktanfrage: ${name}`,
      text: emailBody,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    console.log(`✅ Contact email sent from ${email}`);
    res.json({ ok: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('Contact Email Error:', err.message);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

// ─── Health / connection check ─────────────────────────────────────────────

app.get('/api/health', async (req, res) => {
  try {
    const indexes = await pinecone.listIndexes();
    const index = indexes.indexes?.find(i => i.name === INDEX_NAME);
    if (!index) return res.status(404).json({ ok: false, error: `Index "${INDEX_NAME}" not found` });

    res.json({
      ok: true,
      pinecone: {
        connected: true,
        index: index.name,
        host: index.host,
        dimension: index.dimension,
        status: index.status,
      },
      gemini: {
        connected: true,
        embeddingModel: EMBEDDING_MODEL,
        chatModel: CHAT_MODEL,
      },
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ─── Generate embeddings ───────────────────────────────────────────────────

app.post('/api/embed', async (req, res) => {
  try {
    const { texts } = req.body; // string or string[]
    const contents = Array.isArray(texts) ? texts : [texts];

    const response = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents,
      config: { taskType: 'RETRIEVAL_DOCUMENT' },
    });

    res.json({ embeddings: response.embeddings.map(e => e.values) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Upsert content into Pinecone ─────────────────────────────────────────

app.post('/api/upsert', async (req, res) => {
  try {
    const { chunks } = req.body;
    // chunks: [{ id, text, metadata }]

    const texts = chunks.map(c => c.text);
    const response = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: texts,
      config: { taskType: 'RETRIEVAL_DOCUMENT' },
    });

    const vectors = chunks.map((chunk, i) => ({
      id: chunk.id,
      values: response.embeddings[i].values,
      metadata: { text: chunk.text, ...chunk.metadata },
    }));

    const index = pinecone.index(INDEX_NAME);
    await index.upsert(vectors);

    res.json({ ok: true, upserted: vectors.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Query Pinecone ────────────────────────────────────────────────────────

app.post('/api/query', async (req, res) => {
  try {
    const { query, topK = 5 } = req.body;

    const embedResponse = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: [query],
      config: { taskType: 'RETRIEVAL_QUERY' },
    });

    const queryVector = embedResponse.embeddings[0].values;
    const index = pinecone.index(INDEX_NAME);

    const results = await index.query({
      vector: queryVector,
      topK,
      includeMetadata: true,
    });

    res.json({ matches: results.matches });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Google My Business Reviews Proxy ──────────────────────────────────────

app.get('/api/google-reviews', async (req, res) => {
  try {
    const apiKey = process.env.VITE_GOOGLE_PLACES_API_KEY;
    const accountId = process.env.VITE_GOOGLE_ACCOUNT_ID; // e.g. "accounts/123456789"
    const locationId = process.env.VITE_GOOGLE_BUSINESS_LOCATION_ID;

    console.log('🔍 Google My Business Reviews Request:');
    console.log('   API Key:', apiKey ? `***${apiKey.slice(-8)}` : '❌ MISSING');
    console.log('   Account ID:', accountId || '❌ MISSING');
    console.log('   Location ID:', locationId || '❌ MISSING');

    if (!apiKey || !accountId || !locationId) {
      return res.status(400).json({ error: 'Missing API credentials (API Key, Account ID, or Location ID)' });
    }

    // Construct My Business API URL
    const url = `https://mybusinessaccountmanagement.googleapis.com/v1/${accountId}/locations/${locationId}/reviews?key=${apiKey}`;

    console.log('   URL:', url.replace(apiKey, '***API_KEY***'));

    const response = await fetch(url);
    const text = await response.text();

    console.log('   Response Status:', response.status);
    if (!response.ok) {
      console.error('   Response Body:', text.substring(0, 500));
      return res.status(response.status).json({ error: `Google API returned ${response.status}: ${text.substring(0, 200)}` });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('   Failed to parse JSON:', text.substring(0, 300));
      return res.status(500).json({ error: 'Invalid response from Google API' });
    }

    if (data.error) {
      console.error('❌ Google My Business API Error:', data.error.message);
      return res.status(400).json({ error: `Google API: ${data.error.message}` });
    }

    if (!data.reviews || data.reviews.length === 0) {
      console.log('⚠️ No reviews found in Google My Business response');
      return res.status(404).json({ error: 'No reviews found' });
    }

    // Process reviews from My Business API
    const reviews = data.reviews
      .filter((r) => r.reviewText && r.reviewText.length > 0) // Only reviews with text
      .sort((a, b) => b.reviewText.length - a.reviewText.length) // Longest first
      .slice(0, 40) // Top 40 longest
      .sort((a, b) => new Date(b.reviewDatetime) - new Date(a.reviewDatetime)) // Newest first
      .map((review) => ({
        id: review.name || `${review.reviewer?.displayName}-${review.createTime}`,
        rating: review.rating,
        text: review.reviewText,
        author_name: review.reviewer?.displayName || 'Anonymous',
        relative_time_description: review.reviewDatetime || 'Recently',
        profile_photo_url: review.reviewer?.profilePhotoUrl || null,
        author_url: null, // Not available in My Business API
        time: new Date(review.reviewDatetime).getTime() / 1000,
      }));

    // Calculate totals from all reviews (not just top 40)
    const allReviewsRating = data.reviews.length > 0
      ? data.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / data.reviews.length
      : 0;

    console.log(`✅ Successfully loaded ${reviews.length} reviews from Google My Business API (${data.reviews.length} total)`);

    res.json({
      reviews,
      totalRating: Math.round(allReviewsRating * 10) / 10,
      totalCount: data.reviews.length,
    });
  } catch (error) {
    console.error('Google Reviews Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ─── Full RAG Chat ─────────────────────────────────────────────────────────

app.post('/api/chat', async (req, res) => {
  try {
    const { message, topK = 5 } = req.body;

    // 1. Embed the user query
    const embedResponse = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: [message],
      config: { taskType: 'RETRIEVAL_QUERY' },
    });
    const queryVector = embedResponse.embeddings[0].values;

    // 2. Retrieve relevant chunks from Pinecone
    const index = pinecone.index(INDEX_NAME);
    const results = await index.query({
      vector: queryVector,
      topK,
      includeMetadata: true,
    });

    const context = results.matches
      .map(m => m.metadata?.text || '')
      .filter(Boolean)
      .join('\n\n---\n\n');

    // 3. Generate answer with Gemini
    const systemPrompt = `Du bist ein hilfreicher Assistent für Gastro Master, eine moderne Bestellmanagement-Plattform für die Gastronomie.
Beantworte Fragen ausschließlich basierend auf dem bereitgestellten Kontext.
Wenn der Kontext keine relevanten Informationen enthält, sage das ehrlich.
Antworte auf Deutsch, es sei denn, der Nutzer schreibt in einer anderen Sprache.

Kontext:
${context}`;

    const response = await ai.models.generateContent({
      model: CHAT_MODEL,
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + '\n\nFrage: ' + message }] },
      ],
    });

    const answer = response.candidates?.[0]?.content?.parts?.[0]?.text || 'Keine Antwort verfügbar.';

    res.json({
      answer,
      sources: results.matches.map(m => ({
        score: m.score,
        text: m.metadata?.text?.substring(0, 200) + '...',
      })),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Start ─────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n✅ Gastro Master RAG Server running on http://localhost:${PORT}`);
  console.log(`   Pinecone index : ${INDEX_NAME}`);
  console.log(`   Embedding model: ${EMBEDDING_MODEL}`);
  console.log(`   Chat model     : ${CHAT_MODEL}\n`);
});
