import { Template } from 'meteor/templating';
import { Bookmarks } from '../api/bookmarks.js';

import './bookmarks.html';

Template.bookmark.events({
  'click .clear'() {
    const id = this._id;
    const bookmark = Bookmarks.findOne(id);

    if (bookmark.owner !== Meteor.userId()) {
      throw new Meteor.Error('Not Authorized - 401');
    }
    return Bookmarks.remove(id);
  }
});
