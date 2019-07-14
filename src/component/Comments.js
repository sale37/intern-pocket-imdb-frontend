import React, { Component } from "react";
import "../styles/css/Comments.css";

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: 2
    };

    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState(prev => {
      return { visible: prev.visible + 4 };
    });
  }

  render() {
    return (
      <div>
        <div className="comments-container">
        <h2>Comments</h2>
          {this.props.comments
            .slice(0, this.state.visible)
            .map((comment, index) => {
              return (
                  <div className="comment-content">
                    <h5>{comment.author}</h5>
                    <p>{comment.comment}</p>
                  </div>
              );
            })}
        </div>
        <div className="load-more-button">
        <div>
          {this.state.visible < this.props.comments.length && (
            <button onClick={this.loadMore} type="button" className="load-more">
              Load more
            </button>
          )}
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
