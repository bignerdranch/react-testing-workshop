const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config');
const routes = require('./routes');
const webSocketServer = require('./webSocketServer');

const app = express();
const { port } = config;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`Accessing ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Hi!' });
});

app.use('/', routes);

// 4 params are required for the error handler even though we don't use them all
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something broke!');
});

const server = http.createServer(app);

server.on('upgrade', (request, socket, head) => {
  // Skip auth since we don't have the cookie and would have to reconfigure the proxy to get it
  // const user = getUser(request);
  // if (user?.access !== 'associate') {
  webSocketServer.handleUpgrade(request, socket, head, (ws) => {
    webSocketServer.emit('connection', ws, request);
  });
  // } else {
  //     socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
  //     socket.destroy();
  // }
});

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
