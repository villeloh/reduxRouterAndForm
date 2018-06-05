import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
import { deletePost } from '../actions';

class PostsShow extends Component {

  componentDidMount() {

    if (!this.props.post) {
      const { id } = this.props.match.params; // provided by React Router; params contains all the wildcard props in the url
      this.props.fetchPost(id);
    }
  }

  onDeleteClick = () => {

    const { id } = this.props.match.params; // OR: this.props.post.id... but it might not be loaded yet!
    this.props.deletePost(id, () => {
      this.props.history.push('/'); // return to the list of posts after deleting the post
    });
  };

  render() {

    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button 
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// ownProps === this.props; it's name is only a convention
const mapStateToProps = ({ posts }, ownProps) => {

  return { post: posts[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);