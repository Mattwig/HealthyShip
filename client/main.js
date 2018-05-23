import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import '../imports/startup/accounts-config.js';
import SignIn from '../imports/ui/components/SignIn.js';
import App from '../imports/ui/app.js'
 
Meteor.startup(() => {
	
	render(<App/>, document.getElementById('App'));
	render(<SignIn />, document.getElementById('SignInInfo'));
});