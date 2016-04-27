import { Template } from 'meteor/templating';
import { Bookmarks } from '../api/bookmarks.js';

import './bookmarks.html';

Template.bookmark.events({
  'click .delete'() {
    return Bookmarks.remove(this._id);
  }
});
