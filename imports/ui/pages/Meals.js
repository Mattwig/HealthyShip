import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Meals } from '../../api/meals.js'

import Meal from '../components/Meal.js';

class MealList extends Component
{
     constructor(props)
     {
          super(props);
     }

     renderMeals() {
     
          let meals = this.props.meals;
          
          return meals.map((meal) =>
	     (
               <Meal key={meal._id} meal={meal}/>
          ));
     }

     render()
     {
          return (
          <div className="container">
               <header>
               <h1>Today's Meal</h1>

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
               {this.renderMeals()}
               </ul>
          </div>
          );
     }
}

MealList.propTypes = {
     meals: PropTypes.array.isRequired,
};

export default withTracker(() =>{
     return {
          meals: Meals.find({}, {sort: {createdAt:-1}}).fetch(),
          currentUser: Meteor.user(),
     };
})
(MealList);