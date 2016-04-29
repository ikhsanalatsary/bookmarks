import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';

import { Bookmarks } from '../api/bookmarks.js';

import './new-bookmark.html';

Template.newBookmark.events({
  'submit .add-bookmark'(event) {
    event.preventDefault();
    console.log(this._id);

    const categoryId = this._id;
    const target = event.target;
    let title = target.title.value;
    let url = target.url.value;

    if (title === '' || url === '') {
      throw new Meteor.Error('All field required');
      $('#modal1').closeModal();
      return;
    }

    if (typeof categoryId === 'undefined') {
      target.title.value = '';
      target.url.value = '';
      $('#modal1').closeModal();
      Meteor.setTimeout(function() {
        alert('First, you must create category and choose a category!');
      }, 1000);
      return;
    }

    Bookmarks.insert({
      title,
      url,
      createdAt: new Date(),
      categoryId
    }, (error, result) => {
      Router.go('/');
    });

    target.title.value = '';
    target.url.value = '';

    $('#modal1').closeModal();

  }
});
