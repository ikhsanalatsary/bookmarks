import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';

import { Bookmarks } from '../api/bookmarks.js';

import './bookmarks.js';
import './body.html';

Template.main.helpers({
  bookmarks() {
    // console.log(this._id);
    const categoryId = this._id;
    if (typeof categoryId === 'undefined') {
      return Bookmarks.find({});
    } else {
      return Bookmarks.find({ categoryId });
    }
  },
  isCategory() {
    console.log(this._id);
    const currentCategory = this._id;
    if (typeof currentCategory === 'undefined') {
      $('.modal-trigger').hide();
      return;
    }

    return $('.modal-trigger').show();
  }
});

Template.main.events({
  'click .modal-trigger'(event) {
    event.preventDefault();

     $('#modal1').openModal();
  }
});
