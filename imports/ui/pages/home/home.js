import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'

import './home.html'

import '../../components/hello/hello.js'
import '../../components/info/info.js'
import '../../components/friends/findFriends.js'
import '../../components/friends/friend.js'

Template.App_home.onCreated(function () {

})

Template.App_home.helpers({
  userReady () {
    return Meteor.user()
  },
  goToProfileForm () {
    return FlowRouter.go('/profile')
  }
})

Template.App_home.events({
  'click #btnLogout' (event, template) {
    event.preventDefault()
    Meteor.logout(function (err, res) {
      if (err) console.log(err)
      else {
        FlowRouter.go('/login')
      }
    })
  }
})
