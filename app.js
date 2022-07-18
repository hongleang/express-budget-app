const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

const envelopesRouter = require('./router/envelopes');

app.use('/envelopes', envelopesRouter);


app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})


