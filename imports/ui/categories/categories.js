import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Categories } from '../../api/categories.js';

import './new-category.js'
import './categories.html';

Template.category.onRendered(function () {
  $('.button-collapse').sideNav();
  // $('.collapsible').collapsible();
});

Template.category.helpers({
  categories() {
    return Categories.find({});
  }
});

Template.category.events({
  'click .delete'(event) {
    return Categories.remove(this._id);
  },
  'keyup .category'(event) {
    event.preventDefault();
    let categoryId = this._id;
    let target = event.target;
    let name = target.value;

    Categories.update(categoryId, {
      $set: {
        name,
      }
    });

    if (event.which === 13 || event.which === 27) {
      event.target.blur();
    }
  }
});
