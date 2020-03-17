import { Meteor } from 'meteor/meteor'
import { Members } from './members.js'

Meteor.methods({
  'createMember' (data) {
    if (data && data.email && data.userId) {
      const member = Members.findOne({ userId: data.userId })
      if (member) return member._id
      else return Members.insert(data)
    }
  },
  'completeProfile' (data) {
    const userId = Meteor.userId()
    if (userId && data && data.fullName) {
      const member = Members.findOne({ userId })
      if (member) {
        const updateMember = Members.update({ _id: member._id }, { $set: data })
        const userData = data
        userData['profile'] = { profileComplete: true }
        return Meteor.users.update({ _id: userId }, { $set: userData })
      }
    } else {
      throw new Meteor.Error(403, 'Invalid details')
    }
  }
})
