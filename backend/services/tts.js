const axios = require('axios');

const ELEVEN_KEY = process.env.ELEVEN_API_KEY;
const VOICE_ID = process.env.ELEVEN_VOICE_ID; // required

async function textToSpeechBase64(text) {
  if (!ELEVEN_KEY || !VOICE_ID) throw new Error('ElevenLabs config missing');
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
  const resp = await axios.post(
    url,
    { text },
    {
      headers: { 'xi-api-key': ELEVEN_KEY, 'Content-Type': 'application/json' },
      responseType: 'arraybuffer',
    }
  );

  const base64 = Buffer.from(resp.data, 'binary').toString('base64');
  return base64;
}

module.exports = { textToSpeechBase64 };
