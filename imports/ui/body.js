import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';

import { Bookmarks } from '../api/bookmarks.js';

import './bookmarks.js';
import './body.html';
import './login/signin.html';
import './login/signup.html';

Template.main.helpers({
  bookmarks() {
    const categoryId = this._id;
    if (typeof categoryId === 'undefined') {
      return Bookmarks.find({});
    } else {
      return Bookmarks.find({ categoryId });
    }
  },
  isCategory() {
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
