const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3000;

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

// Middlewares
app.use(express.json());
app.use(cors());

const envelopesRouter = require('./router/envelopes');

app.use('/envelopes', envelopesRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})


