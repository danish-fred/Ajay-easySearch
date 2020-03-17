import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import './auth.html'

Template.App_auth.helpers({
  userId () {
    return Meteor.userId()
  },
  goToHome () {
    FlowRouter.go('/home')
  }
})
