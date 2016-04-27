import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Categories } from '../../api/categories.js';

import './new-category.js'
import './categories.html';

Template.category.helpers({
  categories() {
    return Categories.find({});
  }
});

Template.category.events({
  'click .delete'(event) {
    return Categories.remove(this._id);
  }
});
