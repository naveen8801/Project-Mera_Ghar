const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const routes = require('./routes/routes');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const socketIO = require('socket.io');

dotenv.config({ path: 'config/config.env' });

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
);
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(routes);
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send(
    '<h1 style={{textAlign : "center"}}>Welcome To Mera Ghar Server</h1>'
  );
});

connectDB().then(() => {
  const server = app.listen(
    PORT,
    console.log(`Server running on port ${PORT}`.green.italic.bold)
  );

  io = socketIO(server);

  module.exports.io = io;
});
