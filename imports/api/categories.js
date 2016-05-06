import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Bookmarks } from './bookmarks.js';
export const Categories = new Mongo.Collection('categories');

if (Meteor.isServer) {
  Meteor.publish('categories', function publication() {
    const owner = this.userId;
    return Categories.find({ owner });
  });
}

Meteor.methods({
  'create.category'(name) {
    const owner = Meteor.userId();
    check(name, String);

    if (!owner) {
      throw new Meteor.Error('Not Authorized - 401');
    }

    if (name === '') {
      name = defaultName(owner);
    }

    let data = {
      name,
      createdAt: new Date(),
      owner
    }

    return Categories.insert(data);
  },
  'edit.category'(categoryId, name) {
    check(categoryId, String);
    check(name, String);

    const category = Categories.findOne(categoryId);

    if (category.owner !== Meteor.userId()) {
      throw new Meteor.Error('Not Authorized - 401');
    }

    Categories.update(categoryId, {
      $set: {
        name,
      }
    });
  },
  'delete.category'(categoryId) {
    check(categoryId, String);
    const category = Categories.findOne(categoryId);
    const bookmark = Bookmarks.find({ categoryId });

    if (category.owner !== Meteor.userId()) {
      throw new Meteor.Error('Not Authorized - 401');
    }

    bookmark.forEach((bookmark) => {
      let bookmarkId = bookmark._id;
      return Bookmarks.remove(bookmarkId);
    });

    return Categories.remove(categoryId);
  }
});

function defaultName(currentUser) {
  var nextLetter = 'A';
  var nextName = 'Category ' + nextLetter;
  while (Categories.findOne({ name: nextName, createdBy: currentUser })) {
    nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    nextName = 'Category ' + nextLetter;
  }
  return nextName;
}
