import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Bookmarks } from '../api/bookmarks.js';

import './bookmarks.js';
import './body.html';

Template.main.helpers({
  bookmarks() {
    return Bookmarks.find({});
  }
});
