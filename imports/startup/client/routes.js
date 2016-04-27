import { Router } from 'meteor/iron:router';
import { Template } from 'meteor/templating';

import { Bookmarks } from '../../api/bookmarks.js';

// Import to load these templates
import '../../ui/body.js';
import '../../ui/new-bookmark.js';
import '../../ui/edit-bookmark.js';

Router.configure({
  // the default layout
  layoutTemplate: 'home'
});

Router.route('/', {
  template: 'main'
});

Router.route('/new-bookmark', {
  name: 'newBookmark',
  template: 'newBookmark'
});

Router.route('/edit-bookmark/:_id', {
  name: 'editBookmark',
  template: 'editBookmark',
  data() {
    let currentBookmark = this.params._id;
    return Bookmarks.findOne({ _id: currentBookmark});
  }
});
