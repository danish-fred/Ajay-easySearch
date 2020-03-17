import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/components/loading.html'
import '../../ui/layouts/auth/auth.js';
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/auth/login.js';
import '../../ui/pages/auth/register.js';
import '../../ui/pages/profile/profile.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App',
  action() {
    if (Meteor.userId()) {
      FlowRouter.go('/home')
    } else {
      FlowRouter.go('/login')
    }
  },
});

FlowRouter.route('/login', {
  name: 'App.login',
  action() {
    BlazeLayout.render('App_auth', { main: 'Login' });
  }
});
FlowRouter.route('/register', {
  name: 'App.register',
  action() {
    BlazeLayout.render('App_auth', { main: 'Register' });
  }
});

FlowRouter.route('/home', {
  name: 'App.home',
  action() {
    if (Meteor.userId()) {
      BlazeLayout.render('App_body', { main: 'App_home' });
    } else {
      FlowRouter.go('/login')
    }
  }
});
FlowRouter.route('/profile', {
  name: 'profile',
  action() {
    BlazeLayout.render('App_body', { main: 'Profile' });
  }
})

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
