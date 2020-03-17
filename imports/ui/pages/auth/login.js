import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import './login.html'

Template.Login.onCreated(function () {
  const self = this
  self.progress = new ReactiveVar(false)
})

Template.Login.helpers({
  progress () {
    return Template.instance().progress.get()
  }
})

Template.Login.events({
  'submit #loginForm' (event, template) {
    event.preventDefault()
    const email = $('#inputEmail').val()
    const password = $('#inputPassword').val()

    if (email && password) {
      template.progress.set(true)
      Meteor.loginWithPassword(email, password, (error, result) => {
        if (error) {
          template.progress.set(false)
          alert(error.reason)
        } else {
          template.progress.set(false)
          // console.log('Success')
          FlowRouter.go('/home')
        }
      })
    }
  },
  'click .lnk-register' (event, template) {
    event.preventDefault()
    FlowRouter.go('/register')
  }
})
