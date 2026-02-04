import express from 'express'
import path from 'node:path';
import { fileURLToPath } from 'url';

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set view engine to hbs
app.use(express.static(path.join(__dirname, 'public')));


// set static file (assets)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/myproject', (req, res) => {
  res.sendFile(path.join(__dirname, 'myproject.html'));
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});