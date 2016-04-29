import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Categories } from '../../api/categories.js';

import './new-category.html';

Template.newCategory.events({
  'submit .add-category'(event) {
    event.preventDefault();

    const target = event.target;
    let name = target.category.value;
    console.log(name);

    if (name === '') {
      throw new Meteor.Error('All field required');
      return;
    }

    Categories.insert({
      name,
      createdAt: new Date()
    }, (error, result) => {
      Router.go('/');
    });

    target.category.value = '';

  }
});