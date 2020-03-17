import { Mongo } from 'meteor/mongo';
import { FilesCollection } from 'meteor/ostrio:files';

//Image uploads of user profile.
this.ProfileImg = new FilesCollection({
  collectionName: 'profileImg',
  allowClientCode: false,
  onBeforeUpload(file) {
    if (file.size <= 2097152 && /png|jpg|jpeg/i.test(file.extension)) return true;
    return 'Please upload image, with size equal or less than 2MB';
  }
});

if (Meteor.isServer) {
  ProfileImg.denyClient();
}
