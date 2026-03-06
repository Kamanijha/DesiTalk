const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function translateText(text, target) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`;
  const resp = await axios.post(url, { q: text, target });
  if (resp.data && resp.data.data && resp.data.data.translations && resp.data.data.translations[0]) {
    return resp.data.data.translations[0].translatedText;
  }
  throw new Error('Translation API error');
}

module.exports = { translateText };
