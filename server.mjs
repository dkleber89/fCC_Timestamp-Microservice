// server.mjs
// where your node app starts

// init project
import express from 'express';
import cors from 'cors';
import { gDirname } from './utils/utilityFunctions.mjs';

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(`${gDirname(import.meta.url)}/views/index.html`);
});

// your first API endpoint...
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// timestamp functionality
app.get('/api/timestamp/:date_string?', (req, res) => {
  let date = new Date();

  if (!req.params.date_string) {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
    return;
  }

  if (Number(req.params.date_string)) {
    date = new Date(parseInt(req.params.date_string, 10));

    res.json({ unix: date.getTime(), utc: date.toUTCString() });
    return;
  }

  date = new Date(req.params.date_string);

  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

// listen for requests :)
const port = process.env.PORT || 3000;

const listener = app.listen(port, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
