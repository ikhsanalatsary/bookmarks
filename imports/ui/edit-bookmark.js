import { Template } from 'meteor/templating';
import { Bookmarks } from '../api/bookmarks.js';

import './edit-bookmark.html';

Template.editBookmark.events({
    'submit .edit-bookmark'(event) {
      event.preventDefault();

      const id = this._id;
      const target = event.target;
      let title = target.title.value;
      let url = target.url.value;

      if (title === '' || url === '') {
        throw new Meteor.Error('All field required');
        return;
      }

      Bookmarks.update(id, {
        $set: {
          title,
          url
        }
      }, (error, result) => {
        Router.go('/');
      });

    }
});
