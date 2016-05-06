import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Bookmarks } from '../api/bookmarks.js';

import './bookmarks.html';

Template.bookmark.events({
  'click .clear'() {
    const id = this._id;
    Meteor.call('delete.bookmark', id);
  }
});
