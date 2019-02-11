const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 3001;

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

mongoose.connect('mongodb://goweek:goweek123@ds021895.mlab.com:21895/clone-app', { useNewUrlParser: true });

server.listen(port, () => console.log(`Server is up at port ${port}.`));
