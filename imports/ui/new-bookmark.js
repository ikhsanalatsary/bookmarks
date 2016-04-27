import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Bookmarks } from '../api/bookmarks.js';

import './new-bookmark.html';

Template.newBookmark.events({
  'submit .add-bookmark'(event) {
    event.preventDefault();

    const target = event.target;
    let title = target.title.value;
    let url = target.url.value;

    if (title === '' || url === '') {
      throw new Meteor.Error('All field required');
      return;
    }

    Bookmarks.insert({
      title,
      url,
      createdAt: new Date()
    }, (error, result) => {
      Router.go('/');
    });

    target.title.value = '';
    target.url.value = '';

  }
});
