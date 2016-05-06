import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Bookmarks = new Mongo.Collection('bookmarks');

if (Meteor.isServer) {
  Meteor.publish('bookmarks', function publication() {
    const owner = this.userId;
    return Bookmarks.find({
      owner
    });
  });
}

Meteor.methods({
  'delete.bookmark'(bookmarkId) {
    check(bookmarkId, String);
    const bookmark = Bookmarks.findOne(bookmarkId);

    if (bookmark.owner !== Meteor.userId()) {
      throw new Meteor.Error('Not Authorized - 401');
    }
    return Bookmarks.remove(bookmarkId);
  },
  'create.bookmark'(title, url, categoryId) {
    check(title, String);
    check(url, String);
    check(categoryId, String);
    const owner = Meteor.userId();

    if (!owner) {
      throw new Meteor.Error('Not Authorized - 401');
    }

    Bookmarks.insert({
      title,
      url,
      createdAt: new Date(),
      owner,
      categoryId
    });
  },
  'edit.bookmark'(bookmarkId, title, url) {
    check(bookmarkId, String);
    check(title, String);
    check(url, String);
    const bookmark = Bookmarks.findOne(bookmarkId);

    if (bookmark.owner !== Meteor.userId()) {
      throw new Meteor.Error('Not Authorized - 401');
    }

    Bookmarks.update(bookmarkId, {
      $set: {
        title,
        url
      }
    });
  }
});
