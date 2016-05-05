import { Mongo } from 'meteor/mongo';

export const Categories = new Mongo.Collection('categories');

if (Meteor.isServer) {
  Meteor.publish('categories', function publication() {
    const owner = this.userId;
    return Categories.find({ owner });
  });
}
