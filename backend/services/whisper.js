const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const OPENAI_KEY = process.env.OPENAI_API_KEY;

async function transcribe(filePath) {
  const url = 'https://api.openai.com/v1/audio/transcriptions';
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));
  form.append('model', 'whisper-1');

  const resp = await axios.post(url, form, {
    headers: {
      ...form.getHeaders(),
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  return resp.data.text;
}

module.exports = { transcribe };
