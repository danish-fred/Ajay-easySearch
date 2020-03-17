import { Template } from 'meteor/templating'

import './friend.html'

Template.friend.helpers({
  avatar () {
    const item = this
    if (item && item.avatarId) {
      return `/cdn/storage/profileImg/${item.avatarId}/original/${item.avatarId}`
    } else return '/img/profile.png'
  }
})
