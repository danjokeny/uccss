import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../resources/data/user-object'


@inject(Router, User)
export class Users {
  constructor(router, Users) {
    this.router = router;
    this.users=users;
    this.message = 'This is where we will display users';
    this.showUserEditForm = false;

  }

  newUser() {
    this.user = {
    fName: "",
    lName: "",
    active: true,
    role: "user",
    email: "",
    password: ""
    }
      this.showUserEditForm = true;
    }
    

  logout() {
    this.router.navigate('home');
  }
}
