import '../imports/startup/client/routes.js';

if (Meteor.isClient) {
  Meteor.subscribe('categories');
  Meteor.subscribe('bookmarks');
}
