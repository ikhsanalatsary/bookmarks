import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Categories } from '../../api/categories.js';

import './new-category.html';

Template.newCategory.events({
  'submit .add-category'(event) {
    event.preventDefault();

    const target = event.target;
    var name = target.category.value;

    Meteor.call('create.category', name, (error, result) => {
      if (error) {
        console.log(error.reason);
      } else {
        Router.go('/');
        target.category.value = '';
      }
    });
  }
});
