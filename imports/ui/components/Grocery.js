import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Groceries } from '../../api/groceries.js';

// Grocery component - represents a single todo item
export default class Grocery extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
	  Groceries.update(this.props.grocery._id, {
      $set: { checked: !this.props.grocery.checked },
    });
  }
 
  deleteThisGrocery() {
	  Groceries.remove(this.props.grocery._id);
  }
 render() {
     // Give Groceries a different className when they are checked off,
    // so that we can style them nicely in CSS
    const groceryClassName = this.props.grocery.checked ? 'checked' : '';
   return (
    <li className={groceryClassName}>
    <button className="delete" onClick={this.deleteThisGrocery.bind(this)}>
      &times;
    </button>

    <input
      type="checkbox"
      readOnly
      checked={this.props.grocery.checked}
      onClick={this.toggleChecked.bind(this)}
    />

    <span className="text">
      <strong>{this.props.grocery.username}</strong>: {this.props.grocery.text}
    </span>
  </li>
   );
 }
}

Grocery.propTypes = {
 // This component gets the grocery to display through a React prop.
 // We can use propTypes to indicate it is required
 grocery: PropTypes.object.isRequired,
};