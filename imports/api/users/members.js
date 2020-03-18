import { Mongo } from 'meteor/mongo';
import { EasySearch } from 'meteor/easy:search';

export const Members = new Mongo.Collection('members');

export const MembersIndex = new EasySearch.Index({
   collection: Members,
   fields: ['fullName', 'email', 'professionalTitle', 'educationalTitle', 'organization', 'city', 'country'],
   engine: new EasySearch.MongoDB({
     selector: function (searchObject, options, aggregation) {
       let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
       let countryFilter = options.search.props.countryFilter;

       if (countryFilter) {
         selector.country = countryFilter;
       }
       return selector;
     }
   }),
   defaultSearchOptions: {
     limit: 50
   }
});
