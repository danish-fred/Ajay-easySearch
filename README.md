# Ajay-easySearch
implement atmosphere packages Meteor easy:search + ostrio:files in new Meteor app. 

easy:search wil index Meteor.users collection !!!O:B:S:

In new Meteor app - set up user-accounts. After account created, use flowRouter.go to direct to a form you set up. Dont use Accounts.onCreateUser(function()to set up this form.
 I prefere to first create the account - and then we are current.user.

This form will contain 7 input fields incl a file upload for an avatar. Use bootstrap 4 for this form.( minimal styling).
 The fields in this form will be -  fileUpload(avatar) - fullname(first + last) - professionalTitel - educationalTitel - Organisation(job/school) - city and Country,
  these fields will be saved to the user collection as toplevel (not profile) fields.

Create 2 templates for the "easy:search" set up: one called 'findFriends' and one called 'friends' ( use bootstrap4 ).
I recommend you clone the github rep. "easy-search-leaderboard" and reuse the templates and css
for the findFriends template you will have the 'easy:search input' and the 'category-filter' and 
 
<ol class="leaderboard">
    {{#EasySearch.Each index=index }}
      {{> friend}}
    {{/EasySearch.Each}}
  </ol>

For the friend template, which we use as a for each: we will have all the top-level fields from the Meteor.users collection incl. avatar
(skip the styling in friends.template - just make sure that all fields are pressent {{ fields}}

 But for the category-filter I want a country collection to be data-source. ( so lets make it a country.filter )
So set up a country collection and populate it with "world countries" There are plenty of arrays and list on line, just to copy.

Now in the "easy:search" : Creating index - I want the meteor.users as the collection, and the fields. could be ['fullname', 'educationalTitle'].
That way we should be able to search all users - comming to a point where you should be able to choose/highligt one.

Like in the github: "easy:search-leaderboard" you are recommended to set up a population of users to work with. The "leaderboard set up 10.000 but the choice is your 
just remember that unlike the"leaderborad" our users have to have an _id. Otherwise they can not be in the users collection.
And if populating the users collection we must have possibility to edit the form we created just after the create.account - in order to  upload some avatars.
But you can create the population manually as well

When making this Meteor app. I want you to use 'meteor create --full' blaze - just to make shure we are using the same the structure.
Keep in mind that this is not for production yet - so remember in ostrio:files where to save the files (on the local disk).

