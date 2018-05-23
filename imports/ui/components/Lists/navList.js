import React from 'react';
import { NavLink } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from '@material-ui/icons/Home';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import GroceryIcon from '@material-ui/icons/LocalGroceryStore';
import FitnessIcon from '@material-ui/icons/FitnessCenter';

// Export the list to we can add it to the nav, add the router so we can move around the app
export const NavList = (
	
		<div>
			<ListItem button component={NavLink} to="/" replace>
				<ListItemIcon>
					<HomeIcon />
				</ListItemIcon>
				<ListItemText primary="Home" />
			</ListItem>
			<ListItem button component={NavLink} to="/meals" replace>
				<ListItemIcon>
					<RestaurantIcon />
				</ListItemIcon>
				<ListItemText primary="Meals" />
			</ListItem>
			<ListItem button component={NavLink} to="/groceries">
				<ListItemIcon>
					<GroceryIcon />
				</ListItemIcon>
				<ListItemText primary="Grocery List" />
			</ListItem>
			<ListItem button component={NavLink} to="/workouts">
				<ListItemIcon>
					<FitnessIcon />
				</ListItemIcon>
				<ListItemText primary="Workouts" />
			</ListItem>
		</div>
	
);