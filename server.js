// load Express for HTTP
const express = require('express');
// allow to server to get external http requests
const cors = require('cors');
// let the server use the body of the http request (req.body...)
const bodyParser = require('body-parser');

// import the files we wrote to use them for the http requests
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');

// create Express server instance
const app = express();

// activate cors and bodyParser
app.use(cors());
app.use(bodyParser.json());

// activate the files we wrote bellow the specific DNS
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

// define to listen PORT 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
