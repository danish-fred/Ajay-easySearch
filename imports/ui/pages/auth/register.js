import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import { Accounts } from 'meteor/accounts-base'
import { FlowRouter } from 'meteor/kadira:flow-router'
import './register.html'

Template.Register.onCreated(function () {
  const self = this
  self.progress = new ReactiveVar(false)
})

Template.Register.helpers({
  progress () {
    return Template.instance().progress.get()
  }
})

Template.Register.events({
  'submit #registerForm' (event, template) {
    event.preventDefault()
    const email = $('#inputEmail').val()
    const password = $('#inputPassword').val()

    if (email && password) {
      template.progress.set(true)
      Accounts.createUser({email, password}, (error, result) => {
        if (error) {
          template.progress.set(false)
          alert(error.reason)
        } else if (result) {
          const userId = result.id ? result.id : Meteor.userId()
          Meteor.call('createMember', {userId, email}, (err, res) => {
            if (err) {
              template.progress.set(false)
              console.log('Error', err.reason)
            } else {
              template.progress.set(false)
              FlowRouter.go('/home')
            }
          })
        }
      })
    }
  }
})
