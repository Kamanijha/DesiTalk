const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const whisper = require('../services/whisper');
const translate = require('../services/translate');
const tts = require('../services/tts');

const upload = multer({ dest: path.join(__dirname, '..', 'tmp') });

// Upload audio blob, transcribe using Whisper
router.post('/whisper', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const transcription = await whisper.transcribe(filePath);
    // clean temp file
    fs.unlink(filePath, () => {});
    res.json({ text: transcription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Whisper transcription failed' });
  }
});

// Translate text
router.post('/translate', async (req, res) => {
  try {
    const { text, target } = req.body;
    const translated = await translate.translateText(text, target);
    res.json({ text: translated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Translation failed' });
  }
});

// Generate TTS audio and return base64
router.post('/tts', async (req, res) => {
  try {
    const { text } = req.body;
    const base64 = await tts.textToSpeechBase64(text);
    res.json({ audioBase64: base64 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'TTS failed' });
  }
});

module.exports = router;
