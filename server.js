// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { runTogetherScript } = require('./together-interpreter');

const app = express();
app.use(bodyParser.json());

app.post('/run', (req, res) => {
  const code = req.body.code;
  if (!code) return res.status(400).json({ error: 'No code provided.' });

  try {
    const output = runTogetherScript(code);
    res.json({ output });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Together backend running on http://localhost:${PORT}`);
});
