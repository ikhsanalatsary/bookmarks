import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Bookmarks } from '../api/bookmarks.js';

import './bookmarks.js';
import './body.html';

Template.main.helpers({
  bookmarks() {
    console.log(this._id);
    const categoryId = this._id;
    return Bookmarks.find({ categoryId });
  }
});
