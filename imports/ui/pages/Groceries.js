import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Groceries } from '../../api/groceries.js'

import Task from '../components/Grocery.js';

// App component - represents the whole app
class App extends Component
{
     constructor(props)
     {
          super(props);
	 
	     this.state = {
	          hideCompleted: false,
	     };
     }
     
     handleSubmit(event)
     {
          event.preventDefault();
 
          // Find the text field via the React ref
          const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
	     Groceries.insert({
	          text,
	          createdAt: new Date(), // current time
	          owner: Meteor.userId(),
	          username: Meteor.user().username,
	     });
	 
          // Clear form
          ReactDOM.findDOMNode(this.refs.textInput).value = '';
     }

  
     toggleHideCompleted()
     {
          this.setState({
               hideCompleted: !this.state.hideCompleted,
          });
     }
 

     renderTasks() {

          let filteredTasks = this.props.tasks;

          if (this.state.hideCompleted)
          {
               filteredTasks = filteredTasks.filter(task => !task.checked);
          }

          return filteredTasks.map((task) =>
	     (
               <Task key={task._id} task={task} />
          ));
     }

     render()
     {
          return (
               <div className="container">
                    <header>
	               <h1>Shopping List ({this.props.incompleteCount})</h1>
	
	               <label className="hide-completed">
		               <input
			               type="checkbox"
			               readOnly
			               checked={this.state.hideCompleted}
			               onClick={this.toggleHideCompleted.bind(this)}
		               />
		               Hide Items in Cart
	               </label>
	
	
	
	               { this.props.currentUser ?
		               <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
			               <input
				               type="text"
				               ref="textInput"
				               placeholder="Type to add new tasks"
			               />
		               </form> : ''
	               }
                    </header>
               
                    <ul>
                         {this.renderTasks()}
                    </ul>
               </div>
          );
     }
}

App.propTypes = {
     tasks: PropTypes.array.isRequired,
};

export default withTracker(() =>{
     return {
          tasks: Groceries.find({}, {sort: {createdAt:-1}}).fetch(),
          incompleteCount: Groceries.find({ checked: { $ne: true } }).count(),
          currentUser: Meteor.user(),
     };
})
(App);