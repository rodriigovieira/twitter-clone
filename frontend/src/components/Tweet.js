import React, { Component } from 'react'
import api from '../services/api';

// import like from '..//Like.svg';
// import './Tweet.css';

export default class Tweet extends Component {
  handleLike = async () => {
    await api.post(`like/${this.props.tweet._id}`)
  }

  render() {
    return ( 
      <ul className="tweet-list">
        <li className="tweet">
          <strong>{this.props.tweet.author}</strong>
          <p>{this.props.tweet.content}</p>

          <button onClick={this.handleLike}>
            {/* <img src={like} alt="like"/> */}
            {this.props.tweet.likes}
          </button>
        </li>
      </ul>
    )
  }
}
