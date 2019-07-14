import React, { Component } from "react";
import { movieService } from "../services/MovieService";
import "../styles/css/Comment.css";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
  }

  handleTextChange(event) {
    this.setState({ comment: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const comment = {
      comment: this.state.comment,
      movie_id: this.props.id
    };

    movieService.postComment(comment).then(response => {
      this.setState({
        comment: ""
      })
    }).then(alert('Comment Posted'));
  }

  render() {
    return (
      <form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
        <textarea
          className="comment-input"
          type="text"
          placeholder="Comment something..."
          value={this.state.comment}
          onChange={this.handleTextChange.bind(this)}
        />
        <div className="submit-comment">
          <input type="submit" value="Comment" />
        </div>
      </form>
    );
  }
}

export default Comment;
