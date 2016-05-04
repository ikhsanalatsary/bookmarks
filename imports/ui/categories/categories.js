import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import swal from 'sweetalert';

import { Categories } from '../../api/categories.js';
import { Bookmarks } from '../../api/bookmarks.js';

import './new-category.js'
import './categories.html';

Template.category.onRendered(function () {
  $('.button-collapse').sideNav();
  // $('.collapsible').collapsible();
});

Template.category.helpers({
  categories() {
    const owner = Meteor.userId();
    return Categories.find({ owner });
  }
});

Template.category.events({
  'click .delete'(event) {
    const categoryId = this._id;
    let bookmark = Bookmarks.find({ categoryId });
    const category = Categories.findOne(categoryId);

    if (category.owner !== Meteor.userId()) {
      throw new Meteor.Error('Not Authorized - 401');
    }

    swal({
        title: "Are you sure?",
        text: "You will delete this category and all bookmarks in this category!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, I am sure!',
        cancelButtonText: "No, cancel it!",
        closeOnConfirm: true,
        closeOnCancel: false
    },
    function(isConfirm) {
        if (isConfirm) {
          bookmark.forEach((bookmark) => {
            let bookmarkId = bookmark._id;
            return Bookmarks.remove(bookmarkId);
          });
          return Categories.remove(categoryId);
        } else {
          swal("Cancelled", "Your bookmarks is safe :)", "error");
          return;
        }
      });

  },
  'keyup .category'(event) {
    event.preventDefault();
    let categoryId = this._id;
    let target = event.target;
    let name = target.value;

    const category = Categories.findOne(categoryId);

    if (category.owner !== Meteor.userId()) {
      throw new Meteor.Error('Not Authorized - 401');
    }

    Categories.update(categoryId, {
      $set: {
        name,
      }
    });

    if (event.which === 13 || event.which === 27) {
      event.target.blur();
    }
  },
  'click .signout'(event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  }
});
