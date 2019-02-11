const express = require('express');

const router = express.Router();

const TweetController = require('./controllers/TweetController');
const LikeController = require('./controllers/LikeController');

router.get('/tweets', TweetController.index);
router.post('/tweets', TweetController.store);

router.post('/like/:id', LikeController.store);

router.get('/', (req, res) => res.send('Welcome to the app!'));

module.exports = router;
