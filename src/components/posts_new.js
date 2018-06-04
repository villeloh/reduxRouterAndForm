import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {

  renderField = (field) => {

    // field.input contains handlers like onChange etc
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input className="form-control"
          type="text"
          {...field.input}
        />
      </div>
    );
  }

  render() {

    return (
      <form>
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
})(PostsNew);