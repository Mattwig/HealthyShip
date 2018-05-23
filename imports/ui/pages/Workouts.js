import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Workouts } from '../../api/workouts.js'

import Workout from '../components/Workout.js';

class WorkoutList extends Component
{
     constructor(props)
     {
          super(props);
     }

     renderWorkouts() {
     
          let workouts = this.props.workouts;
          
          return workouts.map((Workout) =>
	     (
               <Workout key={Workout._id} workout={Workout}/>
          ));
     }

     render()
     {
          return (
          <div className="container">
               <header>
               <h1>Today's Workout</h1>

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
               {this.renderWorkouts()}
               </ul>
          </div>
          );
     }
}

WorkoutList.propTypes = {
     workouts: PropTypes.array.isRequired,
};

export default withTracker(() =>{
     return {
          workouts: Workouts.find({}, {sort: {createdAt:-1}}).fetch(),
          currentUser: Meteor.user(),
     };
})
(WorkoutList);