import React, { Component } from 'react'
import socket from 'socket.io-client';

// import twitterLogo from '../twitter.svg';
// import './Timeline.css';

import Tweet from '../components/Tweet';

import api from '../services/api';

export default class Timeline extends Component {
  state = {
    newTweet: '',
    tweets: [],
  }

  async componentDidMount() {
    this.subscribeToEvents();

    const tweets = await api.get('/tweets')
    
    this.setState({ tweets: tweets.data });
  }

  handleInputChange = (event) => this.setState({ newTweet: event.target.value });

  handleNewTweet = async (event) => {
    if (event.keyCode !== 13) return;

    const author = localStorage.getItem('@CloneApp:username');
    const content = this.state.newTweet;

    await api.post('tweets', { content, author });

    this.setState({ newTweet: '' });
  }

  subscribeToEvents = () => {
    const io = socket('http://localhost:3001');

    io.on('tweet', (data) => {
      this.setState({ tweets: [data, ...this.state.tweets] });
    })

    io.on('like', (data) => {

      console.log(this.state);
      this.setState({
        tweets: this.state.tweets.map(value => (
          value._id === data._id ? data : value
          ))
      });

      console.log(this.state);
    })
  }

  render() {
    return (
      <div className="timeline-wrapper">
        {/* <img src="twitterLogo" alt="Twitter Logo" height={24} /> */}
        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="What's happening?"
          />
        </form>

        {this.state.tweets.map(tweet => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </div>
    )
  }
}
