const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const routes = require('./routes/routes');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

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
});
