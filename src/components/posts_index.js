import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {

  componentDidMount() {

    this.props.fetchPosts(); // why is this.props needed here ??
  }

  renderPosts = () => {

    return _.map(
      this.props.posts, 
      post => { 
        return (
        <li className="list-group-item" key={post.id}>
          {post.title}
        </li>
        );
      } 
    );
  };

  render() {

    return (
      <div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return { posts: state.posts };
}

// an alternative way to connect action creators to components (no mapDispatchToProps() function needed)
export default connect(mapStateToProps, { fetchPosts: fetchPosts })(PostsIndex);