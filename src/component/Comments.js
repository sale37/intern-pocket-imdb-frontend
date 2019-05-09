import React, { Component } from "react";
import '../styles/css/Comments.css';

class Comments extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="comments-container">
        <div className="comments-header">Comments:</div>
        <div className="comments-list">
          {this.props.comments.map(comment => (
            <div className="comment-content" key={comment.id}>
              <div className="comment-author" >
                <h6>{comment.author}</h6>
              </div>
              <div className="comment-description">
                {comment.comment}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Comments;
