import { Router } from 'meteor/iron:router';
import { Template } from 'meteor/templating';

import { Bookmarks } from '../../api/bookmarks.js';
import { Categories } from '../../api/categories.js';

// Import to load these templates
import '../../ui/body.js';
import '../../ui/new-bookmark.js';
import '../../ui/edit-bookmark.js';
import '../../ui/categories/categories.js';
import '../../ui/categories/new-category.js';

Router.configure({
  // the default layout
  layoutTemplate: 'home',
  yieldTemplates: {
    category: {to: 'nav'},
  }
});

AccountsTemplates.configure({
  defaultLayout: 'home',
  confirmPassword: true,
  texts: {
    button: {
      signUp: "Sign Up"
    },
    pwdLink_link: "forgotPassword",
    socialSignUp: "Register",
    socialIcons: {
      google: "myGoogleIcon",
      "meteor-developer": "fa fa-rocket"
    },
    title: {
        forgotPwd: "Recover Your Password"
    },
  },
});

AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/login',
  template: 'signin',
  layoutTemplate: 'home',
  // redirect: '/user-profile',
});

AccountsTemplates.configureRoute('signUp', {
  name: 'signup',
  path: '/register',
  template: 'signup',
  layoutTemplate: 'home',
});

Router.route('/', {
  template: 'main'
});

Router.route('/edit-bookmark/:_id', {
  name: 'editBookmark',
  template: 'editBookmark',
  data() {
    let currentBookmark = this.params._id;
    return Bookmarks.findOne({ _id: currentBookmark});
  }
});

Router.route('/new-category/', {
  name: 'newCategory',
  template:'newCategory',
});

Router.route('/category/:_id', {
  name: 'category',
  template:'main',
  data() {
    let currentCategory = this.params._id;
    return Categories.findOne({ _id: currentCategory});
  }
});
