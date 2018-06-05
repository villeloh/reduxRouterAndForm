import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

  renderField = (field) => {

    // the 'has-danger' and 'text-help' classes come from Bootstrap;
    // the former makes a red outline around a div, while the latter
    // changes text within the enclosing div to be of red color

    // equivalent: const touched = field.meta.touched, etc.
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    // field.input contains handlers like onChange etc.
    // NOTE: field.meta.error comes automatically from the errors object in validate()
    // (provided that the 'name' property of the Field object is named identically to errors.whatever !)
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit = (values) => {

    // works without binding if it's an arrow function.
    // otherwise, use this instead of 'this.onSubmit' below
    // in the render() function: 'this.onSubmit.bind(this)'.

     // this seems to work without this.props... as one would expect
    this.props.createPost(values, () => {

      // callback that navigates back to the root route after the POST request
      // has completed. NOTE: 'history' prop comes from the wrapping Route component
      // in the main index.js file
      this.props.history.push('/');
    });
  };

  render() {

    // comes from the reduxForm helper
    const { handleSubmit } = this.props;

    // handleSubmit adds the validation step
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field 
          label="Title"
          name="title" 
          component={this.renderField}
        />
        <Field 
          label="Categories"
          name="categories" 
          component={this.renderField}
        />
        <Field 
          label="Post Content"
          name="content" 
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// 'values' contains the fields .title, .categories, etc
// called automatically on form submit
const validate = (values) => {

  const errors = {};

  if (!values.title || values.title.length < 3) {
    errors.title = 'Enter a title with a length of at least 3 characters';
  }

  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }

  if (!values.content) {
    errors.content = 'Enter some comtent';
  }

  return errors; // if it's empty, the form is valid
}

export default reduxForm({ 
  form: 'PostsNewForm',
  validate: validate
})(
  connect(null, { createPost })(PostsNew)
);