import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Bookmarks } from '../api/bookmarks.js';

import './body.html';

Template.body.helpers({
  // bookmarks: [
  //   {title: "Meteor", url: "https://www.meteor.com/"},
  //   {title: "AngularJS", url: "https://angularjs.org/"},
  //   {title: "Google", url: "https://google.com/"},
  // ]
  bookmarks() {
    return Bookmarks.find({});
  }
});
