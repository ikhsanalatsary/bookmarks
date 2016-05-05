import { Router } from 'meteor/iron:router';
import { _ } from 'meteor/underscore';
import { Template } from 'meteor/templating';
import swal from 'sweetalert';

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
});

AccountsTemplates.configureRoute('signUp', {
  name: 'signup',
  path: '/register',
  template: 'signup',
  layoutTemplate: 'home',
});

Router.route('/', {
  name: 'main',
  template: 'main',
  subscriptions() {
    return Meteor.subscribe('bookmarks');
  }
});

Router.route('/edit-bookmark/:_id', {
  name: 'editBookmark',
  template: 'editBookmark',
  data() {
    let currentBookmark = this.params._id;
    return Bookmarks.findOne({ _id: currentBookmark});
  },
  onBeforeAction() {
    const currentUser = Meteor.userId();
    const bookmarkId = this.params._id;
    const bookmark = Bookmarks.findOne(bookmarkId);

    if(currentUser === bookmark.owner){
      this.next();
    } else {
      Router.go('/');
      Meteor.setTimeout(() => {
        swal("Forbidden!", "You can't access this bookmark directly, Redirect to list!", "error");
      },1000);
    }
  },
  subscriptions() {
    return Meteor.subscribe('bookmarks');
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
  },
  onBeforeAction() {
    console.log("You triggered 'onBeforeAction' for 'listPage' route.");
    const currentUser = Meteor.userId();
    const categoryId = this.params._id;
    const category = Categories.findOne(categoryId);

    if(currentUser === category.owner){
      this.next();
    } else {
      Router.go('/');
      Meteor.setTimeout(() => {
        swal("Forbidden!", "You can't access this category directly, Redirect to list!", "error");
      },1000);
    }
  },
  subscriptions() {
    return Meteor.subscribe('bookmarks');
  }
});

Router.plugin('ensureSignedIn', {
  except: _.pluck(AccountsTemplates.routes, 'name').concat(['main', 'signin', 'signup'])
});
