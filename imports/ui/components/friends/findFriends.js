import { Template } from 'meteor/templating'
import { MembersIndex } from '/imports/api/users/members.js'

import { countryList } from '/imports/startup/client/country.js'

import './findFriends.html'

Template.FindFriends.helpers({
  inputAttributes () {
		return { 'class': 'easy-search-input form-control', 'placeholder': 'Start searching...' };
	},
  index () {
    return MembersIndex
  },
	resultsCount () {
		return MembersIndex.getComponentDict().get('count');
	},
  countryList () {
    return countryList
  }
})

Template.FindFriends.events({
  'change .country-filter' (event, template) {
    MembersIndex.getComponentMethods().addProps('countryFilter', $(event.target).val());
    // Reset page
    MembersIndex.getComponentDict().set('currentPage', 1);
    MembersIndex.getComponentMethods().paginate(1);
  }
})
