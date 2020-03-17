import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { countryList } from '/imports/startup/client/country.js'

import './profile.html'

Template.Profile.onCreated(function () {
  const self = this
  self.progress = new ReactiveVar(false)
})

Template.Profile.helpers({
  countryList () {
    return countryList
  },
  checkUserProfileStatus () {
    const user = Meteor.user()
    if (user && user.profile && user.profile.profileComplete) return FlowRouter.go('/home')
  },
  progress () {
    return Template.instance().progress.get()
  }
})

Template.Profile.events({
  'change #inputAvatarFile' (event, template) {
    const files = event.target.files
    if (files && files.length) {
      const file = files[0]
      var reader = new FileReader()
      reader.onload = (function(e) {
        $('#profileImage').attr('src', e.target.result)
        $('#fileLabel').html(file.name)
      })
      reader.readAsDataURL(file)
    }
  },
  'submit #profileForm' (event, template) {
    event.preventDefault()
    const formArray = $('#profileForm').serializeArray()
		const formData = {}
		formArray.forEach(function(item) {
			formData[item.name] = item.value
		})

    if (formData && formData.fullName) {
      const files = $('#inputAvatarFile')[0].files
      if (files && files.length) {
        template.progress.set(true)
        //
        var uploadInstance = ProfileImg.insert({
          file: files[0],
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false)
        uploadInstance.on('end', function(error, fileObj) {
          if (!error) {
            formData['avatarId'] = fileObj._id
            Meteor.call('completeProfile', formData, (error, result) => {
              if(error) {
                template.progress.set(false)
                console.log(error)
              } else {
                console.log(result)
                FlowRouter.go('/home')
              }
            })
          } else template.progress.set(false)
        })
        uploadInstance.start()
      } else {
        console.log('Avatar is required')
      }
    }
  }
})
