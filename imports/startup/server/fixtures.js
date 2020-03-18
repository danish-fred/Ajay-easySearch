// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Members } from '../../api/users/members.js';

import { countryList } from '/imports/startup/both/country.js'

Meteor.startup(() => {
  const totalMembers = Members.find().count()
  if (totalMembers == 0) {
    var list = new Array(1000)
    for(var i = 0; i < list.length; i++) {
      const index = (i + 1)
      const email = `user${index}@domain.com`
      const userId = Accounts.createUser({email, password: 'user123'})
      if (userId) {
        const fullName = `User ${index}`
        const professionalTitle = `Position ${index}`
        const educationalTitle = `Education ${index}`
        const organization = `Organization`
        const city = `City`
        const country = getRandomCountryFn()
        const memberData = { userId, email, fullName, professionalTitle, professionalTitle, organization, city, country }
        Members.insert(memberData)
        //
        const userData = memberData
        Object.keys(userData).forEach(key => ['userId', 'email'].indexOf(key) != -1 ? delete userData[key] : {});
        userData['profile'] = { profileComplete: true }
        Meteor.users.update({ _id: userId }, { $set: userData })
      }
    }
  }
});

const getRandomCountryFn = function () {
  return countryList[Math.floor(Math.random() * countryList.length)]
}
