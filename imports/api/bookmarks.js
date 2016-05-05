import { Mongo } from 'meteor/mongo';

export const Bookmarks = new Mongo.Collection('bookmarks');

if (Meteor.isServer) {
  Meteor.publish('bookmarks', function publication() {
    const owner = this.userId;
    return Bookmarks.find({
      owner
    });
  });
}
